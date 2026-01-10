# Elastic Compute Cloud

# AWS Biling & Cost Management Dashboard

- it is on the main AWS dashboard or
- go to top right corner, click on - your account --> then click - Billing and Cost Management (see pic below)

![pic58](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic58.jpg)

- but it will be not available from IAM user account (if you are loged in as IAM user), because by default there is no permissions for that (see pic below)

![pic59](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic59.jpg)

- We need to give access in our root account (for Billing and Cost management dashboard) --> to this IAM user account. Even with Administrator policy

![pic59](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic59.jpg)

- Login to your root account
- From your root AWS account -> click in the top right corner on your account --> and then click --> Account (see pic below)

![pic60](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic60.jpg)

- Then you scrol down and search for --> IAM user and role access to Billing information, and press --> Edit (see pic below)

![pic61](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic61.jpg)

- Activate IAM access and press --> Update. This will allow IAM Users who are Administrators (who has Administrator policy) to access Billing Data.

![pic62](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic62.jpg)

- Then you can LogIn back to IAM User account

- go to top right corner, click on - your account --> then click - Billing and Cost Management (see pic below)

![pic58](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic58.jpg)

- now you have access to Billing and Cost Management from IAM User account

# How to read bills?

- click bills (see pic below)

![pic63](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic63.jpg)

- Here you can see charges for your account - what services and how much charged you.

- Here you see the Total service charges for your account is: $4.24

![pic64](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic64.jpg)

- then you can figure out what service and how much charged you, where - which rigion and how.
- This will give you information you need to be able to understand why you have some charges on your AWS account and then turn off or delete resources/services that you don't need.
- If you have some charges go to your --> Billing and Cost Management --> Bills
- and then look the bill of the current month and look for a Details of your charges to understand where these charges coming from.
- This is how you read Bills

### Setup a budget

- We can setup a billing budget if we go over spending some certain budget then AWS will let us know by an alert on email.
- in the Billing and Cost Management Dashboard on the left side console click --> Budgets and --> Create a budget

![pic65](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic65.jpg)

- It will give you different type of budgets, to keep it simple we will use -->

![pic66](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic66.jpg)

- then put budget name, an email to send notification, amount of budget and other stuff if needed. It will allow to control our budget.

# EC2

- EC2 it is the way you do Infrastructure as a Service (IaaS) on AWS
- EC2 is not just a one service, it composed of many things at the high level, so you can rent:
  - virtual machines on EC2 - they called EC2 instances (EC2),
  - you can store data on virtual drives (EBS volumes),
  - you can distribute load across machines (ELB - elastic load balancer),
  - you can scale services using auto-scaling group (ASG)

![pic67](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic67.jpg)

### What we can choose for our instances in EC2 (our server that we rent from AWS)?

![pic68](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic68.jpg)

- How much storage space you want:
  - do you want storage to be attached through the network (EBS & EFS)
  - do you want storage to be attached through the hardware (EC Instances Store)
- The type of Network you want attach to your EC2 instance - do you want network to be fast?, what kind of public IP do you want?
- Also, we need to hadle Firewall rules of our EC2 instance and it is Security group

Core of EC2 - you can choose how you want your virtual machine to be and then you can rent it from AWS.

![pic69](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic69.jpg)

# EC2 types example

- There is many EC2 types this is just example, here is 5 EC2 types -->
- You choose what kind of instance that fits best your application and you can use that in the cloud on your demand.

![pic70](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic70.jpg)

# Work with EC2

- in main console search for EC2 service and click on it, then change Region to be closer to you (right top corner)
- then click on instances (step 1, see pic below)
- then Launch instances (step 2, see pic below)

![pic71](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic71.jpg)

- then you need to choose your (AMI) - Amazon Machine Image. You chose an Image for your EC2 server.(see pic below)
- there is big choice of images. Also, there is AMI marketplace and we can create our own Images as well.

![pic72](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic72.jpg)

- Open Advanced details section and scroll to very end, until --> User data (see pic below)
- this User data section is used for scripts that will be launched/invoked during first start of the instance
- this script is going to launch a web server to EC2 instance and write a file to it.

![pic73](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic73.jpg)

```JS
//user data scripts

#!/bin/bash
# Use this for your user data (script from top to bottom)
# install httpd (Linux 2 version)
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
```

- then click --> Launch instance. Then it will show another window -->

![pic74](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic74.jpg)

- Here we need to select a key pair (pic above)
- Key pair is something that will be using to SSH, to login to our instance. And for now we don't have any key pairs in our account. Therefore we need to create a new key pair. And we have to name it -> "EC2 Tutorial" and then you have to download a file of this key pair.
- save this donloaded file and down lose it
- Then hit Launch instance

- Go to your EC2 Console and click Instances on the left side menu bar

![pic75](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic75.jpg)

- using Public DNS in URL - you can access your EC2 instance. We have started the web server on EC2 instance using user data script. Script was executed in first start of the instance and made a simple HTML page.

- If you stop your instamce and then start the instance again --> the "Public DNS" will be changed, to access to your instance through the URL!!! So you need to get new Public DNS. Private DNS satys the same.

# EC2 Instance Types

Different types of EC2 Instance are optimized for different use cases:

- General Purpose (this type starts with --> m)
- Compute Optimized (this type starts with --> C, because "C" stands for compute)
- Memory Optimized (this type starts with --> R, because "R" stands for RAM, Also, starts with X1 and Z1)
- Accelerated Computing
- Storage Optimized (this type starts with --> I, D and H )
- HPC Optimized (High-performance computing)

this web site is the reference for EC2 --> for EC2 types, cost and specifisity.

[--> EC2 types <--](https://aws.amazon.com/ec2/instance-types/)

![pic76](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic76.jpg)

Each type of instance has different family.

### General Purpose (EC2 Instance Type)

![pic77](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic77.jpg)

The instances always improving and the names changing, therefore refer to website to check current correct Instance type of family->

[--> EC2 types <--](https://aws.amazon.com/ec2/instance-types/)

### Compute Optimized

![pic78](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic78.jpg)

### Memory Optimized

![pic79](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic79.jpg)

### Storage Optimized

![pic80](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic80.jpg)

# Compare few EC2 Instance types

![pic81](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic81.jpg)

[ --> compare all EC2 instances specs in AWS <--](https://instances.vantage.sh/)

# Introduction to Security Groups

how to make Firewalls around EC2 instances

![pic82](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic82.jpg)

![pic83](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic83.jpg)

![pic84](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic84.jpg)

![pic85](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic85.jpg)

# How to reference Security Grops from other Security Groups?

![pic86](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic86.jpg)

- We have an EC2 Instance (see nr. 1 on the pic above)
- and it has a Security Group 1 Inbound rule - allowing Security Group 1 and Security Group 2 to connect with this EC2 (see nr. 2 on the pic above).
- And Inbound rules saying - I am authorising Security Group 1 and Security Group Group 2 (see nr. 3 on the pic above).

Why we do this?

- If we will launch another EC2 Instance and it has Security group 2 attached to it (see nr. 4 on the pic above).
- By Using Security run Rule - Security Group 2- that we just set up, we basically allow our second EC2 Instance to go and connect on the Port we decided to our first EC2 Instance (see nr. 5 on the pic above).
- similarly if we have another EC2 Instance with Security Group 1 attached - we also authorise this one to communicate with our first EC2 Instance. (see nr. 6 on the pic above).
- Regardles of IP of our EC2 Instances, because they have correct Security Group attached to them - they are able to communicate to our first Instance. Don't need to thing about IP.
- If we have another EC2 Instance that has for example: Security Group 3 attached to EC2 Instance. Because Security Group 3 wasn't authorised in Inbound rules in Security Group 1 then it will be denied (see nr. 7 on the pic above).

# Ports to know

![pic87](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic87.jpg)

# How to work with Security Groups

Security groups are the way how you can control access to networking to your EC2 Instance.

- Go to EC2 Dashboard
- then on the left side menu bar find --> Security Groups (see pic below)

Here we can see 2 Security Groups:

- launch-wizard-1 (which we created when we launched our EC2 Instance)
- defauld (this is created by default when you create your AWS account)

![pic88](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic88.jpg)

- Now if you click on "launch-wizard-1" Group or put a tick on that group. (step 1) --> You will see all the setting regarding this Security Group. (see pic below)

![pic89](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic89.jpg)

Security Group Details has:

- Security group ID --> this is how identify this Security Group within your account
- Inbound rules count - show how many Inbound rules this security Group has
- Outbound rules count - show how many Outbound rules this security Group has

- Then click on the Inbound rules section (step 2 from pic above). And you will see those 3 Inbound rules for this Security Group. Here we can adjust the rules. (pic above)

Source --> 0.0.0.0/0 <-- menas from anywhere (format for IPv4).

Source --> ::/0 <-- menas from anywhere (format for IPv6).

![pic90](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic90.jpg)

- Also, you can click on Out bound rules section

![pic91](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic91.jpg)

- You can see that everything is allowed, All Ports, to anywhere (see pic above). Which allows our EC2 Instance for example - to get software updates, or to send an email or anything, it allows to send the data anywhere using all ports. (This is default settings for Outbound rules)

- If you will clik on Inbound Rules section --> and click edit Inbound rules. (see pic below).

![pic90](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic90.jpg)

- Here you can adjust the Inbound rules. Adjust how comming in data interacts to your instance and what protocols, connection types, ports, IPs it should use.

Type <--means how do you want to connect to your instance(there is many options from the drop down menu - RDP, HTTP, HTTPS, SSH, TCP, and many more)

Souce can be adjusted - from anywhere, or from specific IP, orr just from your IP only, or custom to specific Security Group.

For example, from pic above : Type HTTP and HTTPS allow users by using internet to connect to our EC2 Instance from anywhere. If we will delete these 2 Inbound rules, User will not be able to connect to our EC2 Instance through the browser. If there is no Inbound rule to connect to EC2 Instance --> then users can't connect to it.

If we have no Inbound rules for HTTP and HTTPS but users trying to connect to your instance then server will show --> a "time out" , because there is no response after 30 seconds from the server.

As a general rule --> If you get a "time out" in AWS when you connect to your Instance, this has to be a Security Group issue. So if you can't connect to your Instance and there is endless loading circle and a "time out" error messege then you shoul have a look at your Security Group rules. And ensure that it was a setup correctly.Make sure that Inbound rule (Firewall) allowing the traffic going in to your instance.

# How do you connect inside your servers to perfome some maintenance or action

SSH - stands for Secure Shell, it is command line interface utility

Based on operating system you have on your computer you have different ways to achieve it.

- Putty - it will help to achieve the same thing as SSH to connect to your EC2 Instances, valid for any version of Windows
- EC2 Instance Connect - use your web browser, not a terminal, not a putty. It uses web browser to connect to your EC2 Instance and it is valid for all operating systems.

![pic92](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic92.jpg)

# SSH to connect your Instance

![pic90](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic90.jpg)

- before making a SSH connection to your Instance, in EC2 -> Security Groups - create SSH Inbound rule if it is not there (pic above)

![pic93](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic93.jpg)

- Go to your Instance dashboard/console (see pic below)
- Public IPv4 address <-- this is the link how i connect to my instance through the web. Copy this IP to use it latter for SSH connection. (see pic below)

![pic94](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic94.jpg)

- From "Security Groups" section that is on the left side menu bar, when we click on needed Instance - we have SSH Inbound rule type/ if the SSH Inbound rule not there - create SSH type (see pic below)

![pic90](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic90.jpg)

- So now we know that SSH Inbound rule exists and SSH has open Port 22 and it is open, protocol TCP ans Source - 0.0.0.0/0

- then we open a terminal and put -->

```JS
//ec2-user  <-- it is linux user into Amzaon linux machine
//if you will type this in terminal ->
ssh ec2-user@yourIPthatYouCopied
//ssh ec2-user@<public-ip>
//rememebr your public IP is changing when you stop the Instance/server and start the Instance/ server again

//- then it will ask - do you want to continue connecting --> yes
//Then it will show permission denied (publickey,gssapi-keyex,gssapi-with-mic)


//to access your EC2 you need .pem key file, you will use this key to connect to our Instance
//now you need to use our downloaded ".pem" file that, which we downloaded when we created our EC2 Instance
// EC2Tutorial2.pem  <-- this is the name of the file that i created and saved when created an Instance
// - now put your EC2Tutorial2.pem file into any your Directory  (can place it anywhere you want)
// - then navigate in terminal to your Directory where you have this EC2Tutorial2.pem file
//-i <-- menas key file (.pem) and then you refference your file name
//and now you can run in terminal-->
ssh -i EC2Tutorial2.pem ec2-user@yourIPthatYouCopied      //here we saying this is my key to allow to connect to my Instance


//now we have another warning - UNPROTECTED PRIVATE KEY FILE, this is common when you first time download the .pem file
//Warning aslo says --> Permissions 0644 for 'EC2Tutorial2.pem' are too open. That means that private key can leak.

//Because Private key is accessable by others, terminal will show message --> Load key "EC2Tutorial2.pem": bad permissions . And it will not allow you to SSH connection to this instnce/ to this machine
//to fix this we put in terminal -->
chmod 0400 EC2Tutorial2.pem

//and now run again your main command, and you will be connected to your Instance
ssh -i EC2Tutorial2.pem ec2-user@yourIPthatYouCopied
```

- all command in terminal (see pic below)

![pic95](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic95.jpg)

```JS
//to check that you have connected to your instance through SSH, type-->

whoami   //<-- it will show ec2-user

//now when we connected to our EC2 server, we can run commands from our EC2 machine

//to exit from EC2 server type -->
//esc
//or ctr + d  //to logout and you are back to your directory
```

# Another way to connect to your EC2 Instance that is called --> EC2 Instance Connect

EC2 Instance Connect - is the easiest and best way to connect to your Instance. This option doesn't need a "Key pair" (.pem file) to connect to your instance.

![pic94](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic94.jpg)

- Go to EC2 -> Instances (one the left side menu bra) --> select your Instance (put a tick) (see step a ,on the pic above)
- Then click --> Connect (see step b, on the pic above)

![pic96](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic96.jpg)

- click on EC2 Instance Connect option, leave default Username --> ec2-user, and click Connect. (see pic above)

- Then it is going to connect you automatically to your EC2 Instance (see pic below). This is not using your SSH key (.pem file) that you downloaded previously / you don't need .pem key file for EC2 Instance Connect. This option is uploading temporary SSH key behind the scenes on your EC2 Instance for you. Now I can interact with your EC2 Instance and write any command inside your instance (see pic below)

EC2 Instance Connect option rely on SSH Inbound Rule, it should exist in your Inbound Rule!!! If you don't have SSH Inbound rule -> in EC2 -> Security Groups. You won't be able to connect to your EC2 Instance. You need to have Port 22 open with SSH type in Inbound Rules.

![pic97](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic97.jpg)

# You have to use IAM Roles for EC2 Instances

Lets practice to use IAM Roles for EC2 Instance

You can connect to EC2 Instance either through SSH or EC2 Instance Connect

In this example we will use --> EC2 Instance Connect

- Go to EC2 --> Instances , click on the Instance and click Connect (see pic below)

![pic94](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic94.jpg)

- then press connect. To connect to your Instance (see pic below)

![pic96](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic96.jpg)

-then you will get --> (you connected and you are in EC2 Instance)

![pic97](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic97.jpg)

- this is linux terminal inside your EC2 instance in the Cloud

- then we need to run IAM comands -->

```JS
//clear  <-- to clean terminal from previous commands

aws --version   //<-- AWS comes with AWS CLI, will show current version of Linux in the EC2 Instance

aws iam list-users  //<-- AWS CLI will show - Unable to locate credentials. You can configure credentials by running "aws login". (see pic below).
//Don't run --> aws login, to configure credentials in AWS CLI -->

// ❌ NEVER configurete credentials in AWS CLI !!! NEVER EVER Enter YOUR IAM IP KEY - (such as: AWS Access Key ID and AWS Secret Key) into EC2 Instance.
// ❌ if we run "aws login" command and enter our personal details (such as: AWS Access Key ID, AWS Secret Key) into this EC2 Instance. Then anyone else in our accounts can conncet to our EC2 Instance --> using "EC2 Instance Connect" option. And then get our secret data from those credentials (such as: AWS Access Key ID, AWS Secret Key). And this is not what we want.

// ❗ Configure Credentials through IAM ROLES in AWS
```

![pic98](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic98.jpg)

- to configurete credentials, go to --> IAM --> Roles (the Role that we created, or create new Role) (see pic below)

![pic48](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic48.jpg)

- Click on the Role --> DemoRoleForEC2 (the Role that we previously created) and you will see -> one policy is attached to this Role

![pic99](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic99.jpg)

- Now we going to attach this Role (which contain only one policy for now) to our EC2 Instance to provide with credentials.
- Then we go to EC2 --> Instances --> click on your Instance (put a tick, see step 1 on the pic below) to see details about this Instance. Then go to Security (see step 2 on the pic below) -> and we can see there is no IAM Role attached to this Instance (see step 3 on the pic below).

![pic100](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic100.jpg)

- We need to attach our created Role (with 1 policy inside) to this Instance
- We go to EC2 -> Instances -> click on your Instance (put a tick) (see step a on the pic below)

![pic94](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic94.jpg)

- then click -> actions -> Security -> Modify IAM role (see pic below)

![pic101](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic101.jpg)

- then we need to choose IAM Role for this Instance (see pic below). Then click -> Update IAM role. To attache this - DemoRoleForEC2 role to our Instance.

![pic102](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic102.jpg)

- Now if you go back to security section you will see IAM Role added -> DemoRoleForEC2

![pic103](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic103.jpg)

- now iw we will go to our EC2 Instance AWS terminal, that we connected through "EC2 Instance Connect". And type again -->

```JS
aws iam list-users  //<-- it will work, we configure Credentials using IAM Roles

//it will give all the users ( see pic below)
```

![pic104](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic104.jpg)

This is how we provide AWS credentials to our EC2 Instances, only throug IAM Roles. Use IAM Roles for Instances

# EC2 Instances Purchasing Options

IF you rent a EC2 Instances on demand you will pay price per second. If you have different workloads - you can optimise your discount and pricing by specifying it at AWS.

![pic105](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic105.jpg)

![pic106](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic106.jpg)

![pic107](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic107.jpg)

![pic108](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic108.jpg)

![pic109](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic109.jpg)

![pic110](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic110.jpg)

![pic111](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic111.jpg)

Dedicated Instances mean you have your own Instance on your own hardware. Dedicated Host you get access to the physical server itself and it gives you visability into lower level hardware.

![pic112](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic112.jpg)

# Summary of purchasing Options, we will take a Beach resort as an example for easier explanation.

![pic113](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic113.jpg)

In terms of price comparison all price types was put together to give an example of m4.large - us-east (see pic below)

![pic114](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic114.jpg)

![pic115](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic115.jpg)

# Summary

![pic116](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic116.jpg)
