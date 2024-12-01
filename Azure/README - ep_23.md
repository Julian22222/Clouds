# Azure Firewall

Firewall is a network security service that allows customers to monitor and control both incoming and outgoing traffic.

There are many types of firewalls in the market from some simple ones which allow you to filter the traffic based on IP and protocol just like Network Security Groups (NSG), or there are more advances ones whicj allow you to filter the traffic based on FQDN (which is the domain of the services) or maybe inspect the body of the request itself to prevent from any kind of unwanted traffic.

# Azure Firewall ![logo31](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo31.jpg)

In episode 22 we had a scenario where we had 3 servers and we used Route table to route the traffic from our Web servers to our Virtual appliance which had a firewall installed.

![pic122](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic122.jpg)

But the problem with this design is that we had to manage all of that infrastructure and firewall configuration from within that Virtual Machine. Instead of this we can employ Azure service which is called Azure Firewall. Azure Firewall allows us to focus on the network configuration rather than management of the infrastructure but also centralization of our network configuration across multiple Subnets and Virtual Networks. And then we can decide based on our rules which traffic should go through and which one should be blocked.

![pic128](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic128.jpg)

# How to use Azure Firewall

We try to connect to marczak.io web site using our server (VM) and the server responds with --> Action: Deny, No rule matched.
We need to give acces to our server to go to this website through Azure Firewall

- Go to Azure Portal
- Create Azure Firewall resource
- Put this Firewall resource together with other resources in one Resource Group (such as: Web serve, Virtual Network, NSG, Firewall)

From the perspective of the Diagram. One web server which is connected to one Virtual Netwrk with Firewall provisioned.
![pic129](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic129.jpg)

On the picture above we have Virtual Network and 2 Subnets. One Subnet with our Server and a Route table which redirects the traffic from the server into the firewall subnet directly to our Firewall.

- Then you need to go to Azure Firewall just created resource.
- Go to Rules section (left menu bar, number 1 on the picture)
- Then go to Application rule collection (number 2 on the picture)
- Then press --> + Add application rule collection (number 3 on the picture)
  ![pic130](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic130.jpg)

Collection it is just a multiple rules combined together.

- Then Fill the application rule collection form:
  ![pic131](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic131.jpg)

  - Name (In our case name is AllowInternet)
  - Priority
  - Action (because we want to enable the access to internet with this rule)

Target FGDNs

- name (give a specific rule in this collection --> in our case Allow-MarczakIO)
- Source type: IP address (address of our Subnet, navigate to your subnet and copy IP address)
- Protocol: Port --> http:80, htpps:443 (put these 2 ports)
- Target FQDNs (morzak.io <-- web site to get acces to from our server)
- and hit Add button and wait for the update of the firewall

We add a new rule which enabled the acces from our server to this morczak.io website through Azure Firewall.

Key Characteristics:

- Azure Firewall is a managed, cloud-based firewall service (PaaS, Firewall as a Service)
- Built-in high availability
- Highy Scalable
- It allows you filter both inbound and outbound traffic by providing you with filtering rules
- It has a support for FQDN (Fully Qualified Domain Name) --> it is just the address name of our website ,example: microsoft.com
- Fully integrated with Azure monitor providing you centralized place for logging and analytics
