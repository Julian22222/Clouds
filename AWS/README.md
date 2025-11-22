# AWS

S3, RDS, ECS, EC2, SQS/SNS, Elastic Beansta, SQ3, ElastiCache, API Gateway, Cloudfront, Cloudwatch, IAM, (KMS, KINESIS,EMR) , SSM, DynamoDB

# S3 or Amazon bucket

- It is a place where you can store files. It is Scalable Storage in the Cloud.
- You can keep your files private so they are only accessible by your application. Or you can make files publicly accessible.
- This service is called Amazon bucket or S3 service it is basiclly like a drive or a root folder. You can also create subfolders inside your bucket to organize your files.

# EC2

EC2 stands for Amazon Elastic Compute Cloud. It’s one of the main services provided by Amazon Web Services (AWS).

💡 What it is:

Think of EC2 as a virtual computer (or server) that you can rent from Amazon’s cloud.
Instead of buying a physical computer, you can create (“launch”) an EC2 instance — which is just a virtual machine — and run your software or website on it.

🧰 What it’s used for:

You can use EC2 for many purposes, including:

Hosting websites or web apps – for example, running your company’s website.
Running backend servers or APIs – services that mobile or web apps talk to.
Processing data – doing data analysis, machine learning, or big computations.
Testing and development – developers use EC2 to create test environments quickly.
Running enterprise applications – such as databases, email servers, or ERP systems.

✅ Why people like EC2:

You can choose how powerful your server is (CPU, memory, storage, etc.).
You only pay for what you use — no need to buy expensive hardware.
You can scale up or down easily when your traffic or workload changes.
You can deploy servers in different regions around the world.

In short:
👉 EC2 = virtual computers in the cloud that you can use to run almost any kind of software or workload.

# Hosting a website

You can host a website using only EC2, but often you’ll connect it with other AWS services to make things easier, faster, and more secure. Let’s go through both the basic setup and the recommended setup.

🪄 1. The Basic Setup (just EC2)

This is the simplest way to host a website on AWS.

Steps:

1. Create an EC2 instance

- Go to the AWS Management Console → EC2 → “Launch instance.”
- Choose an OS (like Amazon Linux or Ubuntu).
- Choose an instance type (e.g. t2.micro for free tier).
- Configure network and security (open port 80 for HTTP and 22 for SSH).
- Launch and connect via SSH.

2. Install a web server

- Once connected to your instance, install a web server like:
  - Apache (sudo yum install httpd or sudo apt install apache2)
  - Nginx (sudo yum install nginx or sudo apt install nginx)
- Start the web server (sudo systemctl start httpd or nginx).

3. Upload your website files

- Place your HTML, CSS, JS files into /var/www/html (for Apache) or the web root folder.

4. Access your website

- Get the Public IPv4 address of your instance.
- Open it in a browser: http://<your-ec2-public-ip>
- You should see your website!

✅ At this point, your website is live!
But it’s hosted directly on a single EC2 instance.

🌐 2. Recommended Setup (with other AWS services)

To make your website faster, more reliable, and easier to manage, you can connect EC2 with other AWS services:

1. Route 53 (AWS Service name) - Domain name(Purpose) --> (Why Use this service?) Lets you register and manage your domain name and point it to your EC2 IP.
2. S3 (AWS Service name) - Static files (images, videos) (Purpose) --> (Why Use this service?) Store large or static files cheaply and serve them quickly.
3. CloudFront (AWS Service name) - Faster content delivery (Purpose) --> (Why Use this service?) Caches your site globally for faster load times.
4. Auto Scaling + Load Balancer (ELB) (AWS Service name) - Automatic scaling (Purpose)--> (Why Use this service?) Handles more visitors by adding/removing EC2 instances automatically.
5. RDS (AWS Service name) - Database (Purpose) --> (Why Use this service?) If your site needs a database (like MySQL, PostgreSQL, etc.)
6. ACM + Load Balancer (AWS Service name)- HTTPS (SSL) (Purpose) --> (Why Use this service?) Makes your website secure with HTTPS.

⚙️ Example architecture:

User → CloudFront → Load Balancer → EC2 Instance → (optional) RDS Database + S3

This setup is common for production websites.

# Cloud architect, how all these AWS services connect together to form one working app or website

Let’s unpack how all these AWS services connect together to form one working app or website — and whether you need a “special” connection service.

🧩 1. The Key Idea

In AWS, you don’t need a separate “connection service” — the services are designed to connect to each other through:

- Networking (VPC, subnets, security groups)
- Permissions (IAM roles and policies)
- Configuration settings (DNS records, endpoints, etc.)

AWS gives you the building blocks, and you wire them together using those tools.

⚙️ 2. How They Connect (Typical Example)

Let’s imagine you’re building a simple web app:

- Frontend (website)
- Backend (API)
- Database
- Domain name

#### Here’s how you connect everything:

🖥️ Step 1: EC2 (your app server)

- Your app runs here — e.g., Nginx + Node.js + PHP + Python Flask, etc.
- It lives inside a VPC (Virtual Private Cloud), which is like your private network in AWS.

🌐 Step 2: Route 53 (your domain name)

- You buy or connect your domain (like myapp.com).
- In Route 53, you create a DNS record that points to:
  - Your EC2 instance’s Elastic IP, or
  - A Load Balancer (ELB) sitting in front of EC2.

🧠 Think: “When someone types myapp.com, Route 53 sends them to my EC2 app.”

⚖️ Step 3: Load Balancer (ELB)

- Handles traffic and sends it to one or more EC2 instances.
- Provides an HTTPS endpoint if you use AWS Certificate Manager (ACM) for SSL.
- Connects to EC2 through the same VPC and security groups.

🧠 Think: “The Load Balancer connects users to the right EC2 instance safely.”

🗃️ Step 4: Database (RDS)

- RDS runs inside the same VPC (private subnet).
- EC2 connects to RDS using the database endpoint (like mydb.abcdef123.us-east-1.rds.amazonaws.com).
- A security group rule allows EC2 to talk to RDS on port 3306 (MySQL) or 5432 (PostgreSQL).

🧠 Think: “EC2 is allowed to talk to RDS privately — no internet needed.”

🪣 Step 5: Static Files (S3)

- Your app can upload or fetch files from an S3 bucket.
- You give EC2 IAM permissions to access that bucket.
- Optionally, you use CloudFront in front of S3 for faster global delivery.

🧠 Think: “EC2 talks to S3 via AWS’s internal APIs.”

🔐 Step 6: IAM (Permissions)

- IAM Roles control what EC2, RDS, or other services can do.
  - Example: EC2 Role allows access to S3 and CloudWatch logs.
  - This replaces API keys or passwords in code.

🌍 Step 7: CloudFront (optional but powerful)

- CloudFront caches your website around the world.
- It connects to your Load Balancer or S3 bucket as its “origin.”
- Route 53 can point your domain to CloudFront for the fastest user experience.

🧠 In Summary

- VPC / Security Groups --> Controls which services can talk to each other.
- IAM Roles & Policies --> Controls who has permission to access what.
- DNS (Route 53) --> Routes user traffic to your app.
- Endpoints (URLs) --> Each service (EC2, RDS, S3) has one. You connect via these.

👉 You build your app by configuring these connections — AWS doesn’t need an extra “connection service.”
The “glue” is mostly networking + permissions.

# Cloud Computing is the delivery of compute resources through a cloud platform over the internet with pay for what you use model.

# AWS (Amazon Web Services) is a cloud service platform which offers multiple secure on-demand operations like compute power, database storage, content delivery etc. to help corporates scale and grow.

AWS -

- is a secure cloud service platform from Amazon
- can be used to create and deploy any type of application, machine learning, AI, etc. in the cloud
- it provides services over the internet, you can access AWS through internet.
- you pay only for what you use

# Benefits of AWS

- Easy to use
- Flexibility, can integrate with other services even with services outside of AWS
- Reliability
- Services are scalable
- Cost-Effective (using more services - per unit price drops down)
- Security

# AWS Products and Services

- Compute
- Storage
- Database
- Migration
- Network and content delivery
- Developer tools
- Management Tools
- Media Services
- Machine Learning
- Analytics
- Security, Identity & Compliance
- Mobile services
- Application Integration
- AR and VR
- Customer Engagement
- Business Productivity
- Desktop and app streaming
- IOT (Internet Of Things)
  -etc.

# Compute Services

This service helps any user to develop, deploy and scale an application and workloads in the cloud.

AWS offers many options to use compute services in the cloud. Some of them are

- EC2 - is a VM in the cloud
- Lambda - serverless computing in the cloud to compute service
- Elastic Container Service - help batch processing and deploying applications
- Elastic Load Balancer - when we run our applications on multiple servers

# EC2

It is a compute webservice which helps to resize your compute capacity where you can run your own application programs in the virtual machine.

# Lambda

Is a serverless compute service. It is used to execute backend code and scales automatically when required.

# Storage Services

AWS provide low-cost data storage for backup, archiving and disaster recovery with high durability and availability. AWS is known for its durability and availability.

- S3 - storage for users and applications where files can be directly upload and download content from internet
  -EBS - durable block storage that attaches to EC3 instance
  -Glacer - archival storage in the cloud
- Storage Gateway - is a gateway for storing data locally and having a backup in the cloud in case of disaster.

# S3

It is a web based storage service designed for online backup and archiving of the data. It provides very high durability, chances to lose your data nearly zero.

# EBS

It provides high availability and continuous block storage volume for Amazon EC2 instance in the cloud environment

# Database Services

AWS database domain provides cost efficient and reliable database (relational and non- relational) instances

- RDS
