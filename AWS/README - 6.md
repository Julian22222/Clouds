# Elastic Load Balancing (ELB) & Auto Scaling Groups (ASG)

Here you will see the power of the AWS cloud and the cloud in general.

![pic162](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic162.jpg)

![pic163](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic163.jpg)

![pic164](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic164.jpg)

![pic165](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic165.jpg)

![pic166](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic166.jpg)

![pic167](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic167.jpg)

# Elastic Load balancing

This is the first service thta allow us to be more Elastic on AWS

![pic168](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic168.jpg)

- you have "Load Balancer" is managed by AWS. and it is Publicly is exposed for the users
- behind "Load Balancer" you have multiple EC2 Instances, in our case we have 3 EC2 Instances.
- Then we have a first user talking to "Load Balancer" -> and "Load Balancer" will direct the traffic to one of these EC2 Instances. Then EC2 Instance will reply back with something and the user will get the response.
- Now if the second user will will use our server -> user again will talk to "Load Balancer" -> and "Load Balancer" will direct the traffic to another EC2 Instance. Then that EC2 Instance will reply back with something and the second user will get the response.
- When third user will come in, he will interact with the last EC2 Instance and will get the response back.

The role of Load Balancer -> the more user we have the more it will balance the load across multiple EC2 Instances and it will allow us to scale better our back-end.

![pic169](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic169.jpg)

![pic170](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic170.jpg)

# How to use Load Balancer

First we need to create 2 running servers and then we can add a Load Balancer in front of them.

- Create 2 new EC2 Instances with different availability zones in each one. Go to -> EC2 -> Launch Instance. And fill the Instance form. (see pic below)
- but in Network settigs -> press Edit -> and add different avaialbility zone for your first EC2 Instance and then create second EC2 Instance and choose different availability zone for your second Instance.

![pic72](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic72.jpg)

add this code to each EC2 Instance -> to Advanced details -> User data (the last section in the bottom) (see pic below)

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

- after pressing -> Edit in Network settigs you will see --> see pic below. You can choose either "Subnet" (see step 1 on the pic below) to put your Instances to different availability zone or "Availability Zone" section (see step 2 one pic below)

![pic171](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic171.jpg)

- Options from dropdown menu for "Subnet" (see pic below)

![pic172](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic172.jpg)

- Options from dropdown menu for "Availability zone" (see pic below)

![pic173](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic173.jpg)

- Now you have few EC2 Instances running and they have diiferent IP addresses but we want one "end point" or URL address for all these Instances - for users
- therefore we go to "Load Balancers" - on the left side menu bar (from EC2 Console) -> then press Create load balancer (top right corner)
- Then you will see different "Load balancer" options (see pic below)

![pic174](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic174.jpg)

- We have - Application Load Balancer, Network Load Balancer and Gateway Load Balancer. We will use -> Application Load Balancer

-Because you are accessing our application using HTTP -> then the best option will be - Application Load Balancer option. This option uses HTTP and HTTPS

-The Network Load Balancer - will be very helpful if you want to support millions of requests per second, this is very high performance "Load Balancer". This option uses TCP, UDP, TLS

-The Gateway Load Balancer - will be helpful when you want to analyze IP traffic and send it to 3rd party appliances before sending to its targets. This option uses IP

- then we select -> "Application Load Balancer" and fill form for "Load Balancer" (see pic below)

![pic175](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic175.jpg)

- When you create a target group:

  - Target type = Instances
  - put the name of target grouo
  - leave Protocol - HTTP :80 as it is by default
  - Protocol version = HTTP1
  - then press -> NEXT -> and select all you targets/ servers for your Load balancer
  - Press -> Include as pending below button -> to add your targets to the Review targets list.
  - Then press -> Create target group

- Now you can check your new just created "Load Balancer" -> by clicking on Load Balancers - from the left side menu bar (from EC2 Console)
  - you need to wait for some time to get Load Balancer State = active.
- Select your Load Balancer and under -> DNS name you will have single URL for your servers/ targets that users can use (see pic below)

![pic176](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic176.jpg)

Now if any of the servers/ targets will stop working (server failure, etc.) -> Load Balancer will know that and won't send the traffic to that not working server any more.

# What is An Auto Scaling Group?

![pic177](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic177.jpg)

# Elasticity

![pic178](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic178.jpg)

![pic179](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic179.jpg)

- If we have Auto Scaling Group for example with one EC2 Instance - web traffic will go through "Load Balancer" which will redirecting the traffic directly into your EC2 Insatance. As our Auto Scaling Group scales out by adding EC2 Instances. The "Load Balancer" will register new EC2 Instances and will send the traffic into new added Instances as well. As we add more and more EC2 Instances - the "Load Balancer" distributes more and more traffic between those EC2 Instances. All the way until the maximum size of your Auto Scaling Group if it reaches that point. (see pic above)

# How to use AutoScaling Group

- Go to Auto Scaling Groups (on the left side menu bar)
- press Create Auto Scaling Group and fill the form

![pic180](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic180.jpg)

Launch Template (from pic above) - you need to create a launch template -> define how the EC2 Instances are going to be created. we identify how and what specs will have new Instances.

- click on --> Create a launch template, it will open new Tab, it will help me to create a Launch template
- fill the form of "Launch template"
  - name
  - select AMI (what virtual machine to launch - Amazon Linux, Ubuntu, Windows,macOS, etc.)
  - choose instance type - t3.micro (for example)
  - key pair -> use existing key pair
  - Network settings - use Virtual Private Cloud (VPC)
  - Security Group - use existing group
  - Storage - can keep the same or change
  - Advanced details - if you need you can add User data -> some additional code for your server(as we did before to say "Hello world")
  - then press -> Create launch template

The Launch template form looks very similar to the form that we do when we create the new EC2 Instance.

When you fill the Launch Template form it doesn't launch any instances it is just a template. You will use it in Auto Scaling Group form -> in dropdown menu - where says - select a launch templete. (see pic below)

![pic180](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic180.jpg)

Now Auto Scaling Group will know how to create Instances for us.

- then fill the rest of the Auto Scaling Group form. In Purchase options and instances types section -> choose Adhere to launch template
- in Network section -> choose diiferent subnets (to make sure that Auto Scaling Group is highly available ) -> you choose all the subnets (choose different availability zones)
- Load balancing section -> select it
- choose a target group -> targets / servers that you want to use for your Auto Scaling Group
- Health check section -> select EC2 and ELB (it means if your Load Balancer detects that any of your Instances is unhealth/ failure of the server then your Auto Scaling Group(ASG) will understand thtat one of your Instances is unhealthy and will replace with the new working Instance)
- Group size option -> here you define how your Auto Scaling Group will scale -> there is 2 options
  1.  Manual Scaling -> specify how many Insatnce do you want to run -> on usual/ by default load, max load and minimum load (depending from the workload)
  2.  Auto Scaling (then you fill the metrics - when do you want to add new Insatnce, after specific load on the servers, CPU load, number or requests at the time or etc.)
- then click to -> Create Auto Scaling group

Now you can see all the Auto Scaling Groups in Auto Scaling Groups Console (which is on the left side menu bar)

- In Auto Scaling Groups Console you can track how many Instance you have at the moment, types of instances, availablity zones where the Instances were launched, Health Status of Instances

Auto Scaling Groups works with Load Balancer and uses Target Groups. Therefore in your -> Target Groups (on the left side menu bar) -> you will see new Insatcnes. In Load Balancer you can get get the DNS for user/ URL to your servers

With Auto Scaling Group - Instances will be created automatically and they will be registred under Application Load Balancer

Now if you manually terminate/stop one of the Instances -> Load Balancer detects that one of your Instances stopped or failed and will launch another new Instance automatically, because we put put this settings in Auto Scaling Group form.

How delete Instances while you are using Auto Scaling Group -> go to Auto Scaling Groups (on the left side menu bar). Select your Scaling group and delete it.

Target Groups - Is free to keep it, you won't be charged for Target Groups

Delete -> Load Balancer, you will be charged for it

# Auto Scaling Groups - different Scaling Strategies for your Auto Scaling Groups

![pic181](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic181.jpg)

and

![pic182](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic182.jpg)

- Manual Scaling - which is when we update the size of our Auto Scaling Group (ASG) manually (for example we change capasity from 1 to -> 2 or back from 2 to -> 1)
- in Simple or step Scaling - here we define the trigger and we define how many units we add or remove from ASG.
- Sceduled Scaling - when we know in advance that changes will happen in future. For example: we know thta on Fri from 5pm people going to do sports betting before a football match and we want to increase minumum capasity -> to 10 of EC2 Instances in your ASG
- Predictive Scaling - there is some algoritms, it will look at the past traffic patterns and it will forecast when it will happen to traffic based on the past patterns. It predicts what the load will be over time and maybe the load is on the daily basis will pics/increases for 3 hours -> and it will automatically supply right number of Instances in advance to match that predicted period.

# ELB & ASG Summary

![pic183](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic183.jpg)

- Once we distributed the traffic to multiple EC2 Instances it is good for us to Scale them through Auto Scaling Groups (this is Elastisity)
- Any Instances created with ASG will be registred with ELB
