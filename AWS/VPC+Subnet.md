- Every Region is composed of many availability zones . AZ - are physical centers where you can deploy your resources (web servers, web applications, etc.)
- Millions of other people can also deploy their resources in that same Region. This is why AWS divides the Cloud Region into private networks that can separate your resources from everybody else's.
- Each Private network is know as a Virtual Private Cloud because it creates a private isolated network in the cloud just for you.
- Now if we consider that a VPC is a network that isolates and connects all your resources across the entire Region. The actual resources deployed per availability zone exist in a placement within that network known as a Subnet.
- VPC spans an entire Region and a Subnet spans a single availability zone. This is important distinction because not all your resources should be accessible from the internet. (make all resources - private, and only first service that connects to public internet can be public). Public Subnets have a route to an internet gateway attached to the VPC that allows their underlying server to receive public traffic. Private Subnets don't have that route to an internet gateway. So they contain resources that should never be directly accessible from the internet. (like databases, etc.)

- VPC is needed to isolate all resources that are needed for your infrastructure. VPC is a virtual boundary that isolates all of your resources into your own segregated network that is separated from any other VPC existing in that Region.
- Subnet is a segment within this network that organises your resources by availability zones. Subnets are existing inside VPC.

- While a VPC is scoped to 1 entire Region (for example: us-east-1). Each subnet is scoped to a single Availability Zone. Each availability zone contains a public Subnet and a Private Subnet. (see pic below)

![pic1a](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic1a.jpg)

Public Subnet is one that is connected to an Internet Gateway. Meaning that anything you deploy in the Subnet, let's say it EC2 Instance - a web server. The IP address of that Web server would be public and anybody from outside would be able to connect to it. It can decrease security level. You increase the attack surface by which people can exploit your server vulnerabilities. Putting your web server in a private Subnet that has no direct access to internet gateways, Private Subnet service can be only be accessed by other resources within the same VPC. And in the public Subnet put 1 single Load Balancer that will take public traffic - traffic from the outside and distribute it to services that are in a protected - private Subnet.

- Putting your resource into different availability zones gives High availability. In the event that 1 availability zone has like a power outage or something, you want your services still be running.

https://www.youtube.com/watch?v=OQbe_MCSI_0&list=PLZv1rlQ0kEKhi3GbMTpfanRaU-GnadvOm&index=3
