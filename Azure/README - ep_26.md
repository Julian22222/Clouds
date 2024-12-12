# Azure Security Center

What is Security Center and how does this service help us protect our Azure resources?

![pic140](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic140.jpg)

In Azure Security center is responsible for continuously scanning your Azure services, whether those are Platform as a Service or Infrastructure as a Service services. Security Center continuously scans those services and helps you protect your Azure environment. Additionally Security Center provides you with recommendations, so that you administrators and developers can act immediately and protect their environments on their on their own.

One cool feature of security center is that while it protects Azure services you can also install agents on your On-Premise Virtual Machines to extend the functionality of Security Center to protect your hybrid environments. It reminds Azure Advisor with similar functionality.
![pic141](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic141.jpg)

We talked about how Azure Advisor scans your environments and provide you with a lot of recommendations including security recommendations. It is worth noting that those security recommendations are actually provided by Security Center itself.

![pic142](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic142.jpg)

So you can review your recommendations directly in Security Center or you can act and review them in Azure Advisor.

## How to use Security Center

- Go to Azure Portal
- type Security
- on the left menu panel click --> Security Center (Here you can see all recommendations that you need to apply, and you can see how important are these recommendations --> the most impactful recommendations will be always be at the top)
  Using left side menu we can see, adjust many things
  ![pic143](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic143.jpg)

- Here you can see adjust your security levels
- Identity Secure score <-- it is overall status of your environment, it gives you virtual points how secure your environment is.
- Here you can check risky users, who tried to login to your applications and how many times, you can block those users IP addresses from here
- Here you can check many more things regarding security

Key Characteristics:

- Azure Security Center is our Centralized/ Unified infrastructure and platform security management service
- It is natively embeded in Azure services
- It is integrated with Azure Advisor (so you can have this unified experience to see recommendations for your entire Azure environment including security)
- There are 2 tiers available for Security Center:
  - Free tier (also called --> Azure Defender OFF, or disabled Azure Defender) - included in all Azure services, provides continuous assessments, security score, and actionable security recommendations
  - Paid tier (also called --> Azure Defender ON ) -it gives additional capabilities such as --> hybrid security,threat protection alerts, vulnerability scaning, just in time (JIT) VM access, etc. <--If security for your environment is very important
    Pricing for Paid tier - is pretty flexible because you pay per resource that you enable so pick the resources that you want to protect with Azure Security Center and only pay for those.
