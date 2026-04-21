import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import axios from "axios";
import NodeFormData from "form-data";

const s3 = new S3Client({
  region: "eu-west-2",
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
      Bucket: "demo-s3bucket-my",
      Key: "pic-demo.jpg",
    });

    //Get object from S3
    console.log("getting data from S3");
    const response = await s3.send(command);
    //   console.log(("received response from S3:", response));

    // console.log("RESPONSE body:", response.Body);

    const chunks = [];

    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    // Send object to OCR.Space
    const formData = new NodeFormData();

    formData.append("file", buffer, {
      filename: "pic-demo.jpg",
      contentType: "image/jpeg",
    });
    formData.append("apikey", "c102647c8a88957");

    //response from OCR.Space
    const ocrResponse = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,

      {
        headers: formData.getHeaders(),
      },
    );

    const parsedText = ocrResponse.data.ParsedResults[0].ParsedText;

    //  console.log("OCR result - parsedText:", parsedText);

    console.log("OCR result:", parsedText);

    //  Return result to Lambda caller
    return {
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
