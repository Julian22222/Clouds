# ECS Section

Before ECS we need to mention Docker

![pic273](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic273.jpg)

(see pic below) If we talk about Docker on EC2 Instance we have, for example:

- Docker running Java code
- Docker running Node JS code
- Docker running MySQL database
- Docker running Java code
- Docker running Java code
- Docker running Node JS code

All Docker containers on the same EC2 Instance. The idea is that if we manage to package our application in a Docker container then it will be very easy to run this Docker container on EC2 Instance.

![pic274](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic274.jpg)

You need to create Docker Images and then from images you can create Docker containers

![pic275](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic275.jpg)

# Do you want to use Docker or Virtual Machine (VM) ?

![pic276](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic276.jpg)

- For VM - we have Infrastructure on AWS, then we have the Host Operating system, then the Hypervisor and then we can have as many virtual machine we want on the Guest Operating system.
- In case of Docker we have Infrastructure on AWS, the Host Operating system - which is EC2 Instance, and then the Docker Daemon. And as soon as Docker Daemon is running we can have many containers running to the Docker Daemon. They are light weight, they don't package, they don't come with the full operating system. Easy to run and easy to scale.

# ECS

![pic277](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic277.jpg)

(see pic above) On the diagram we have multiple EC2 Instances adn we need to create these EC2 Instances in advance and they will be running different containers by ECS service. Any time ECS service has a new Docker container, ECS will find automatically in which EC2 Instance to place that new Docker Container. ECS is not a serverless service.

# Fargate

![pic278](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic278.jpg)

- Fargate - is also is used to launch containers on AWS.
- But this time we don't need to create any EC2 Instances and manage them in advance. This is much more simple offering from AWS. It is Serverless offering - because we don't manage any servers.
- Fargate it is much easier to use

(see diagram on the pic above) Let's say we have new Docker Container to be run on Fargate -> then Fargate will automatically run that container for us. We don't exacly know where but it will run. So Idea here - with Fargarte we don't manage any EC2 Instances and it is easier to use.

Before with ECS, we first created EC2 Instances but with Fargate we don't need to do it. But both services allow to run Docker Containers on AWS.

# ECR

this service is used to store Docker Images - to be run on AWS.

![pic279](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic279.jpg)

With ECR we are going to store our Images of our application on Amazon ECR (see diagram on the pic above) and then Fargate will be able to look these Images and create a Container from them and run them directly on Fargate service. ECR can keep many Images.

# What is serverless ?

![pic280](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic280.jpg)

In this course we have some Serverless services in AWS -->

![pic281](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic281.jpg)

# AWS Lambda

![pic282](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic282.jpg)

- If we use EC2 Instance - we have a Virtual server in the cloud but we are bounded by amount of memory and CPU power we give it. It is continuously running even if we don't use it. If we want to scale we can use Auto Scaling Group (ASG) but that means that we need to add or remove servers over time. That maybe a little slow or maybe sometimes be complicate to implement. (see pic above)
- With Lambda - in this case we don't have servers. We just have Virtual functions. And these functions are limited by time. So they intended for shorter executions. They will run on demand - whenever we run a function it will be there to run. If we don't need a function - it will not be run and it won't be build for it. Have automated scaling.

# Benefits of AWS Lambda

![pic283](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic283.jpg)

![pic284](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic284.jpg)

# Common use case of Lambda

![pic285](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic285.jpg)

1. Let's say we have S3 bucket and we add images in it. Us or our users are uploading - a beach image into S3 bucket.
2. S3 bucket will trigger a Lambda function once the image is uploaded and that Lambda function will take that image and will change it to create a Thumbnail.
3. Lambda will push the Thumbnail back to AWS S3 (Thumbnail is a smaller version of the image)
4. Or Lambda is also push some metadata about Thumbnail into DynamoDB (that includes the image size, image name, creation date, etc.)

And all of these is fully event driven and fully serverless (all these services are serverless)

# Another use case of Lambda

![pic286](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic286.jpg)

CRON will allow you to define a schedule, for example - every hour, every day or every Monday,etc. And based on the schedule to run a script. By default CRON Job is run on Linux AMI - on a Linux machine. But we are serverless se we can't provision EC2 Instance so instead we will be using - CloudWatch Events or EventBridge. And this service will be triggering every 1 hour our Lambda function to perfome a task. And effectively we have no servers in this. Because CloudWatch is serverless and Lambda is serverless. and effectivelly we are launching a script every hour throug a Lambda function.

# AWS Lambda Pricing

![pic287](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic287.jpg)

# How to work with Lambda

AWS Lambda lets you run code without thinking about servers. It makes trully serverless service.

- Go to Lambda service
- For beginers you can play and get basic knowladge about Lambda and understand how Lambda works on website below - (this is introduction to lambda) ->

```JS
https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/begin

//choose language that you want to use and click Run and then Next, to see bacics of Lambda performance (see pic above)
```

![pic288](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic288.jpg)

The code will be uploaded to the Lambda console and then Lambda will run the code for you.

### How this Lambda function is getting invoked?

![pic289](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic289.jpg)

Lambda is responding to events. (see pic above). Events can come from different resources - for example from Streaming analytics, S3 bucket, Mobile/IoT backends, etc.

(see step 1 on the pic above) As Streaming analytics is sending events to a Lambda function -> the Lambda function is returning "Hello from Lambda!" message.

if services will send many events to Lambda function at the same time -> it will go to Lambda Console and then -> it will be invoked by order. (see pic above)

![pic290](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic290.jpg)

if the events load increases then the Lambda automatically will scale with the load.

# How to work with Lambda

- to start create a function -> go to Lambda service and click Create function

![pic291](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic291.jpg)

- Then fill the Lambda function form

![pic292](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic292.jpg)

- then, when your function is created you will see this page ->

![pic293](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic293.jpg)

you can test your your imported code with different values that you indicate there.

if we use - console.log in Lambda function code -> it will appear in Lambda Logs!

# Amazon API Gateway

![pic294](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic294.jpg)

if you want to build serverless HTTP API. In this example we have serverless technology, we use Lambda and we are can use CRUD opperations (reading, creating, updating and deleting data) from DynamoDB. Lambda and DynamoDB are both serverless technologies. But we want external client to be able to access our Lambda function, but the Lambda function is not exposed as an API righ away for this we need to expose it an "API Gateway". Whic is going to provide the client with the "REST API" to connect directly to your website.

You can see from the pic above, client can talk to API Gateway, the API Gateway will PROXY the REQUESTS to your Lambda functions which will executes the transformation (CRUD) on your Data in the Database.

API GAteway is used as a fully managed service which allows developers to create, publish, maintain, monitor and secure APIs in the cloud. It is serverless technology and is fully scalabale.

# AWS Batch

Another service

![pic295](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic295.jpg)

For example (see pic below): you want to proccess images submitted by users into AWS S3 using a Batch service. So image we put in AWS S3 will trigger a Batch job and Batch will automatically have an EC2 cluster made of EC2 Instances or Spot Instances and Batch make sure that you have correct number of instances to accomodate the load of the Batch jobs you have in the match queue (see step 1 on the pic). And then these Instances will be running your Docker images that will be doing your job and maybe that job to insert the processed object (maybe it is a filter on top the image ) into another AWS S3 bucket (step 2).

![pic296](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic296.jpg)

# Batch vs Lambda ( What is the difference) because it looks similar

![pic297](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic297.jpg)

# AWS Lightsail

- It is a light version of AWS but it is not something that you is going to use as a developer.
- it is stand alone service and it is a separate service and very simple to create.
- Lightsail is much lighter and allow quickly create some services without understanding higher infrastructure behind it. It is for very simple applications. A lot of server settings are hidden.

![pic298](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic298.jpg)

# Summary

![pic299](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic299.jpg)

![pic300](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic300.jpg)
