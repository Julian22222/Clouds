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

# What is a VPC?

A Virtual Private Cloud (VPC) is your own isolated virtual network inside AWS.

Think of AWS as a huge apartment building. AWS owns the building, but when you create a VPC, AWS gives you your own apartment. Other customers have their own apartments, completely separated from yours.

Inside your VPC, you decide:

- What IP address range to use (for example, 10.0.0.0/16)
- Which resources can communicate
- Which resources can access the internet
- How traffic is routed
- Which security rules apply

A VPC is your own private virtual network inside AWS where you launch and manage your AWS resources.

# What are subnets?

A subnet is simply a smaller network inside a VPC.

```JS
Suppose your VPC has this IP range:
VPC
10.0.0.0/16

You can divide it into multiple smaller networks:
10.0.1.0/24
10.0.2.0/24
10.0.3.0/24
10.0.4.0/24

Each of these is a subnet.


Think of it like this:

AWS
│
└── Your VPC (your office building)
      │
      ├── Subnet A (first floor)
      ├── Subnet B (second floor)
      ├── Subnet C (third floor)
      └── Subnet D (fourth floor)

The VPC is the whole building.
Subnets are the individual floors.
```

# Why have subnets?

Subnets help organize resources and control network traffic.

```JS
//For example:

VPC
├── Public Subnet
│      ├── Web Server
│      └── Load Balancer
│
└── Private Subnet
       ├── Database
       └── Backend API

The public subnet contains resources that users on the internet can reach.
The private subnet contains resources that should never be directly accessible from the internet.
```

# Can subnets talk to each other?

Yes. By default, subnets inside the same VPC can communicate with each other because the VPC's route table includes a "local" route covering the entire VPC CIDR.

However, whether individual resources can actually communicate also depends on:

- Security Groups
- Network ACLs
- Route tables

```JS
//For example:

Internet
    │
    ▼
Public Subnet
    │
Web Server
    │
    ▼
Private Subnet
Database

The web server can connect to the database if the security rules allow it.
But users on the internet cannot connect directly to the database.
```

### Subnets are smaller network segments inside a VPC.

Subnet is simply a portion of your VPC's IP address space with its own routing and placement of resources.

# What is a public subnet?

A subnet is considered public when it has a route to an Internet Gateway.

```JS
//Example:

Internet
    │
Internet Gateway
    │
Public Subnet

Instances in this subnet can have public IP addresses and communicate directly with the internet.
```

# What is a private subnet?

A private subnet has no direct route to an Internet Gateway.

```JS
Internet

      X

Private Subnet
    │
Database

Resources in a private subnet cannot receive incoming internet traffic directly.

✨ They can still access the internet for software updates by using a NAT Gateway located in a public subnet.
```

# Many small projects use a single VPC, but it depends on the architecture.

```JS
//Examples:
Small application

AWS Account
└── VPC
      ├── Public Subnet
      └── Private Subnet

One VPC is common and often sufficient.

--------------------------------------

//Larger company
AWS Account
├── Development VPC
├── Testing VPC
├── Staging VPC
└── Production VPC

Using multiple VPCs helps isolate environments and apply different security policies.
```

```JS
//example
                 AWS
                  │
          +------------------+
          |       VPC        |
          | 10.0.0.0/16      |
          +------------------+
               /        \
              /          \
             /            \
+----------------+   +----------------+
| Public Subnet  |   | Private Subnet |
| 10.0.1.0/24    |   | 10.0.2.0/24    |
|                |   |                |
| Load Balancer  |   | Backend API    |
| Web Server     |   | Database       |
+----------------+   +----------------+

Users access the web server in the public subnet, which communicates with the backend API and database in the private subnet. The database is never exposed directly to the internet.
```

```JS
//The key difference

                    VPC                                             Subnet

Your entire private virtual network in AWS                  A smaller network inside the VPC
Defines the overall IP address range                        Uses a portion of the VPC's IP range
Can contain many subnets                                    Belongs to exactly one VPC
Often spans multiple Availability Zones                     Exists within a single Availability Zone
Used for network isolation                                  Used to organize resources and control routing

---------------------------------------------------------------------------------

An easy analogy

Imagine a university campus:

- AWS = the city.
- VPC = the university campus.
- Subnets = individual buildings on the campus (library, science building, dormitory).
- Rooms inside the buildings = your AWS resources such as virtual machines, databases, and load balancers.

The campus (VPC) defines the overall boundary, while the buildings (subnets) organize where different types of resources live and how they connect. This is the model many AWS beginners find easiest to remember.
```
