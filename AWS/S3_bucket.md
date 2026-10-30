# ✅ Notes how to save image from Next.js to AWS S3 bucket

To upload file or image to AWS s3 bucket, in Next.js component we use:

```JS
<form>

<input type="file" />
...
<input type=”submit” />
...
<form/>
```

- as soon as you click send the form, the picture will be sent to AWS S3 bucket and stored there.
- Posting image is happening through Next.js Server Actions and/or Route handler.
- S3 doesn't receive the file automatically from the form. Your server code has to upload it.

### ➡️ The flow (upload through your server)

1. The user picks a file in

```bash
<input type="file" name="image" /> inside a <form>.
```

2. On submit, the browser sends the file to your Next.js server as multipart/form-data. With a Server Action, Next.js handles this for you. With a Route Handler, the form needs enctype="multipart/form-data" (or you send a FormData with fetch).
3. Your server code reads the file and uploads it to S3 using the AWS SDK's PutObjectCommand.
4. S3 stores it as an object under the key you choose. You usually save that key (or URL) in your database, for example PostgreSQL.

```JS
//Here's a minimal Server Action: (Example)

"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: "eu-west-2" });

export async function uploadImage(formData: FormData) {

  const file = formData.get("image") as File;

  if (!file || file.size === 0) throw new Error("No file");
  if (!file.type.startsWith("image/")) throw new Error("Images only");

  const key = `uploads/${randomUUID()}-${file.name}`;
  const body = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: body,
      ContentType: file.type,
    }),
  );

  return { key };
}



//form
<form action={uploadImage}>
  <input type="file" name="image" accept="image/*" />
  <button type="submit">Upload</button>
</form>
```

### ❗ Things to watch out for

- Size limits. Server Actions have a default body limit of 1 MB (configurable with serverActions.bodySizeLimit in next.config). Platforms add their own limits too; for example, Vercel functions cap request bodies at about 4.5 MB. Large images can fail before they ever reach S3.
- Credentials stay on the server. Never put AWS keys in client code. The browser only talks to your Next.js server.
- Validate on the server. Check file type and size there. The accept attribute in HTML is only a hint and can be bypassed.
- Use unique keys. Otherwise a second file with the same name overwrites the first.
- Keep the bucket private. Serve images with presigned GET URLs or through CloudFront, rather than making the bucket public.

### 📍 The alternative: presigned URL (direct upload)

For bigger files, the common pattern skips your server for the file itself:

1. The browser asks your Server Action or Route Handler for a presigned upload URL.
2. The server creates it with getSignedUrl from @aws-sdk/s3-request-presigner and a PutObjectCommand.
3. The browser uploads the file directly to S3 with fetch(url, { method: "PUT", body: file }).

This avoids Next.js and platform body limits, and it saves your server's bandwidth and memory. You'll need a CORS configuration on the bucket that allows PUT from your site's origin.

Which to use: server upload is simpler and fine for small images. Presigned URLs scale better and are the usual choice for larger files or production apps.

Tying this back to your Lambda, once the file lands in S3, an S3 trigger can invoke your OCR Lambda automatically. That's what the event.Records[0].s3 code I added is for.
