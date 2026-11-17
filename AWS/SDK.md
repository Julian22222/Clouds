# What is SDK?

To work with different AWS resources from your code use -> AWS SDK

Each AWS service has its own SDK package under the

```JS
@aws-sdk/client-* namespace
```

, and you install/import whichever ones correspond to the services you're actually calling. You need npm install only the ones you need

- If your EC2 is used @aws-sdk/client-ssm – then your EC2 needs IAM permissions for AWS Parameter Store
- My NestJS EC2 instance has an IAM instance role attached for AWS Parameter Store (EC2 → your instance → Security → IAM Role).

```JS
@aws-sdk/client-ssm  //<- gives your code the ability to get secrets from AWS Systems Manager (Parameter Store)
```

```JS
//Often used SDKs


Service                           |          Package                   |     Typical use in your stack
                                  |                                    |
Systems Manager (Parameter Store) |  @aws-sdk/client-ssm               |   JWT secrets, config values (what you're already using)
S3                                |  @aws-sdk/client-s3                |   File uploads, static assets, document storage
Secrets Manager                   |  @aws-sdk/client-secrets-manager   |   DB credentials, API keys (alternative to SSM for secrets specifically)
RDS                               |  @aws-sdk/client-rds               |   Managing/describing RDS instances (not for querying — that's still pg/typeorm etc.)
SES                               |  @aws-sdk/client-ses               |   Sending transactional emails
SQS                               |  @aws-sdk/client-sqs               |   Queues, background jobs
SNS                               |  @aws-sdk/client-sns               |   Notifications, pub/sub
CloudWatch Logs                   |  @aws-sdk/client-cloudwatch-logs   |   Custom logging/metrics
STS                               |  @aws-sdk/client-sts               |   Assuming roles, temporary credentials
```

# What stays the same across all of them

The pattern is consistent regardless of which service you're calling:

```JS
//Example1 – with @aws-sdk/client-s3
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "eu-west-2" });
await client.send(new PutObjectCommand({ Bucket: "my-bucket", Key: "file.pdf", Body: buffer }));

////Example 2 -with @aws-sdk/client-ssm
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const client = new SSMClient({ region: "eu-west-2" });
const res = await client.send(
  new GetParameterCommand({ Name: "/myapp/db-password", WithDecryption: true }),
);
```

- Each package exports a *Client class and a set of *Command classes.
- Credentials resolve the same way for all of them — automatically from your EC2 instance's IAM role, no explicit keys needed, exactly as with SSMClient.
- IAM permissions are still the real gate, per the last message — installing @aws-sdk/client-s3 doesn't grant S3 access any more than installing @aws-sdk/client-ssm granted SSM access. Your instance role needs s3:PutObject on the specific bucket/prefix, ses:SendEmail, etc., added explicitly for each service you start using.

### Practical implication for your setup

Each time you add a new AWS service to your NestJS app, that's two changes:

1.

```bash
npm install @aws-sdk/client-whatever
```

2. and a policy update on your EC2 instance role (or a new role, if you want to scope permissions per-service rather than accumulating everything onto one broad role). It's worth deciding early whether you want one instance role with an ever-growing policy, or separate, narrowly-scoped roles if different parts of your app genuinely need different access — the latter is more setup but keeps a compromised process from automatically having reach into every AWS service your account touches.

# Where to use SDK?

Best practice: call the AWS SDK from your backend (NestJS) only. Not because the SDK is technically blocked from running in a browser — it isn't — but because of what it would require to work there.

### Why not use SDK from the F-End?

The SDK's SSMClient, S3Client, etc. all need to sign requests with AWS credentials. On your NestJS EC2 instance, that happens invisibly because the SDK picks up the instance's IAM role automatically — no keys anywhere in your code. In a browser, there's no IAM role to inherit. The only way to make an AWS SDK call succeed from a Client Component would be to embed an AWS access key and secret directly in your frontend JavaScript, which means anyone who opens devtools can read them straight out of the bundle and use them to call AWS directly, under whatever permissions that key has, without going through your app at all.

### The one legitimate frontend exception (not your case)

AWS does offer a browser-usable SDK path, via Cognito Identity Pools, which hands out short-lived, tightly-scoped temporary credentials to unauthenticated or authenticated browser sessions — used for things like letting a logged-in user upload directly to a specific S3 prefix. This is a deliberate, narrow mechanism with its own permission boundaries, not "install the SDK in your Next.js app and call it like on the backend."

### What the correct pattern looks like for something like file uploads + AWS S3 SDK

Since S3 came up as a likely use case, the standard flow is: Client Component asks your Next.js Route Handler (or directly your NestJS backend) for permission to upload → NestJS uses the SDK server-side to generate a presigned URL (a time-limited, single-purpose URL that grants upload rights to one specific S3 key, without exposing any credentials) → the browser uploads the file straight to S3 using that URL. The AWS SDK call itself — PutObjectCommand wrapped in getSignedUrl — still happens only in NestJS; the browser just gets a token-like URL back, never credentials.

```JS
// NestJS

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const url = await getSignedUrl(
  s3Client,
  new PutObjectCommand({ Bucket: "my-bucket", Key: `uploads/${userId}/${filename}` }),
  { expiresIn: 300 }, // 5 minutes
);
// return { url } to the client — no credentials involved
```

### Summary

- NestJS: all direct AWS SDK calls, using the EC2 instance role, exactly as you're doing now.
- Next.js: no AWS SDK calls at all — it's a pass-through layer, same as it is for your backend API calls generally.
- Browser: never touches AWS SDK or credentials directly; at most it uses a presigned URL your backend generated on its behalf.

This keeps the same shape you've built for auth throughout this conversation: credentials and trusted operations live server-side, the browser only ever receives narrowly-scoped, short-lived permission to do one specific thing.

# SDK allow to use AWS services in your code

This code needs to be in Lambda function code, so it has to live in a Lambda function on AWS. The simplest way is to paste it into the code editor on the Lambda console (the file is usually called index.mjs) and click Deploy. You can also deploy it as a zip, or with CDK, SAM or Terraform, but it’s the same code either way.

```JS
//General info: lambda and parameter store example

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";   //<- S3Client – to connect to the service in correct region, GetObjectCommand – to receive a data from AWS service
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';   //<- SSMClient – to connect to Parameter store in correct region, use GetParametersCommand – to get all parameters from AWS Parameter Store with one api call

//lambda example
const s3 = new S3Client({   //<- creates a connection to AWS S3 in EU-west-2 region
  region: "eu-west-2",
});

//parameter store example
const client = new SSMClient({
  region: 'eu-west-1',
});

const handler = async () => {

try {
console.log("creating GET command");

 //lambda example
const command = new GetObjectCommand({
 Bucket: "demo-s3bucket-my",
      Key: "pic-demo.jpg",
    });

const response = await s3.send(command);  //<-when use “send” method you get a response with data from your AWS service (Example: from S3 – will get a picture, from Parameter Store – will get parameters, etc.)



//parameter store example
//This is faster (one round trip, up to 10 names per call) and fails loudly if a parameter is missing, whereas your separate calls to get parameters from Parameter Store silently skips any parameter with an empty value and the app would only break later with a confusing DB or JWT error.
  const response = await client.send( //<--get parameters from AWS Parameter Store
    new GetParametersCommand({
      Names: parameterNames,
      WithDecryption: true,
    }),


//continue logic with the AWS resource response
}
```

```JS
//BAD EXAMPLE ❌
//SDK allow to get each parameters separately from Parameter Store, ❌ But it is NOT Good Practice, because you make 6 separately API calls to AWS Parameter Store with - GetParameterCommand, but instead you can fetch them all in one request with GetParametersCommand:
//Example of getting each parameters separately from Parameter Store

import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'; //<- we use GetParameterCommand - to get individual parameter from AWS Parameter Store

//Parameter Store is a regional service
//The region must match where you created the parameters (Parameter store service).
//If you leave region out, the SDK falls back to the AWS_REGION environment variable, then your shared AWS config (~/.aws/config), and throws “Region is missing” if it finds nothing.

//Parameter Store is a regional service. A parameter named DB_HOST in eu-west-1 is a completely separate thing from a DB_HOST in us-east-1. They don’t replicate between regions.
// So the client needs to know which regional endpoint to call (ssm.eu-west-1.amazonaws.com).
const client = new SSMClient({
  region: 'eu-west-1',
});

const parameterNames = [
  'DB_HOST',
  'DB_PORT',
  'DB_DATABASE',
  'DB_USER',
  'DB_PASSWORD',
  'JWT_SECRET',
];

//AWS SDK - to get secret values from Parameter store
export async function loadParameters() {
  try {
    for (const name of parameterNames) {
      const response = await client.send(
        // client.send(command) for each operation
        new GetParameterCommand({
          // GetParameterCommand just describes what you want; the client handles how to send it (HTTP, request signing with your credentials, retries, etc.)
          Name: name,  //<- indicate what parameter you are getting
          WithDecryption: true,
        }),
      );

      if (response.Parameter?.Value) {
        process.env[name] = response.Parameter.Value;
      }
    }
  } catch (err) {
    console.error('AWS Parameter Store failed:', err.message);
    throw err;
  }
}

```

# Improved code for lambda file

```JS
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// Lambda sets AWS_REGION automatically, so no need to hardcode it.

//if your Lambda and your bucket are in the same region it is not mandatory to add region for S3 Client. Lambda automatically sets AWS_REGION to the region the Lambda function is deployed in.

//Bucket names are globally unique, but each bucket physically lives in one region. If the client talks to the right region, the request works. If your Lambda and bucket are both in eu-west-2 (London), they match and everything is fine.

//It’s better to keep the Lambda and bucket in the same region.

const s3 = new S3Client({});   //<-- Region removed, Lambda already knows which region it runs in, so the client picks it up automatically. This also means that if you move the function to another region, you don’t have to change the code.

// Set this in Lambda > Configuration > Environment variables
const OCR_API_KEY = process.env.OCR_SPACE_API_KEY;  //<-- Before, the key was written directly in the code. Now it lives in Lambda’s settings, so it never appears in your code


// Fallbacks so you can still test manually in the Lambda console
const DEFAULT_BUCKET = process.env.DEFAULT_BUCKET || "demo-s3bucket-my";
const DEFAULT_KEY = process.env.DEFAULT_KEY || "pic-demo.jpg";

export const handler = async (event) => {    //<-- Lambda looks for an exported function called handler in index.mjs. Without export, it can’t find it.

console.log("Event received:", JSON.stringify(event));  //<--this is full trigger event, console.log can be seen in CloudWatch,
```

Console.logs from Lambda code block can be seen in CloudWatch Logs it is where Lambda stores them

One catch: if the function’s execution role doesn’t have permission to write logs (logs:CreateLogGroup, logs:CreateLogStream, logs:PutLogEvents), nothing will show up anywhere, including CloudWatch. The default AWSLambdaBasicExecutionRole covers this, so you’d only hit it if you created a custom role.

An S3 trigger event includes the bucket name, object key, file size, event time and event type (for example ObjectCreated:Put), so it’s usually safe to log. Just be aware that other trigger types (API Gateway, for example) can include headers and request bodies with sensitive data, so check what’s in there before logging whole events in production.

In CloudWatch Logs Insights you can search across runs, for example for all lines containing Error processing OCR. Logs are kept forever by default and you pay for storage. Set a retention period (like 7 or 30 days) on the log group. Under Lambda Configuration → Monitoring and operations tools you can switch to JSON log format and set a log level, which makes logs easier to filter.

everything from console.log, console.info, console.warn and console.error goes to CloudWatch Logs, as long as the function’s execution role can write logs. That’s included by default through AWSLambdaBasicExecutionRole, which Lambda adds when it creates the role for you.

### Where to find them

- Lambda console → your function → Monitor tab → View CloudWatch logs.
- Or CloudWatch → Log groups → /aws/lambda/<your-function-name>.
- Each log group has several log streams, usually one per execution environment. Open the most recent one. Logs can take a few seconds to appear.

Lambda also adds its own lines: START, END and REPORT. REPORT shows the duration, billed duration and memory used, which is useful for tuning your timeout and memory settings.

```JS
try {
    if (!OCR_API_KEY) {
      throw new Error("OCR_SPACE_API_KEY environment variable is not set");
    }

    // 1. Work out which file to process.
    // S3 trigger events look like { Records: [{ s3: { bucket: { name }, object: { key } } }] }

    // Before, it always read pic-demo.jpg. Now, if an S3 upload triggers the Lambda, it reads the bucket and file name from the event, so it processes whichever file was just uploaded. If you test manually with no S3 event, it falls back to your old defaults. The decodeURIComponent and replace part is there because S3 encodes file names in events (a space becomes +), and without decoding, files with spaces would fail.

    const s3Record = event?.Records?.[0]?.s3;                   //<-- Bucket and key come from the event
    const bucket = s3Record?.bucket?.name ?? DEFAULT_BUCKET;    //<-- Bucket and key come from the event
    const key = s3Record                                        //<-- Bucket and key come from the event
      ? decodeURIComponent(s3Record.object.key.replace(/\+/g, " "))
      : DEFAULT_KEY;

    console.log(`Processing s3://${bucket}/${key}`);


    // 2. Download the file from S3
    const s3Response = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key }),
    );

    const bytes = await s3Response.Body.transformToByteArray();     //<--Simpler download
    //Before, you looped over the stream chunk by chunk and joined them with Buffer.concat. The AWS SDK now has this one-liner that does the same thing.



    const contentType = s3Response.ContentType || "image/jpeg";  //<--Content type and filename are dynamic
    const filename = key.split("/").pop();   //<--Content type and filename are dynamic
    //Before, these were hardcoded as pic-demo.jpg and image/jpeg. Now they match the actual file, so PNGs and other images are sent correctly.

    // 3. Build the multipart form (Node 18+ has FormData and Blob built in)
    //Built-in fetch and FormData instead of axios and form-data

    // Same job, different tools. Node 18+ includes fetch, FormData and Blob, so you don’t need to install or bundle anything. That’s what lets you paste the code straight into the Lambda console. Also, with fetch you don’t set headers manually, because it sets the multipart header for you.



    const formData = new FormData();
    formData.append("file", new Blob([bytes], { type: contentType }), filename);
    formData.append("apikey", OCR_API_KEY);

    // 4. Send to OCR.Space
    const ocrHttpResponse = await fetch(https://api.ocr.space/parse/image, {
      method: "POST",
      body: formData,
    });

//Three layers of checks:
// -Did the HTTP request itself succeed? (fetch doesn’t throw on 4xx/5xx errors, unlike axios, so you have to check .ok yourself.)
// -Did OCR.Space report a processing error?
// -Is there a result? The ?. and ?? "" mean you get an empty string instead of a crash if ParsedResults is missing.

    if (!ocrHttpResponse.ok) {    //<-Better error checking
      throw new Error(`OCR.Space HTTP error: ${ocrHttpResponse.status}`);
    }

    const ocrData = await ocrHttpResponse.json();

    // 5. Check the OCR result before using it
    if (ocrData.IsErroredOnProcessing) {    //<--Better error checking

      const message = Array.isArray(ocrData.ErrorMessage)
        ? ocrData.ErrorMessage.join(", ")
        : ocrData.ErrorMessage;

      throw new Error(`OCR failed: ${message}`)
    }

    const parsedText = ocrData.ParsedResults?.[0]?.ParsedText ?? "";

    // Log the size, not the content, in case the images contain sensitive data

    // Before, the whole extracted text was logged. Images can contain private data (IDs, invoices), and CloudWatch logs often last a long time. Now it only logs the length. I also removed the line that logged the entire incoming event.

    console.log(`OCR finished, extracted ${parsedText.length} characters`);   //<--Safer logging

    return {
      statusCode: 200,
      body: JSON.stringify({ bucket, key, text: parsedText }),   //<--Richer response, The response now also includes which file was processed, which is handy when several files are uploaded.
    };

  } catch (error) {
    console.error("Error processing OCR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

```

Removed handler(); Lambda calls your handler itself. Calling it manually at the bottom caused an extra, pointless run on every cold start.

Paste this into the Lambda console’s code editor (replacing the contents of index.mjs), click Deploy, and add OCR_SPACE_API_KEY under Configuration → Environment variables before testing.

- When you receive a data from S3 - await s3.send(command)
- every S3 GetObject body is a stream, big or small
- all (big or small ) files such as pictures and other files when you await s3.send(command); comes back as a chunks(small pieces that needs to be added together by using buffer) to make the full file
- response.Body is a stream. The bytes arrive over the network in pieces, and Node hands them to you as chunks (small Buffer objects, often 16 KB to 64 KB each).
- Reading the stream, either with your original for await loop or transformToByteArray(), is what actually pulls the bytes
- Joining the chunks gives you the complete file in memory.
- So the chunks come from how Node streams network data, not from S3 splitting your file into numbered parts. A small image might arrive as 1 chunk and a big one as thousands, but the process is the same.

### Why streams exist?:

Streams let you process data as it arrives without holding the whole file in memory. For example, you could pipe a 2 GB file straight to another place without ever loading it all.

- Lambda memory: the file must fit in your function’s memory (128 MB by default), along with the rest of the runtime. Very large files can crash it with an out-of-memory error, so raise the memory setting if needed.
- OCR.Space limits: the free tier has a small file size limit (about 1 MB), so large images will be rejected by the API before memory becomes your problem.
- Truly large files: for things you don’t need fully in memory, you’d process the stream directly or write it to /tmp, rather than buffering it.

After you do --> client.send(comand) , you get a response as a chunks only if it is a file (audio file, Video file, any S3 file, pic, docs, etc)

Receive chunks if the AWS service return a file or binary payload, Most AWS calls return a normal JavaScript object.

So the rule is: when a response member is raw bytes or a file, you may need to read it, and the SDK will usually give you either a stream or a Uint8Array. When it’s structured data, you just get an object.

Streaming is useful for file-like data, because it lets you start processing before everything has arrived and avoids holding huge files in memory. For small structured JSON responses, streaming would add complexity for no benefit, so the SDK does the reading and parsing for you.

Privacy and Confidentiality Notice: The information contained in this e-mail is intended for the named recipient(s) only. It may contain privileged and confidential information. If you are not an intended recipient, you must not copy, distribute or take any action in reliance on it. If you have received this e-mail in error, we would be grateful if you would notify us immediately. Thank you for your assistance. Please note that e-mails sent or received by our staff may be disclosed under the Freedom of Information Act (unless exempt).
