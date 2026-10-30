# SDK allow to use AWS services in your code

This code needs to be in Lambda function code, so it has to live in a Lambda function on AWS. The simplest way is to paste it into the code editor on the Lambda console (the file is usually called index.mjs) and click Deploy. You can also deploy it as a zip, or with CDK, SAM or Terraform, but it’s the same code either way.

```JS
//General info: lambda and parameter store example

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";   //<- S3Client – to connect to the service in correct region, GetObjectCommand – to receive a data from AWS service
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';   //<- SSMClient – to connect to Parameter store in correct region, GetParametersCommand – to receive parameters from AWS

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
  const response = await client.send( //<--get parameters from AWS Parameter Store
    new GetParametersCommand({
      Names: parameterNames,
      WithDecryption: true,
    }),
...
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
