# API Gateway

API Gateway is one of those AWS services that seems complicated at first, but the basic idea is actually simple.

- DON'T USE API GATEWAY For Front-End (Next.js) - to get HTTPS URL!!! It will make many bugs, issues and fails (Binary Data & Asset Streaming issues and Cookie & header Parsing Problems, Payload Limits & Cost)

- API GW are build exclusively for B-End. They sit between client app (F-end Web apps, mobile apps, third-party software) and backend services (APIs, Lambda functions, database microservices)
- API GW can direct request to "https://somedomain:3000" (to URL with some PORT), Don't need to use NGINX for B-end to remove PORT from URL, -> use API GW!
- API GW direct incoming request to (e.g., /api/v1/users or /api/v1/orders) to the correct backend microservice
- API GW provide security, rate limiting & Trottling, Translate Data & Protocols

AWS API Gateway Proxy = a middleman that receives HTTP requests from clients and forwards them to your backend, then returns the backend's response to the client.

## API Gateway Without proxy

API Gateway can be more specific.

You can tell it:

- "When you receive /users, send it to Lambda A."
- "When you receive /orders, send it to Lambda B."

```JS
                 API Gateway
                /           \
               /             \
          /users           /orders
             ↓                ↓
         Lambda A          Lambda B

//API Gateway is actively deciding how to handle each route.
//API Gateway = the middleman
```

## API Gateway With proxy

You basically say:

- "Whatever comes in, just pass it to my backend."
- With a proxy, API Gateway basically says:"Okay, I'll send exactly this request to the backend."

```JS
                   API Gateway
                      │
                      │
                 "Pass it on"
                      │
                      ▼
                   Backend

//Proxy = "middleman, just pass the request through."
```

```JS
                                  API Gateway           API Gateway Proxy

What is it?                       AWS service           Configuration/integration approach

Main job                    Manage API traffic          Forward requests

Can route requests?                     ✅                     ✅

Can connect to Lambda?                  ✅                     ✅

Is it a separate AWS service?           ✅                     ❌
```

# Diagram of the project

```JS
       HTTPS (to get HTTPS in F-End use Domain, CloudFront, Load Balancer, etc. but not API Gateway!)

┌───────────────┐

│  Frontend EC2 │

└───────┬───────┘
        │
        │ HTTPS
        ↓
┌─────────────────────┐

│    API Gateway      │

│ *.execute-api...    │

└──────────┬──────────┘
           │
           │ HTTP
           ↓
┌─────────────────────┐

│    Backend EC2      │

│      NestJS         │

└─────────────────────┘
```

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

# How to work with API Gateway proxy

1. Go to API Gateway
2. CLick -> create API
3. Click -> HTTP API -> Build

![pic2b](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw1.jpg)

4. Give a name to your API GW -> click Next

![pic2c](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw2.jpg)

5. click Next again

![pic2d](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw3.jpg)

6. Stage name - can leave as it is, Auto-deploy leave it as it is -> click Next

![pic2e](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw4.jpg)

7. Review page, of your new API Gateway -> click Create

![pic2f](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw5.jpg)

8. Then - Click on Routes -> and Create

![pic2g](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw6.jpg)

9. Then -> add route -> /{proxy+} -> and click Create

![pic2h](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw7.jpg)

10. Then Click on -> ANY -> and then Attach integration

![pic2i](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw8.jpg)

![pic2j](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw9.jpg)

11. the configure your api routing, and it will automatically deploy

![pic2k](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw10.jpg)

12. Then click on this link to get new HTTPS URL link

![pic2l](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw11.jpg)

![pic2m](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/apigw12.jpg)

### Also, you can adjust the API GW cors

- in API Gateway service, on the left side menu click ->CORS -> press configure
- then you can add domain addresses that can call this API GW
