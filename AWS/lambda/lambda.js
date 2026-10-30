import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import axios from "axios";
import NodeFormData from "form-data";

const s3 = new S3Client({
  region: "eu-west-2", //<--//creates a connection to AWS S3 in eu-west-2 region
  // If running locally, you can provide credentials here. It is a way to connect to AWS services without relying on environment variables or AWS CLI configuration.
  // However, when running in AWS Lambda, you should not include credentials in your code, as the Lambda execution environment automatically provides temporary credentials through the IAM role associated with the function.
  //credentials down't need in Production env - in AWS Lambda, credentials are automatically provided by the execution environment.
  //   credentials: {
  //   accessKeyId: "YOUR_KEY",
  //   secretAccessKey: "YOUR_SECRET",
  // },
});

// const textract = new TextractClient({
//   region: "eu-west-2",
// });

const handler = async (event) => {
  try {
    console.log("Event received:", JSON.stringify(event, null, 2));

    console.log("creating GET command");
    const command = new GetObjectCommand({
      // <--“fetch the file - pic-demo.jpg, indicating the path to the correct file, to get the file
      Bucket: "demo-s3bucket-my", //<--Indicate the bucket
      Key: "pic-demo.jpg", //<-- and key
    });

    //Get object from S3
    console.log("getting data from S3");
    const response = await s3.send(command); //<- fetch the file - pic-demo.jpg , The file comes back as a stream (response.Body), not a ready-to-use file.
    //await loop reads the stream piece by piece into chunks!!!

    //   console.log(("received response from S3:", response));

    // console.log("RESPONSE body:", response.Body);

    const chunks = [];

    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks); // //<-- Turn the stream into a Buffer. Buffer.concat joins them into one buffer holding the whole image in memory.

    // Send object to OCR.Space
    const formData = new NodeFormData(); //ß Build the upload for OCR.Space, NodeFormData creates a multipart form (like an HTML file upload form). You attach the image buffer as file and your API key as apikey.

    formData.append("file", buffer, {
      filename: "pic-demo.jpg",
      contentType: "image/jpeg",
    });
    formData.append("apikey", "c102647c8a88957");

    //response from OCR.Space
    const ocrResponse = await axios.post(
      //ß Call the OCR API, axios.post sends the form to https://api.ocr.space/parse/image. The service reads the picture and returns the text.
      "https://api.ocr.space/parse/image",
      formData,

      {
        headers: formData.getHeaders(),
      },
    );

    const parsedText = ocrResponse.data.ParsedResults[0].ParsedText; ////<-- Extract the text, take recognised text from the first result.

    //  console.log("OCR result - parsedText:", parsedText);

    console.log("OCR result:", parsedText);

    //  Return result to Lambda caller
    return {
      //// Return a response
      statusCode: 200,
      body: JSON.stringify({ text: parsedText }),
    };
  } catch (error) {
    console.error("Error processing OCR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// handler();

console.log(await handler());

//Issues to fix for Lambda function:
/// handler(); at the bottom should be removed. Lambda calls the handler for you. Calling it yourself runs it with no event, causing an extra S3 call and OCR request on every cold start.
// If there’s no S3 event (for example, when you test manually), it falls back to your original bucket and pic-demo.jpg. The key is URL-decoded, because S3 events encode spaces as +.
// -Hardcoded bucket and key. It always processes pic-demo.jpg. If you trigger it from an S3 event, you’d read the bucket and key from event.Records[0].s3 instead.
// -Possible crash on bad OCR results. If OCR fails, ParsedResults may be missing and [0] will throw. Check ocrResponse.data.IsErroredOnProcessing first.
// -Logging the OCR text may leak sensitive content into CloudWatch, depending on what the images contain.

//Lambda settings to check:
// -Runtime: Node.js 20.x or 22.x.
// -IAM permissions: the function’s execution role needs s3:GetObject on arn:aws:s3:::demo-s3bucket-my/*
// -Timeout: raise it from the default 3 seconds to around 30. OCR calls are often slower than 3 seconds, so the default will likely time out.
// -Handler setting: keep it as index.handler.
// -Optional trigger: to run it automatically on upload, add an S3 trigger for “All object create events” on the bucket.

//Improved code for lambda
//What changed:
//-No extra packages. I replaced axios and form-data with the fetch, FormData and Blob that are built into Node 18+. That means you can paste it straight into the console.
//Your original would have failed there, because axios and form-data aren’t included in the Lambda runtime and you’d have had to zip them with node_modules or add a layer. @aws-sdk/client-s3 is included in Node 18+ runtimes.
// -API key from an environment variable. It reads OCR_SPACE_API_KEY, which you set under Configuration → Environment variables. For stricter security, use Secrets Manager or SSM Parameter Store.
// -Bucket and key come from the S3 trigger event. If there’s no S3 event (for example, when you test manually), it falls back to your original bucket and pic-demo.jpg. The key is URL-decoded, because S3 events encode spaces as +.
// -Simpler download. transformToByteArray() replaces the manual for await chunk loop.
// -Safer OCR handling. It checks IsErroredOnProcessing and uses ?. so a bad response doesn’t crash on ParsedResults[0].
// -Safer logging. It logs the character count, not the extracted text.
// -Removed the stray handler(); call and the hardcoded region.
