- API Gateway is used to expose Lambda function to the public. API Gateway servce allow to create REST API and provide public access to Lambda function.
- This API Gateway will stand as a middle service between your users and the Lambda function. Because it's going to expose a public URL by which requests can be made and then forwarded to this Lambda function which is then going to send back a response.
- API Gateway is serverless service as well

### APi Gateway form (see pic below)

![pic2a](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic2a.jpg)

- then Create Methods for this API Gateway (GET, POST, PUT, DELETE, etc)
- then press -> Deploy API (to make API Gateway work)
- then click -> Stages on the left side menu -> click on your stage (your API Gateway that you just created) -> and find Invoke URL link, this URL wil invoke Lambda function if API Gateway is connected to Lambda function

# CloudFront service

It allows to make HTTPS secure method to connect to your Web service

allow to make from HTTP -> HTTPS
