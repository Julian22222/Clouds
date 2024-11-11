# Networking Services | Virtual Network, VPN Gateway, Content Delivery Networks (CDN), Load Balancer, Application Gateway (App GW)

## Azure Networking Services

This is category of services with capability to:

- Connect cloud and on-premise resources
- Protect & monitor services
- Help with application delivery

In general this is the category of services that allows customers to connect their On-Premise and Cloud resources but also help with protection and monitoring of the networking for those services. As well as helping customers with application delivery.

First service that we will learn is -->

## Azure Virtual Network (pic 51)

Imagine you have 2 resources in Azure, let's say 2 virtual machines, because virtual machines are representation of the physical hardware in the cloud. They also need to be placed into representation of the physical network infrastructure. That representation in Azure is called -> Azure Virtual Network.

Virtual Networks allow their customers to Create, Manage, Monitor and Secure connectivity between Azure resources but also between Azure resources and their On-Premise environments.

Virtual Networks can be segmented into smaller pieces called --> Subnets.
There are 2 main purposes for having subnets:

- To allow customers to manage their IP address allocation in a more efficient manner
- To group related resources together,
  These 2 purposes allow you to apply filters and security rules across multiple resources within the same Subnet. For example by grouping all the resources hosting your web applications and only allowing web traffic to go to that Subnet.

As a customer you have a freedom of how you manage Subnets and Virtual Networks. If you want you can group multiple resources within the same Subnet and it your choice how you want to represent your networking infrastructure in the cloud. There are many reasons why you would want to have multiple Virtual Networks and many technical limitations forcing you to do that. For example Virtual Network can only reside within a single region and spawn resources from that specific region. So if you will be building multi-region applications you will end up with multiple Virtual Networks. So if you want to connect multiple Virtual Networks you can either use a feature called --> VNET PEERING. VNET PEERING allows you to combine Virtual Networks together and allow them to act as one Virtual Network. Or you can use VPN GATEWAY to do so.

There are benefits and drawbacks of using VNET PEERING and VPN GATEWAY.

Key Characteristics of Azure Virtual Network:

- Emulation of physical networking infrastructure in the cloud
- It is designed to allow customers for isolation and segmentation of their network to enable communication, filtering and routing between Azure and On-Premise resources.
- Virtual Networks are scoped to a single region, so in multi-region architecture you will have multiple Virtual Networks, which you can connect to each other using either VNet Peering or VPN Gateway (VNet Peering or VPN Gateway allow cross VNet communication)
- When it comes to segmentation part you can achive that using Subnets, segmentation into one or more Subnets
- Subnets allow customers to divide Virtual Networks so that they can better and more effectively manage their IP address allocation but also manage Network filtering for something called -> Network Security Groups or Application Security Groups (network filtering via Network Security Groups (NSG) or Application Security Groups (ASG))

# Network Security Groups (pic 52)

Imagine you have 2 Virtual Machines within a single Virtual Network placed in 2 separate Subnets. If you want to control the traffic that comes from internet to that Virtual Machine you can place a Network Security Group (NSG) on that Subnet and those Security Groups will only allow specific traffic to reach that Virtual Machine. You can also use Network Security Groups to manage the traffic across Subnets. It is really a tool for you to manage your networking in secure and efficient manner
