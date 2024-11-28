# Networking Services | Virtual Network, VPN Gateway, Content Delivery Networks (CDN), Load Balancer, Application Gateway (App GW)

We will overview all these Services below

## Azure Networking Services

This is category of services with capability to:

- Connect cloud and on-premise resources
- Protect & monitor services
- Help with application delivery

In general this is the category of services that allows customers to connect their On-Premise and Cloud resources but also help with protection and monitoring of the networking for those services. As well as helping customers with application delivery.

First service that we will learn is -->

## Azure Virtual Network ![logo7](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo7.jpg)

![pic51](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic51.jpg)

Imagine you have 2 resources in Azure, let's say 2 virtual machines, because virtual machines are representation of the physical hardware in the cloud. They also need to be placed into representation of the physical network infrastructure. That representation in Azure is called -> Azure Virtual Network.

Virtual Networks allow their customers to Create, Manage, Monitor and Secure connectivity between Azure resources but also between Azure resources and their On-Premise environments.

Virtual Networks can be segmented into smaller pieces called --> Subnets.
There are 2 main purposes for having subnets:

- To allow customers to manage their IP address allocation in a more efficient manner
- To group related resources together

These 2 purposes allow you to apply filters and security rules across multiple resources within the same Subnet. For example by grouping all the resources hosting your web applications and only allowing web traffic to go to that Subnet.

As a customer you have a freedom of how you manage Subnets and Virtual Networks. If you want you can group multiple resources within the same Subnet and it your choice how you want to represent your networking infrastructure in the cloud. There are many reasons why you would want to have multiple Virtual Networks and many technical limitations forcing you to do that. For example Virtual Network can only reside/live within a single region and spawn resources from that specific region. So if you will be building multi-region applications you will end up with multiple Virtual Networks. So if you want to connect multiple Virtual Networks you can either use a feature called --> VNET PEERING.
VNET PEERING allows you to combine/connect Virtual Networks together and allow them to act as one Virtual Network. Or you can use VPN GATEWAY to do so.

There are benefits and drawbacks of using VNET PEERING and VPN GATEWAY. (But it is too advanced topic for AZURE FUNDAMENTALS)

Key Characteristics of Azure Virtual Network:

- Emulation of physical networking infrastructure in the cloud
- It is designed to allow customers for isolation and segmentation of their network to enable communication, filtering and routing between Azure and On-Premise resources.
- Virtual Networks are scoped to a single region, so in multi-region architecture you will have multiple Virtual Networks, which you can connect to each other using either VNet Peering or VPN Gateway (VNet Peering or VPN Gateway allow cross VNet communication)
- When it comes to segmentation part you can achive that using Subnets, segmentation into one or more Subnets
- Subnets allow customers to divide Virtual Networks so that they can better and more effectively manage their IP address allocation but also manage Network filtering for something called -> Network Security Groups(NSG) or Application Security Groups (network filtering via Network Security Groups (NSG) or Application Security Groups (ASG)) <-- will learn about these in future lessons

# Network Security Groups ![logo8](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo8.jpg)

![pic52](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic52.jpg)

Imagine you have 2 Virtual Machines within a single Virtual Network placed in 2 separate Subnets. If you want to control the traffic that comes from internet to that Virtual Machine you can place a Network Security Group (NSG) on that Subnet. Those Security Groups will only allow specific traffic to reach that Virtual Machine. You can also use Network Security Groups to manage the traffic across Subnets. It is really a tool for you to manage your networking in secure and efficient manner.

# How to create Virtual Network in Azure Portal

- Go to Azure Portal
- Create resource --> type Virtual Network
- Fill the form:
  - Subscription
  - Resource group
  - Name
  - Region (Virtual Network is a Single Region Resource)
  - IP Address ![pic53](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic53.jpg) --> where you can allocate address space for your Virtual Network. If you leave it as default, it will allocate 65 536 addresses for you to use. At the bottom you have a default Subnet. Default Subnet ![pic54](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic54.jpg) is a requirement for every Azure Virtual Network. This is a place where you can allocate part of your address space.
  - Add Subnet
  - Security --> here you can enable some additional security features for your Virtual Network -> like Azure Azure firewall, DDoS Protection or BastionHost

##### When you create Virtual Machine (VM), it is created with a Virtual Network default settings

You need to go to VM resource and Open default Virtual Network setting.

Virtual Networks have great feature that allows to see Diagram of your connection Infrastructure.
Open Virtual Network default service and Put in search bar --> Diagram. Azure will draw a Diagram for you. ![pic55](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic55.jpg). It will represent your current Networking Infrastructure for this specifc Virtual Network. From the PICTURE we have--> az-900-vm-vnet Virtual Network on the top with 1 Subnet--> called default (located lower on the picture 55). And then there is 1 Network Interface (called amdemo-vm119, which located lower on the picture) that is connected directly to the Subnet which is used by a Virtual Machine which is called --> amdemo-vm (located on the left bottom line on picture 55). There is also a public IP connected to this Networking Interface allowing you to connect to this Virtual Machine from the Public Internet --> which is called amdemo-vm-ip (located on the right bottom line on picture). And the Network Security Group (NSG)--> which is called amdemo-vm-nsg (located in the center of bottom line). It controls all the traffic that goes to this virtual machine through this Networking Interface.

This Diagram not only allows you very easily to see how your networking is organized within this Virtual Network, but also allows you to quickly find related resources. For instance if you want to manage Security rules for this Virtual Machine you can simply click on the Network Security Group (NSG). And all those components that you have seen on the Diagram are used to manage everything related to Networking for this Virtual Machine.

# Virtual Network Gateway (also called --> VPN Gateway) ![logo9](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo9.jpg)

![pic56](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic56.jpg)

VPN Gateway allows you to connect to your On-Premise environments so you can enable your Virtual Network to talk to the network within your On-Premise environments. This communication is done over the Public Internet but it is entirely encrypted. Additionally VPN Gateway can be also used to connect Virtual Networks to each other but it is a less common case.

Summary:
Use VPN Gateway whenever you need to connect On-premise environments with Azure over the public internet. or if you need to implement cross-regional communications of Azure Virtual Networks. It is your decision to decide whenever you want to use VNet peering or VPN Gateway. But there will be few details that you will need to read about before deciding which one to use. Because each option is designed for specific use case.

Azure VPN Gateway Key Characteristics:

- On-Premises to Azure traffic over the public internet
- Cross-regional communication of Azure Virtual Networks
  - VNet peering Vs VPN Gateway should be chosen based on the organization needs

# Azure Load Balancer ![logo10](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo10.jpg)

![pic57](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic57.jpg)

Load Balancing simply means distribution of the traffic across multiple resorces. If you have 2 Virtual Machines you can create Load Balancer in front and evenly distribute the traffic across those 2 Virtual Machines. And there are many reasons to do that. One of the reason is scalability because by adding additional instances, scaling out. You can scale to accommodate much larger workloads versus scaling up, where you simply add more power to the machine. And second reason is high availability. So if those Virtual Machines would be a premium SSD Virtual by defaut from Microsoft you will get 99.9% of SLA.That means each Virtual Machine is guaranteed to run for 99.9% of the time. But if you put those Virtual Machines into separate Availability Zones and put that in front of the Load Balancer then Microsoft guarantees you 99.99% of SLA. In which case you increase SLI and availability for your application by 10 times. Because Load Balancer automatically checks the health of the application components that it is connected to. So if one of the Virtual Machines will stop working it will automatically redirect traffic to the second Virtual Machine and the chance for both of them to stop running is significantly lower than with one Virtual Machine.

![pic58](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic58.jpg) When you build larger solutions you will also separate your application components into tiers. For instance by separating all the components that are handling Web traffic put into --> WEB TIER. And possibly second tier handling all the Data management for the application having its own Load Balancer to manage internal traffic --> put into DATA TIER. In this case you will have 2 Load Balancers. One Load Balancer with Public IP allowing for public internet traffic to come in, that is why this Load Balancer will be called --> Public Load Balancer. And another Load Balancer without a public IP, which has only private IP allowing only private connectivity between WEB TIER and DATA TIER. This one will be called Internal Load Balancer.

Summary:
Azure Load Balancer allows for even traffic distribution across Azure components and it supports both inbound and outbound scenarios. So both incomming and outgoing traffic. It is used by customers to provide highly available but highly scalable applications. it supports TCP (transmission control protocol) and UDP (user datagram protocol) applications. And supports both internal and external traffic with Public Load Balancer and Internal Load Balancer.

But Azure Load Balancer is not the only traffic distribution service in Azure, next one is --> Application Gateway.

Azure Load Balancer Key Characteristics:

- Even traffic distribution
- Suports both inbound and outbound scenarios
- High-availability and scalability scenarios
- Both TCP (transmission control protocol) and UDP (user datagram protocol) applications
- External and Internal traffic

# Application Gateway ![logo11](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo11.jpg)

![pic59](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic59.jpg)

If we are talking about traffic distribution for resources. If that traffic is a Web traffic so --> HTTP traffic. You usually use --> App Gateway instead of Load Balancer. This is because Application Gateway is still traffic distribution service but it is designed to support Web traffic, it has more feature that allow customers to better manage their Web traffic.

Services like App Services can also be used, so Application Gateway allow you to redirect traffic to any Public IP or Address. You are not limited with Virtual Machines when building scalable distributed applications.

Taking the same scenario from Load Balancer --> In case of building Multi-Tier application you will replace that Public Load Balancer with Application Gateway. ![pic60](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic60.jpg)

Summary:
Application Gateway is you Web traffic Load Balancer in Azure with some features like Web Application firewall allowing you to scan for all the incomming traffic, redirection capabilities, session affinity - when you want to be sure that your users are always directed to the same servers, URL Routing or SSL termination which allows customers to decrypt the traffic on the Application Gateway and send unencrypted version to the Back-End services to reduce the processing power required to decrypt every single request going to the Back-End increasing even more the scalability of your solution.

For Fundamentals you don't need to know all the features of Application Gateway just rememeber --> It is a Load Balancer that is designed to help you with distribution of Web-based traffic.

Azure Application Gateway Key Characteristics:

- Web traffic load balancer
- Web application firewall
- Redirection
- Session affinity
- URL Routing
- SSL termination

# Content Delivery Network (CDN) ![logo12](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo12.jpg)

CDN is one of those Networking services that helps customers to build their applications.
![pic61](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic61.jpg) So let's take a Web application as an example, every Web application has some static content --> like JavaScript files, stylesheets, static pages or images. Normally if developers don't know about the existence of services like Content Delivery Network what they will do is bundle this application and put it into app service and host that app service in one of the Azure Regions around the world. For instance in West US so when a user from Alaska tries to connect to our Web application, his request will have to go through 1 600 miles to get this page and all of the content. So if our page has 50 elements on it that user has to make 50 requests. 50 separate requests with each having hundred milliseconds delay. This might not be an issue yet but if our users will start connecting from different continents. In this case the distance they need to cover is much greater. So the latency for every single request they make will be much greater when comparing to users connecting from Alaska. To help that scenario you ask your developers to upload all the static content into Content Delivery Network. Allowing CDN Service to distribute that content all around the world. So the users will connect to the closest location with their content available, reducing the latency but also the workload require by your Front-End services. ![pic62](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic62.jpg)

Summary:
Azure CDN allows for delivery of Web content to users to minimize the latency for Web applications so that you can build more scalable web applications and minimize the workload required by your Front-End services. And all that content is spread across multiple POP (point of presence) locations. Microsoft has over 120 locations available worldwide. As you can imagine this is more than Azure regions available. That means there might be points of presence closer to you that there are to the closest Azure region.

CDN Key Characteristics:

- Deliver web content to users
- Minimize latency
- POP (point of presence) locations

# Azure Networking Services Summary

- Azure VirtualNetwork - service that allow us Emulate/represent our physical networking in the cloud and allow us to group, filter and segment the network and all the related resources
- Azure VPN Gateway - service that allows us to connect our On-Premise networks with the Cloud Network and Virtual Networks with each other (remember about VNet Peering). It allow them to communicate to each other.

Two Load Balancing solutions:

- Azure Load Balancer - Even traffic distribution for non-HTTP (non-web) traffic across multiple services. It is designed for non-web traffic
- Azure Application Gateway - If our traffic web based, we can distribute the traffic for HTTP (web). Because it has additional feature for filtering and security of web-based traffic

- Azure Content Delivery Network (CDN) - Service that distributes and caches the content across multiple POP locations around the world to offload our Front-End services but also reduce latency required to deliver the content to our users. Which helps with scalability of our applications but also gives us better user experience.
