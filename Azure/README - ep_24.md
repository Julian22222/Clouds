# Azure DDoS Protection | Distributed Denial of Service

What is DoS?

DoS - Denial of Service, it is a type of cyber-attack where someone attacks your server that is exposed to a public internet with an intent to disrupt that service from working properly. This of course might cause temporary or indefinite disruption of your service so users will not be able to use your services.

There are many types of denial service attacks but most of them want to achieve the same thing -> stop your service from working.

![pic132](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic132.jpg)

In general denial of service (DoS) attacks are pretty easy to prevent because you can just block the IP from which the traffic is originating. (when attackers using one server)

This is why most of the attackers instead of using one server will employ multiple servers to attack your Web Services at the same time. This type of attack is called - distributed denial of service (DDoS).

Preventing DDoS attacks is pretty tricky because not only you need to be able to identify which servers are attacking you but also separate them from legitimate/legal users trying to reach your servers. And only filter the attacker out but still allow your users to connect. This is where Azure DDoS Protection comes in.

# Azure DDoS Protection ![logo32](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo32.jpg)

So if this scenario happened in Azure and our Web Server was hosted on one of Azure services, let's say to Azure App Service. Then in front of Azure App Service there would be a DDoS protection service which would filter the malicious traffic out and let the legitimate/legal users in.

![pic133](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic133.jpg)

One of the best things about DDoS Protection is that the basic plan for DDoS Protection comes with all of the Azure services by default and you don't even pay anything extra. It is already included in the price of that service but if you need more protection this service comes with a standard plan which allows you to protect your application from more sophisticated attacks

# How to use DDoS

- Go to Azure Portal
- Create DDoS protection plan resource (this is the Standard plan for azure DDoS Protection - if additional protection needed)
- then fill the Form:

  - Name
  - Subscription
  - Resource Group
  - Location

- Then go to just created DDoS protection plan
  ![pic134](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic134.jpg)
- Click Protected resources section (step 1 on the picture)
- Then Click --> + Add(step 2 on the picture) , to add resources to that protection plan.
- Then in this panel you need to choose the Resource Group and then choose Virtual Network within that Resource Group that will be protected. Then hit --> Add button

Now all the Resources within this Virtual Network will be protected.

Key Characteristics:

- DDoS protection service in Azure
- Designed to:
  - Detect malicious traffic comming from attackers and block it while allowing legitimate users to connect to our services
  - Prevent customers from additional costs for auto-scaling environments

If attacker will try to attack your service with hundreds of servers all that traffic might cause auto-scaling features to create new servers in your application and you will pay more, as I mentioned previously DDoS Protection has 2 tiers.

- Two tiers:
  - Basic - automatically enabled for all Azure services. If you use any Azure services which are exposed to a public internet and could be targeted by DDoS attack and those are automatically protected by the basic tier of Azure DDoS protection.
  - Standard - additional mitigation & monitoring capabilities for all the resources which are located within Azure Virtual Networks.
    Standard tier uses machine learning to analyze traffic patterns for better accuracy. Standard tier is designed for more high-value applications of yours
