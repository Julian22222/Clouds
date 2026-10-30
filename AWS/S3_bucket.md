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
  <input type="file" name="image" accept="image/*" />  //<--accept="image/*",
  <button type="submit">Upload</button>
</form>

//accept is an HTML attribute on <input type="file"> that tells the browser which kinds of files the user should be able to pick. image/* means "any image file".
```

### How to read it:

It uses MIME types, in the format type/subtype:

- image/_: any image (JPEG, PNG, GIF, WebP, SVG, and so on). The _ is a wildcard for "any subtype".
- image/png: only PNG files.
- application/pdf: only PDFs.

```JS
//Other examples

<input type="file" accept="image/*" />
<input type="file" accept="image/png, image/jpeg" />
<input type="file" accept=".pdf" />
<input type="file" accept=".jpg,.jpeg,.png,.pdf" />
<input type="file" accept="image/*, .pdf, .doc,.docx " />    //<--Word files are .doc (old format) and .docx (current).

//You can use MIME types, file extensions (starting with a dot), or a mix, separated by commas.

// ✅ What it actually does:
// -The file picker dialog filters to show matching files, and other files are greyed out or hidden.
// -On phones, accept="image/*" usually offers "Take photo" or "Photo library" options, which is handy for uploads. Adding capture="environment" can open the camera directly.

// ❌ What it doesn't do:
// It's only a convenience hint for the user, not a security check:
// -Users can often switch the picker to "All files" and choose something else.
// -Anyone can bypass it by sending a request directly to your endpoint, without your form at all.
// -The browser decides a file's type from its extension, so a file renamed to .jpg can pass.


// 📍So always validate on the server too, as in my earlier example (file.type.startsWith("image/") and a size check). For stronger protection, check the file's actual contents (its "magic bytes") with a library like file-type, since file.type itself comes from the client.

// In short: accept improves the user experience, and server-side validation provides the security.
```

## Validation on the server of few uploaded document types:

```JS
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const isAllowed = file.type.startsWith("image/") || ALLOWED_TYPES.includes(file.type);

if (!isAllowed) throw new Error("File type not allowed");
```

- Use startsWith for the whole image/ family, and an includes check on a list for exact types
- file.type comes from the client, so it can be faked. For stronger validation, check the file’s actual contents with a library like file-type.
- Still check file.size on the server

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

# ⬇️ 2 different approaches, to upload small and big files to S3

1. Small File upload Flow approach: (file goes through your server)

```JS
Browser --(file)--> Next.js Server Action/ Route handler --(file)--> S3
```

2. Big File upload - Presigned URL approach (file goes directly to S3)

```JS
1. Browser --("I want to upload photo.jpg")--> Next.js Server Action
2. Server Action --(presigned URL)--> Browser
3. Browser --(file)--> S3 directly

//With a presigned URL, it travels once:
Browser --(upload)--> S3
```

# Uploaded file Size limits

- Server Actions have a default body limit of 1 MB (configurable with serverActions.bodySizeLimit in next.config).
- Platforms add their own limits too; for example, Vercel functions cap request bodies at about 4.5 MB. Large images can fail before they ever reach S3. If these images go to OCR.Space’s free tier, remember it has its own small size limit (about 1 MB), so a limit above that will still be rejected later in the pipeline.

### There are two separate limits, and you usually want both.

1. Raise Next.js’s request limit (next.config)

```JS
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
```

- The value is a string like "5mb" or a number of bytes.
- It applies to the whole request body (file plus other form fields), not just the file.
- Restart the dev server after changing it.
- Where this option lives has moved between Next.js versions (it has been under experimental), so check the docs for the version you use if it doesn’t take effect.

If a request is over the limit, Next.js rejects it before your action runs, and the user just sees a generic failure. That’s why you also need the next layer.

2. Your own validation inside the Server Action

This gives a clear error message and enforces your rule, which may be lower than the framework limit:

```JS
"use server";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

export async function uploadImage(formData: FormData) {

  const file = formData.get("image") as File;

  if (!file || file.size === 0) {
    return { error: "No file selected" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "File is too large (max 4 MB)" };
  }

  // ...validate type, then upload to S3
}
```

Return an error object rather than throwing, so you can show the message in the UI.

3. Optional: check in the browser first

This gives instant feedback without uploading anything:

```JS
"use client";

<input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 4 * 1024 * 1024) {
      alert("File is too large (max 4 MB)");
      e.target.value = ""; // clear the selection
    }
  }}
/>
```

# For bigger files to upload, use the -> presigned URL approach ( direct upload ) and upload directly to S3.

Benefits of using presigned URL approach for big Files to upload :

- Speed
- Hard limits stop big files (Next.js Server Actions default to a 1 MB body limit,etc.)
- Your server can’t cope with many large uploads

```JS
//Presigned URL approach (file goes directly to S3)

1. Browser --("I want to upload photo.jpg")--> Next.js Server Action
2. Server Action --(presigned URL)--> Browser
3. Browser --(file)--> S3 directly

//With a presigned URL, it travels once: (don’t need to use server to upload the file)
Browser --(upload)--> S3
```

The server only handles a tiny request (“can I upload this?”) and a tiny response (a URL). The heavy part, the file, never touches the server.

# What is a presigned URL?

It’s a normal S3 URL with a signature and expiry time added as query parameters. Your server signs it using its AWS credentials. It means: “whoever has this URL may upload this one file to this key, for the next N minutes.”

The browser never gets your AWS keys, only that temporary, narrow permission

1. Step 1: Server Action that creates the URL

```JS
"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: "eu-west-2" });

const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

export async function getUploadUrl(fileName: string, fileType: string, fileSize: number) {

  if (!ALLOWED_TYPES.includes(fileType)) {
    return { error: "File type not allowed" };
  }

  if (fileSize > MAX_SIZE) {
    return { error: "File too large (max 20 MB)" };
  }

  const key = `uploads/${randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 }); // valid for 60 seconds

  return { url, key };
}
```

2. Step 2: Client component that uploads

```JS
"use client";

import { getUploadUrl } from "./actions";

export function UploadForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = (e.currentTarget.elements.namedItem("file") as HTMLInputElement).files?.[0];
    if (!file) return;

    // 1. Ask the server for a presigned URL (tiny request)
    const result = await getUploadUrl(file.name, file.type, file.size);
    if ("error" in result) return alert(result.error);

    // 2. Upload the file straight to S3
    const res = await fetch(result.url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!res.ok) return alert("Upload failed");

    // 3. Optionally tell your server it's done, and save result.key in your database
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" accept="image/*,.pdf" />
      <button type="submit">Upload</button>
    </form>
  );
}

//Notice this uses onSubmit and fetch, not <form action={serverAction}>, because the browser itself has to do the PUT to S3.
```

3. Step 3: Bucket CORS configuration

The browser is making a cross-origin request to S3, so the bucket must allow it. In S3 → your bucket → Permissions → CORS:

```JS
[
  {
    "AllowedOrigins": [https://your-site.com, http://localhost:3000],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]

//Without this, the upload fails with a CORS error in the browser console, even though the URL is valid.
```

## Things to know

- The Content-Type must match. The URL was signed for a specific content type, so the PUT must send the same one, or S3 returns a SignatureDoesNotMatch error.
- Your size check is only a request. In the example above, fileSize comes from the client, so someone could lie about it. If you need to enforce a size limit, use a presigned POST (createPresignedPost) with a content-length-range condition instead of a presigned PUT.
- Keep expiry short. 60 seconds to a few minutes is plenty.
- Don’t trust the upload happened. Confirm it (for example, with an S3 event trigger, or a HeadObject call) before saving the record in your database.
- Your OCR Lambda still works. The file lands in S3 either way, so your S3 trigger fires the same way.

## Which to choose Small upload / big upload file

```JS
                              |    Through server                                         |   Presigned URL

Complexity                    |    Simple                                                 |  More code and CORS setup
Size limits                   |    Next.js / platform limits (about 1-4.5 MB by default)  |  S3’s limits (up to 5 GB per PUT)
Server load                   |    File uses your bandwidth and memory                    |  Almost none
Server-side file inspection   |    Easy (you have the file)                               |  Harder (check after upload)
```

Small images and simple apps: go through the server. Larger files or production use: presigned URLs.
