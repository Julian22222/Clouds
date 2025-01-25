# User-defined Routes (UDR) with Route Tables

Here we will learn how to route our traffic and control the flow of the traffic within Azure Networks

Routing - It is a process of finding / selecting a path for a traffic in one or across multiple networks.
Routing - It is a process of finding / selecting a path between 2 or more servers across 1 or multiple networks.

![pic121](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic121.jpg)

In Azure Routing is set up by default, that means if we have 2 servers -> one a Web server and second an API server. Both located in the same Virtual Network, in 2 separate Subnets. If you would try to ping or connect from the Web server to the API server, there would be a route setup for that already. Also, if you would like to connect to the internet from the Web server, again the route is already set up, as Azure by deault creates an Internal Routing Table and adds all the default routes in that table. So that machines when provisioned can connect to each other into internet with no issues at all.

But if you want to change that behaviour this is where User-defined Routes come in.

# User-defined Routes

![pic122](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic122.jpg)

Let's say we have a third server - which is called NVA (Network Virtual Applience). NVA is simply a specific optimized Virtual Machine for certain tasks.

In this case NVA is a Virtual Machine Image that was created with a firewall inside. So we can use this Virtual Machine to inspect all of the traffic before it will reach our internal servers. In this case we can create something called a - Route Table. ![logo30](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo30.jpg)

Route Table --> allows us to manage and override the default routes in Azure by creating our own routes. For example by adding 1 route we can affect how Web server connects to API server by redirecting the traffic to the NVA, which will inspect the traffic and forward or deny that traffic to the API server. If you want we can add one more route to affect the traffic going to the internet which will again go throughthe firewall if we want to.

To recreate this scenario in Azure, where we have 1 Virtual Network with 3 Subnets. One Subnet has API server, Another Subnets has NVA server and third Subnet has Web server.

![pic123](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic123.jpg)

We will use Route Tables in Azure to redirect the traffic from Web server to API server through NVA server.

# How to use Route Table

- create Route Table service
- allocate all needed services in one Resoure Group (For example we will have api server, NVA server, NSG, etc. in one Resource Group)
- Go to just creates Route table (It will allow to change the routes from Web server --> through NVA Server to --> API Server)
  Route table panel-->

  ![pic124](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic124.jpg)

- Here we need to go to Subnets(left side menu - 1 on the picture) and press --> + Associate (2 on the picture). Which will associate/bind this with a Subnet where your Virtual Machine is located (3 on the picture). So all the traffic that is going out of the Subnet will be routed according your Route table (will be routed how you will adjust the routing).

That is why you will go to Virtual Network and Select the Virtual Network where your servers are located.

![pic125](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic125.jpg)

- Then Select Subnet(4 on the picture). In this case this is a the Public Subnet. So all the traffic that is going from this Public Subnet will be subject to our Route table. Here we Choose Subnet name in which subnet your Web Server located. Our Starting point for routing, where all the our custom routing will start.
- Then press --> OK (5 on the picture), to save changes.

  ![pic126](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic126.jpg)

- Then we go to Routes (6 on the picture) to add a Route, --> and click + Add
- Then you fill the Route form:

  ![pic127](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic127.jpg)

  - Route name - give any name
  - Address prefix - which is our destination IP address that we want to override the route for. So in our case it will be the API server IP address. (Find IP address you can in Subnets blade)
  - Next hop type - we want to redirect our traffic to the Virtual Appliance (NVA server)
  - Next hop address - IP address for Virtual Appliance (NVA server) (Find IP address of NVA you can by going to NVA created service panel and find it there)

- Then press OK.

Then we need to wait for this to take an effect.

Key Characteristics:

- User-degine routes are away for a customer to create custom user-defined, static routes in Azure so called -> UDRs.
- User-degine routes designed to override the default routing system in Azure or add entirely new routes
- All these overriding is managed throug a resource in Azure called - Route Table.
- Route tables are associated/ binded with zero or more Virtual Network Subnets
  You can have one Route Table and reuse it across multiple subnets.
