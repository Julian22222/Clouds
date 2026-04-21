# Deploying and Managing Infrastructure at Scale Section

# CloudFormation (it is called - infrastructure as Code)

It is a way to create your cloud infrastructure

you can organise and create all needed services (create AWS infrastructure) here and then delete all the services by scheduled time

![pic301](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic301.jpg)

![pic302](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic302.jpg)

![pic303](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic303.jpg)

When you insert what resources do you need - CloudFormation automatically creates a Diagram for your template. See pic below.

When can see different components/ services that were created. For example we have 2 security groups, ALB Listener, Launch Configuration, target group, Load Balancer, Auto scaling Group, DB Instance, etc.

![pic304](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic304.jpg)

CloudFormation is smart enough to create this diagram and create all relationships between all these components.

# How to use CloudFormation

- you go to CloudFormation service and press -> creare stack and you will see the form ->

![pic305](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic305.jpg)

template File should have ".yaml" extention and have a code that describes what services do you need. You can create this file in VSCode and save it on your computer.

```JS
//demo-template-cloudFormation-file.yaml

---
Resources:  //<-- we are creating resources
    MyInstance:   //<-- one resource will be called: MyInstance
        Type: AWS::EC2::Instance  //<-- this resource type is this
        Properties:  //<-- then you define some proporties for that resource
            AvailabilityZone: us-east-1a  //this shold much with your zone where you start creating your CloudFormation service
            ImageId: ami-a4c7edb2  //AMI
            InstanceType: t2.micro  //Instance type: t2.micro
```

- then click -> Next, and give a name for this CloudFormation, and you can add some parametrs if you need. but we don't anything in this case. and click -> Next
- now we can add tags and click -> Next -> then click-> create stack.

Also, CloudFormation is linked with other services and if you will create EC2 Instance it will appear in your EC2 service console, if you add Load Balance it will appear in EC2/Load Balancer console and etc.

Also, you can - Update your existing template.

```JS
//For example: another yaml template file
//updated-cloudFormation-file.yaml

---
Parameters:
    SecurityGroupDescription:
        Description: Security Group Description
        Type: String

Resources:
    MyInstance:
        Type: AWS::EC2::Instance
        Properties:
            AvailabilityZone: us-east-1a  //this shold much with your zone where you start creating your CloudFormation service
            ImageId: ami-a4c7edb2  //AMI
            InstanceType: t2.micro //Instance type: t2.micro
            SecurityGroups:  //security groups are attached to this EC2 Instance
                - !Ref SSHSecurityGroup
                - !Ref ServerSecurityGroup

    # an elastic IP for our instance
    MyEIP:
        Type: AWS::EC2::EIP
        Properties:
            InstanceId: !Ref MyInstance


    # our EC2 security goup  //the we define 2 security groups, with security group rules
    SSHSecurityGroup:
        Type: AWS::EC2::SecurityGroup
        Properties:
            GroupDescription: Enable SSH access via port 22
            SecurityGroupIngress:
            - CidrIp: 0.0.0.0/0
                FromPort: 22
                IpProtocol: tcp
                ToPort: 22

    # our second EC2 security group
    ServerSecurityGroup:   //
        Type: AWS::EC2::SecurityGroup
        Properties:
            GroupDescription: !Ref SecurityGroupDescription
            SecurityGroupIngress:
            - IpProtocol: tcp
                FromPort: 80
                ToPort: 80
                CidrIp: 0.0.0.0/0
            - IpProtocol: tcp
                FromPort: 22
                ToPort: 22
                CidrIp: 192.168.1.1/32

Outputs:
    ElasticIP:
        Description: Elastic IP Value
        Value: !Ref MyEIP
```

If you will upload this template code - CloudFormation is smart enogh to figure out what to do with this template and how to create services in correct order.

If you want to delete all services withing your CloudFormation, you don't need to go through all resources and delete all resource manually. You just -go to CloudFormation and press -> Delete (see pic below)

![pic306](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic306.jpg)

# AWS Cloud Development Kit (CDK)

It is a way to create your cloud Infrastructure as well

CDK helps - If you want to create your AWS infrastructure using familiar language(such as: JS,TypeScript, Python, Java and .NET) , and you don't want to use CloudFormation directly because it uses a "yaml" format. And you would like to write your cloud Infrastructure using one of these languages. With CDK you can do that.

![pic307](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic307.jpg)

Example:(from diagram above):

1. You are going to write your own CDK aplication in TypeScript and we are going to define Lambda function, mongoDB table, S3, and other 3 services in AWS.
2. Then this CDK application using CDK CLI is going to be transformed into CloudFormation Template.
3. Then that CloudFormation Template will generate CloudFormation, and then it can be applied into CloudFormation service to deploy our infrastructure.

The idea here that we want to use CDK and our programming language, it allows us type safety or make more familiar constracts etc. To go quicker, or to reuse some code.

# Here is an Example how CDK code would look like

In this example is used TypeScript (see pic below)

![pic308](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic308.jpg)

From pic above:

- We have VPC that was defined
- We have ECS cluster
- and we have Application Load Balancer with Fargate service

These 3 things will be compiled by CDK CLI into CloudFormation Template and then you can upload it and deploy to CloudFormation service.

# Beanstalk

it will allow you very easily run and manage your web apps.

When we have deployed a Web Application in AWS we tipically follow architecter that is called 3-tier architecture. (see pic below)

![pic309](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic309.jpg)

1. Our users talk to Elastic Load Balancer, that can be in multiple availability zones
2. Then Load Balancer will forward traffic to multiple EC2 Instances, managed by Auto Scaling group.
3. And then these EC2 Instances need to store data somewhere, so it use the database which is Amazon RDS/ relational database to read and write data. And if it needs to have inmemory database for inmemory cache. Then it can also use ElastiCache to store and retrive the session data or cached data.

This architecture we can easily reproduce manually, we can also reproduce it on AWS through CloudFormation service. But there is a better way ->

![pic310](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic310.jpg)

So when you are developer on AWS you don't want to managing infrastructure you just want to deploy a code, and you don't want configure all the databases, load balancers, etc. And you want to make sure your application scales.

Most Web Applications have the same or similar architecture (with a Application Load Balancer - ALB + Auto Scaling Group - ASG). As a Developer in AWS all you want to do is to run your code. Possible you want to run your code for different applications and environments the same way. Therefore here comes Elastic Beanstalk.

# What is Elastic Beanstalk

![pic311](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic311.jpg)

![pic312](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic312.jpg)

![pic313](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic313.jpg)

# Elastic Beanstalk Health Monitoring

Beanstalk includes full monitoring within the service itself. So it is going to be a health agents on each EC2 Instance to push metrics to CLoudWatch and then you can check these metrics do some monitoring in the CloudWatch. Also, it will check for application health and published helth events

![pic314](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic314.jpg)

# How to use Beanstalk

- Go to Elastic Beanstalk service
- put needed region for this service (from the top right corner)
- press -> "Create application" and you will see the form to fill

![pic315](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic315.jpg)

Upload a Zip file of your application that contains all needed files and dependencies at the root.

--> then

![pic316](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic316.jpg)

This part of AWS Elastic Beanstalk configuration is about permissions. Those permissions are controlled through AWS Identity and Access Management (IAM). There are two different roles because two different actors need permissions.

1. Service Role (for Elastic Beanstalk itself) - Just select defaul Role -> aws-elasticbeanstalk-service-role .By service role we mean Elastic Beanstalk and now we need to give it the Role, the permissions that it needs in order to create and manage AWS resources for you. Assigning a Role to Beanstalk environment. This basically allows Elastic Beanstalk to access and control other AWS services in your account so that it has whatever it needs to build your environment.

The Service Role is used by Elastic Beanstalk as a service. The Service Role is used by Elastic Beanstalk as a service. So this role allows Elastic Beanstalk to build and maintain your environment. Required policies for Service Role:

- AWSElasticBeanstalkEnhancedHealth
- AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy.

These policies allow: environment health monitoring, automatic platform updates.

📍 Remember that Beanstalk is going to create one EC2 instance. EC2 being the actual server, the actual compute that is going to be running your app. The app running in that server, lets say it needs to interact with the S3 bucket or it needs to interact with DynamoDB. S3, DynamoDB and others services are AWS services and your app by default won't be able to access them unless we attach certain roles to the EC2 instance that app is running in. So once again we need to create a Role for Elastic Beanstalk and we need to make sure that Elastic Beanstalk attaches that Role to the actual compute, the actual EC2 instances that are going to be running our Application. So it allows our environments EC2 instances to perform operations required for our app.

2. EC2 Instance Profile (for your servers)

when you press -> Create a Role for "EC2 Instance Profile" --> you will see this form, then press Next use all defaults settings.

![pic316a](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic316a.jpg)

The EC2 instance profile is used by the actual EC2 machines running your application. Use the standard name: aws-elasticbeanstalk-ec2-role. Add policies (they shuld be filled by default):

- AWSElasticBeanstalkMulticontainerDocker
- AWSElasticBeanstalkWebTier
- AWSElasticBeanstalkWorkerTier

--> then

![pic317](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic317.jpg)

We are not going to create a new VPC, we use the default VPC.

- in VPC you can adjust and control IP address ranges, Subnets (network segments), Internet access, Security rules and Routing. Every AWS account already has a default VPC created automatically. Default VPC already includes: Internet access, Public subnets, Basic routing, Basic security. Use the default VPC when: learning AWS, small projects, prototypes, personal apps, simple deployments. You create a custom VPC when you need more control.

VPC is a virtual boundary that isolates your resources into a private network, separating it from other resources and other networks. VPC is composed of subnets, and each subnet represents single availability zone in that region.

```JS
//for example

Internet
   ↓
Load Balancer (public subnet)
//Only Load Balancer can be accessed from the internet and then Load Balancer can interact with App servers
   ↓
App servers (private subnet)
////App servers cannot be accessed from the internet. Only App servers can access Database.
   ↓
Database (private subnet)
//Database cannot be accessed from the internet.
```

- Public IP address option - in most cases you should enable Public IP address when deploying a web app with AWS Elastic Beanstalk on Amazon Web Services. You don't need to enable it if you have advanced architectures and the EC2 instance is private and traffic goes through a load balancer.

```JS
Internet
   ↓
Load Balancer (public)
   ↓
EC2 instances (private)
   ↓
Database (private)


//But in our case we have this archetecture
Internet
   ↓
Elastic Beanstalk URL
   ↓
EC2 instance (public IP)
   ↓
Your Node server
```

- Instance subnets option -> If you select multiple Availability Zones, AWS can spread your instances across them. When you choose subnets, you're telling AWS where your EC2 instances should run. For learning / portfolio - Select 1-2 zones. for small production - select 2 zones. For large production - Companies usually use 2–3 zones. Avoid selecting all zones blindly. More zones can increase: networking complexity and cross-zone traffic costs.

- Enable Database option -> the Enable database option automatically creates a database in Amazon Relational Database Service (RDS) and connects it to the application running on your EC2 instances. If you enable this for your Back-end app, The database is tightly linked to the Elastic Beanstalk environment. If you delete the environment, the database is usually deleted too. That is why many developers avoid this option in production and leave it as disabled. What happens when you enable database? - Elastic Beanstalk will: Create an RDS database instance, Place it inside the same Amazon Virtual Private Cloud (VPC), Configure security groups so your app can access it, Provide environment variables with database credentials

--> then

![pic317a](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic317a.jpg)

Choose Root volume type = Provisioned IOPS (SSD) - If you do something demanding, running high traffic database

--> Then click Next and leave all the default settings

We provide just a code and envoronment (such as Node.js) to Beanstalk and Beanstalk will make the rest. Beanstalk use CloudFormation to provision your application. Beanstalk is linked with CloudFormation, EC2 and other services, duriing uploading your application to the Beanstalk -> CloudFormation service will show some results that is going on in Beanstalk and the same with other services if it is used in Beanstalk. After uploading your code to Beanstalk and after creating all the resources that you need through CloudFormation under the hood -> it will provide a link where you can get an access to your application. So Benastalk use CloudFormation Template to run entire stack.

You can update and deploy new application version.

✅ Environment variables (such as process.env.Database ) you can adjust in Beanstalk.

- you go to Elastic Beanstalk Console and from the left side panel click -> Environments (step 1 on the pic below)
- and then go to specific environment (step 2 on pic below) that we created via Elastic Beanstalk.

![pic317b](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic317b.jpg)

- then go to -> configuration (on the left side panel)

![pic317c](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic317c.jpg)

- then go to Updates, monitoring and logging section and pres -> Edit

![pic317d](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic317d.jpg)

- and then in the bottom you will find -> "Environment properties". Here you can add values for your secret Environment variables to use it in the App. You can use it to connect to your Database for example to use secret Database connection url.

If you want to delete your app - All the resources that we created inside Beanstalk we can terminate by clicking -> select your Beanstalk environment -> then go to Actions -> and click "Terminate environment"

Then go to Beanstalk Applications console and click -> Actions and click -> Delete application ( see pic above)

# What is the difference between Beanstalk and CloudFormation?

They are both use CloudFormation

- CloudFormation is going to be used to deploy infrastructure as a code. That means you can deploy anything, not only EC2 Insatcnes but anything on CloudFormation. And it doesn't have to be an application. CloudFormation is Infrastructure focused.

- Beanstalk is a code centric view, it is Platfor as a service (PaaS). First thing you need to do in Beanstalk to upload you code and Beanstalk will find a way you to run that code and it will do it for you. Beanstalk is more application focused.

# AWS CodeDeploy

![pic318](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic318.jpg)

This service allows for transition from on Premises to AWS by using and it allows to upgrade your EC2 instances versions

Best for: Advanced CI/CD pipelines. CodeDeploy is not a hosting service. It only automates deployments to: EC2, ECS, Lambda

So you still need infrastructure like: Amazon EC2, Amazon ECS, AWS Lambda

fol 11- ep 131
