# API Gateway

API Gateway is one of those AWS services that seems complicated at first, but the basic idea is actually simple.

```JS
Imagine you own a restaurant 🍽️

You have:
👨‍🍳 Kitchen (your backend application)
🍽️ Customers (users)
🙋 Waiter (API Gateway)

Customers never walk into the kitchen.
Instead:

1.Customer tells the waiter what they want.
2.Waiter takes the order to the kitchen.
3.Kitchen prepares the food.
4.Waiter brings the food back.

The waiter is the API Gateway.

Customer
    │
    ▼
API Gateway (Waiter)
    │
    ▼
Backend Application (Kitchen)
```

```JS
In AWS

Suppose you have a mobile app.

The app needs to:

-Get a list of products
-Log in a user
-Place an order

Instead of talking directly to your servers, it talks to API Gateway.

Mobile App
      │
      ▼
API Gateway
      │
      ├── Lambda Function
      ├── EC2 Server
      └── ECS Container

API Gateway receives the request and forwards it to the correct backend.
```

# Why not let users talk directly to the server?

Because API Gateway provides useful features such as:

- Security (checks who is allowed to use your API)
- Rate limiting (prevents abuse by limiting requests)
- Logging (records requests for monitoring)
- Routing (sends requests to the correct service)
- API versioning (supports different versions of your API)

So it acts as a smart front door for your backend.

```JS
//A real AWS example
//Suppose you're building a shopping website.

    Internet
      │
      ▼
API Gateway
      │
      ├── GET /products
      │         │
      │         ▼
      │     Lambda
      │
      ├── POST /login
      │         │
      │         ▼
      │     Lambda
      │
      └── POST /checkout
                │
                ▼

             EC2 Server

The API Gateway looks at the request and sends it to the appropriate backend service.

--------------------------------------------------

//Where does API Gateway fit with VPC?
//Think of your architecture like this:

    Internet
      │
      ▼
API Gateway
      │
      ▼
     VPC
      ├── Private Subnet
      │      ├── EC2
      │      └── Database
      │
      └── Public Subnet

Often:
- API Gateway is the public entry point.
- Your EC2 instances, containers, or databases stay inside your VPC, often in private subnets.
- Users cannot access those backend resources directly; they go through API Gateway.
```

## API Gateway is the front door to your application's backend. It receives requests from users, forwards them to the right service, and returns the response while handling tasks like security, routing, and request management.

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
