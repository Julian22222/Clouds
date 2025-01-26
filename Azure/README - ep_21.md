# Azure Security Groups | Network Security Groups and Application Security Groups (NSG, ASG)

Use these groups to secure our Networks

Check Episode_10 , It has different connections between Subnets and Virtual Networks

## Network Security Groups (NSG) ![logo8](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo8.jpg)

![pic52](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic52.jpg)

Imagine you have 2 Virtual Machines within a single Virtual Network placed in 2 separate Subnets. If you want to control the traffic that comes from internet to that Virtual Machine you can place a Network Security Group (NSG) on that Subnet. Those Security Groups will only allow specific traffic to reach that Virtual Machine. You can also use Network Security Groups to manage the traffic across Subnets. It is really a tool for you to manage your networking in secure and efficient manner.

![pic113](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic113.jpg)

Let's say we have 4 servers, 2 servers to handle Web application traffic, 1 server to handle business logic and 1 more server to host our database. Depending on our architectural decisions we can devide those into subnets. For example have 1 subnet for all the microservices and Web application traffic and another subnet to handle our data tier applications. And since those are subnets they need to reside/ be located in Virtual Network. If we create infrastructure like this and we don't do anything else. All the traffic coming from the internet will be allowed to all of these servers. Additionally all the traffic between these servers will be allowed. Therefore everything can communicate with everything.

But in our scenario this is something that we don't want to happen because our internet traffic should not be reaching our database and not all of these services should be able to communicate with each other.

![pic114](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic114.jpg)

--> This is where Network Security Groups (NSG) come in handy. For instance place NSG on the first subnet allowing traffic from internet (Web traffic) to reach our Web tier services. And by creating NSG on the second Subnet we can block the traffic comming from the internet but still allow the traffic coming from our own services.

## How to use NSG

- Let say we have VM and we need to connect to VM.
- Create NSG, this a place where you can manage all the networking rules for your VM.
- Your VM and created NSG must be in the same Resource Group ( common place for all the services that are related to each other)
- go to just created NSG and click on Inbound security rules (left side menu panel)

![pic115](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic115.jpg)

Inbound security rules - is the place where we can manage all the rules for INCOMING traffic to our server.

In this case there is a rule called --> RDP, which allows all the traffic coming from the PORT 3389 which is used by Remote Desctop Protocol.

--> Here you can click on each line to edit, delete or adjust certain traffic rule. (It will open the same pop up window when you add a rule to NSG)

![pic116](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic116.jpg)

Also you can click --> +Add and add new security group rule

![pic117](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic117.jpg)

When you adding a new rule or editing you get the Security rule form:

- In Source , we can select --> Any, which mean anyone from anywhere in the planet from any IP can connect to this server.
  Other options: - IP addresses (to allow specific IP addresses to connect), - Service Tag (allow a specific service category within Azure to coonect), - Application security group
- Source port ranges : \* , it means any port
- Destination: Any, means protected by this network security groups
- Destination port ranges: In case of RDP it allways must be 3389, this is PORT which use Remote Desktop Protocol
- Protocol: In case of RDP always use --> TCP
- Action: Allow, means allow this type of flow to go through our network security group
- Priority: 100,
- Name <-- give a meaning name for this NSG, for instance: AllowRDP, which will let us know what this rule does without a need to check the configuration of this specific rule
  And then press Add

![pic118](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic118.jpg)

We can also see exclamation mark next to our RDP rule, this is because based on Microsoft recommendation and in general based on security recommendations you should not open your RDP connectivity for everyone anywhere. You should always target specific servers and specific IP ranges, but in for this example/testing is fine.

Key Characteristics:

- Designed to filter traffic to (inbound) and from (outbound) Azure resources located in Azure Virtual Network. NSG are designed to filter the traffic that is going to and from Azure resources that are located within a Virtual Network.
- Filtering controlled by rules. All the filtering for Network Security Groups (NSG) is done by something called rules.
- Ability to have multiple inbound and outbound rules. You can have multiple rules for both incoming and outgoing traffic.
- Rules are created by specifying:
  - Source/Destination (IP addresses, service tags, application security groups)
  - Protocol (TCP, UDP, any)
  - Port (or Port Ranges, ex.3389 - RDP, 22 - SSH, 80 - HTTP, 443 - HTTPS)
  - Direction (inbound or outbound)
  - Priority (order of evaluation)

And the rules themselves are created by specifying source and destination by using IP ranges, service tags or application security groups. Additionally specifying the protocol --> TCP, UDP or Any. You can also specify Port or Port ranges allowing you target only specific services. For example: RDP is 3389, HTTPS traffic is 443. So you can allow only specific service to connect to your machines and with direction you can control whether this rule is evaluated for incoming or outgoing traffic. Also, you can priority, which allows you to define and control the rule evaluation order, giving you full range of control and flexibility as to which traffic will be allowed to go through and which one will be rejected.

## Application Security Groups (ASG) ![logo29](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo29.jpg)

ASG helps with management of our traffic even further.

If we want the internet traffic go only to our web services, then block the traffic from the internet to our logic server. Only our Web applications can connect to the services, handling the business logic. And further this allow the internet traffic going to the database server only allowing the business logic web service to call database servers and block the traffic from web services directly to database.

![pic119](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic119.jpg)

The internet traffic only reaches our Web servers, then web servers will communicate with the business logic servers and then business logic servers communicate with our database.

Right now to achive this using Network Security Groups (NSG) we would need to use static IPs of those machines in each single rule and manage this manually. This of course means that it needs a lot of maintenance but you can solve this challenge by using Application Security Groups (ASG). Grouping your servers by their business purpose and then using those Application Security Groups instead of those static IPs in your network security rules.

![pic120](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic120.jpg)

Key Characteristics:

- Feature that allows grouping of virtual machines located in Azure virtual network.
- Designed to reduce the maintenance effort (assign ASG instead of the explicit IP address)

Summary:

- Network Security Groups - Filtering of incoming and outgoing traffic for virtual network resources.
- Application Security Groups - Logical grouping of virtual network resources for easier maintenance. have a feature that allows us to group our virtual network resources logically and then use those logical groupings inside network security group rules.

###### We can create Network Security Group resource (NSG) or Application Security Groups (ASG)

You can filter network traffic to and from Azure resources in an Azure virtual network with a network security group. A network security group contains security rules that allow or deny inbound network traffic to, or outbound network traffic from, several types of Azure resources. To learn about which Azure resources can be deployed into a virtual network and have network security groups associated to them, see Virtual network integration for Azure services. For each rule, you can specify source and destination, port, and protocol

Also, we can assign Network Security Group to Subnet to secure and filter the traffic.
