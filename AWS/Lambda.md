Lambda is for small pieces of code that run in response to something happening, without you managing a server. The pattern is always "event happens → Lambda runs → does one job.

### 📍 Often used real examples, when developers use Lambda

1. File and S3 events

- Image resizing. A user uploads a photo to S3, a Lambda creates thumbnails (small, medium, large) and saves them back to another bucket. This is probably the most classic example.
- Notifications on upload. A file lands in S3, a Lambda sends an email or Slack message (via SES, SNS or a webhook).
- Document processing. Your OCR Lambda is one of these. Others: extract data from invoices with Textract, convert Word to PDF, scan files for viruses.
- Data import. A CSV is dropped into a bucket, a Lambda parses it and inserts the rows into PostgreSQL or DynamoDB.
- Video processing. Trigger a transcoding job when a video is uploaded.

2. API backends

- REST endpoints. API Gateway receives GET /users, a Lambda runs the logic and returns JSON. Whole backends can be built as many small Lambdas.
- Webhooks. Stripe, GitHub or Twilio call a URL when something happens (payment succeeded, PR merged), and a Lambda handles it.
- Next.js and NestJS apps. Many hosting platforms (including Vercel, in effect) and tools like SST or AWS Amplify run your server-side code as Lambda functions under the hood.
- Presigned URL generation. The one from our upload discussion can be a tiny Lambda.

3. Scheduled jobs (cron)

With EventBridge Scheduler, Lambda replaces cron servers:

- Send a daily or weekly report email.
- Clean up old records or temp files every night.
- Pull data from a third-party API every hour.
- Check for expiring subscriptions and send reminders.
- Back up or sync data between systems.

4. Database events

- DynamoDB Streams. When a record changes, a Lambda reacts (update a search index, send a welcome email when a user is created, keep an audit log).
- Cognito triggers. Run code after a user signs up, for example to send a custom email or add them to a database.

5. Queues and background work

- SQS. The web app drops a message ("generate this PDF") into a queue and replies instantly. A Lambda picks it up and does the slow work in the background.
- SNS fan-out. One event (order placed) triggers several Lambdas: send a receipt, update stock, notify the warehouse.
- Retry handling. Failed messages go to a dead-letter queue and are processed by another Lambda.

6. Infrastructure and DevOps glue

- CloudWatch alarm → Lambda. Post alerts to Slack or restart something automatically.
- CI/CD steps. Run checks or post deployment notifications from CodePipeline.
- Auto-tagging or cleanup. Tag new EC2 instances with the creator's name, or shut down dev resources outside working hours to save money.
- Security automation. Detect a public S3 bucket and automatically lock it down.

7. Real-time data and AI

- Kinesis streams. Process clickstream or IoT data as it arrives.
- Bedrock or OpenAI calls. Summarise uploaded documents, classify support tickets, generate descriptions.
- Chatbots. Slack or Discord bots that respond to commands.

### 👉 Example: "File arrives in S3, --> user gets an email":

```bash
User uploads file → S3 → (S3 event trigger) → Lambda → SES sends email
```

Lambda reads event.Records[0].s3 to see which file arrived, then calls SES to send the message. You could even chain it with your OCR function: upload → OCR → save text to the database → email the user the result.

### ✅ When Lambda is a good fit

- Work is event-driven or occasional (not running 24/7).
- Each task is short (max 15 minutes per invocation).
- Traffic is unpredictable. It scales from zero to thousands automatically, and you only pay while it runs.

### ❌ When it's not

- Long-running processes (over 15 minutes).
- Constant high traffic where an always-on container would be cheaper.
- Apps needing persistent connections or in-memory state (WebSockets servers, for example, though API Gateway can manage WebSockets for you).
- Very latency-sensitive workloads, since cold starts can add some delay

Lambda is mainly the glue between AWS services and the place for background tasks. If you tell me which one interests you most, I can show you a full example, such as the S3 → email flow with SES.

# 📍 Each lambda is responsible for 1 task

Often yes, but it's a guideline rather than a rule. There are two main approaches, and both are valid.

1. Approach 1: One Lambda per task (single-purpose functions)

```JS
S3 upload      → resizeImageLambda
POST /orders   → createOrderLambda
GET /orders    → listOrdersLambda
Daily 8am      → sendReportLambda
```

### ✅ Advantages

- Least-privilege permissions. The resize function gets S3 access only, and the report function gets SES access only. A bug or breach in one can't reach everything.
- Independent scaling and settings. Each function gets its own memory, timeout and concurrency. OCR may need 1 GB and 30 seconds, while a simple lookup needs 128 MB and 3 seconds, so you don't overpay.
- Easier debugging. Each function has its own log group and metrics, so you can see which one is failing or slow.
- Smaller packages and faster cold starts. Each one bundles only the dependencies it needs.
- Safer deploys. Changing one function can't break another, and teams can own different functions.

### ❌ Disadvantages

- Many functions to manage (infrastructure code helps, for example CDK, SAM, SST or Terraform).
- Shared code (types, database helpers, validation) needs a strategy: a shared folder bundled into each function, a layer, or a package in a monorepo.
- More cold starts spread across rarely used functions.
- Harder to run and test the whole thing locally.

2. Approach 2: One Lambda for a whole API (the "Lambdalith")

One function runs a framework like NestJS, Express or Hono and handles all routes internally.

```JS
API Gateway (all routes) → one Lambda → NestJS router → controllers
```

### ✅ Advantages

- Simple to develop, and it feels like a normal backend app. Since you use NestJS, you can run your existing app on Lambda with an adapter.
- Easy local development and testing.
- Fewer cold starts overall, because one warm function serves every route.
- Shared code is trivial.

### ❌ Disadvantages

- One set of permissions for everything (broader blast radius).
- One memory and timeout setting for all routes.
- Larger package and slower cold starts.
- Harder to see per-route metrics.

## A practical middle ground

Most real projects mix both:

- Group by domain, not by route. For example, one function for the orders API, one for users, rather than one for every endpoint or one for everything.
- Separate functions for event-driven work. S3 triggers, queue consumers and scheduled jobs are naturally separate Lambdas, because they have different triggers, permissions and resource needs.
- Split out heavy or special tasks. OCR, image processing and report generation get their own functions, since they need different memory and timeouts.

## Rules of thumb

- Different trigger → separate Lambda.
- Different permissions or resource needs → separate Lambda.
- Tightly related CRUD routes that share logic → fine to keep together.
- If you find yourself writing if (event.type === "x") ... else if (event.type === "y") inside one handler, that's a sign to split it.
- Don't go too far the other way either. A hundred two-line functions with duplicated setup code is also painful.

# 📍 Difference between 2 approaches

API Gateway + Lambda and API Gateway + EC2 (B-End)

- API Gateway + Lambda is serverless and charges per use, so it's usually cheaper at low or unpredictable load.
- EC2 charges for the server being on, so it can be cheaper at steady high load.

#### The two setups

```JS
//API Gateway + Lambda:
Client → API Gateway → Lambda (runs only when called) → database

//EC2:
Client → (load balancer) → EC2 server running your app 24/7 → database
```

API Gateway can also sit in front of EC2, but that's uncommon. Usually EC2 apps use an Application Load Balancer (ALB) instead, or no gateway at all.

## ✨ Main differences

```JS
                               |    API Gateway + Lambda                                                                |             EC2 backend

Server management              | None (AWS handles OS, patching, scaling)                                               | You manage the OS, updates,security, scaling
Running                        | Only when a request arrives                                                            | Always on
Scaling                        | Automatic, from zero to thousands of concurrent requests                               | You set up auto scaling groups, or it stays fixed
Billing                        | Per request + execution time                                                           | Per hour the instance runs, used or not
Idle cost                      | Almost zero                                                                            | Full price
Cold starts                    | Yes, the first request after idle can be slower (usually a few hundred ms)             | No, it's always warm
Request limits                 | API Gateway timeout of 29 seconds by default, Lambda max 15 minutes                    | No inherent limit
State                          | Stateless (no memory between invocations)                                              | Can hold in-memory state, caches, connections
WebSockets / long connections  | Possible via API Gateway WebSocket APIs, but awkward                                   | Natural
Database connections           | Tricky (many Lambdas can exhaust PostgreSQL connections, so you often need RDS Proxy)  | Easy, with one connection pool
Local dev and testing          | More effort                                                                            | Same as a normal Node app
```

## 💰 Cost: why load matters

Lambda and API Gateway bill per use. Roughly (check the AWS pricing pages for current numbers):

- Lambda: about $0.20 per million requests, plus a small charge for execution time (GB-seconds). There's a permanent free tier of around 1 million requests and 400,000 GB-seconds per month.
- API Gateway: about $1 per million for HTTP APIs, and about $3.50 per million for REST APIs.

EC2 is billed hourly. A small instance like a t3.micro or t3.small costs somewhere around $8 to $20 per month, whether it handles 10 requests or 10 million, and that's before a load balancer, which adds roughly $16+ per month.

So:

- Low or spiky traffic (a side project, internal tool, a few thousand requests a day): Lambda is far cheaper, often free or pennies, while EC2 charges you all month for an idle server.
- Steady, high traffic (millions of requests per day, constantly): per-request charges add up, and a few always-on EC2 instances (or containers) can be cheaper.
- There's a crossover point somewhere in the middle. Where it is depends on your traffic and how long each request runs, so it's worth estimating with the AWS pricing calculator.

#### ⭐ Beyond price

Cost isn't the only factor:

- Operational effort. With EC2, you patch the OS, handle scaling, and deal with a crashed server. That time costs money too.
- Predictability. EC2 has a fixed monthly bill. Lambda's bill grows with traffic, so a traffic spike or a bug (like an infinite retry loop) can produce a surprise bill, so set up billing alarms.
- Latency. EC2 has no cold starts, so response times are more consistent for latency-sensitive apps.
- Fit. Long-running work, WebSockets, heavy in-memory caching and apps that expect a persistent process are more natural on EC2 (or containers).

#### The middle option: containers

Between the two, there are also containers (ECS/Fargate, App Runner). You get a normal always-on app without managing servers, with simpler scaling than EC2. Many teams with a NestJS backend choose this over either extreme.

## ⚙️ How to debug Lambdas code, do i need to use CloudWatch ? then i can use console.log

CloudWatch with console.log is the standard way to debug Lambda in the cloud, and it’s what most developers use day to day. But you have other options, and you can catch many bugs before deploying at all.

- Test in the Lambda console (fastest feedback)
- CloudWatch Logs (the main tool in the cloud)
- Other

### Tips for useful logs

- Log structured JSON, for example console.log(JSON.stringify({ step: "s3-downloaded", key, size: bytes.length })). It’s easier to search and filter.
- Log error objects with console.error("message", error) so you get the stack trace.
- Don’t log secrets or sensitive data.

## Debug locally (don’t wait for the cloud)

- Plain Node script. Because your handler is just a function, you can call it yourself with a fake event: by creating separate file with the function that recreates Lambda
