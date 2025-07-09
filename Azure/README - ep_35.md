# Cost Affecting Factors

Here we will learn about the key factors that affect the cost of your Azure services.

Factors that can affect costs:

- resource types,
- services,
- locations,
- ingress and egress traffic (networking traffic)

These are not the only cost affecting factors. But these 4 will be the key elements that will drive the cost of your Azure environment.

# Resource Types

Is simply the answer to the question - What kind of service do we use ?

![logo1](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo1.jpg) or ![logo2](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo2.jpg)

So when you buy a virtual machine in Azure, there are certain metrics that tracks the usage of your virtual machine resource.

For example:

- you specify how much CPU (how much processor do you want to have, have many Cores)
- how much Memory do you want to have

And those metrics are tracked against the uptime. So this means how long did you have that virtual machine with this kind of configuration.

![logo15](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo15.jpg) And when you buy an SQL Database in Azure, metrics are very similar there. So you pay for CPU, Memory, additionally you pay for Storage and then it's tracked against the uptime. So how much Storage, how much Memory and CPU did you use for how long.

![logo6](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo6.jpg) There are other services with much more flexible pricing models like - Azure Functions. It is serverless service. It is a service that allows to execute small pieces of code and only pay for that. So you pay for how many times did you execute your pieces of code and how much memory did those executions consume.

![logo13](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo13.jpg) But if you bought Azure Storage account for instance then the price consists of how much storage are you consuming, what is the access tier for this data and how many operations are you doing on the storage account.

![logo22](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo22.jpg) In case of Azure Logic Apps the pricing is even simpler. How many actions did you execute.

One thing to note is that Resources that are only organizational resources and logical resources - like Resource Group ![logo28](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo28.jpg) are Free, because they are not a servers, they are just logical objects in Azure. Those do not have any kind of cost associated.

Remember, Every Resource Type have a small metric that is tracking its usage and this will be your key factor that will affect the final cost of your Azure environment. Therefore you should always spend time to think, what kind of use case do you have. What kind of application are you building and which are the right Resource Types for you.

Also, Azure has Pricing Calculator which allows you to estimate the cost of your Azure environment before you purchase services.

[--> Calculator <--](https://azure.microsoft.com/en-gb/pricing/calculator/?cdn=disableSSSSSS)

![pic231](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic231.jpg)

In this calculator you can add products just like you would be purchasing something from Azure Portal. When you do that you can estimate how much potentially this service will consume before you even make a purchase.

For example: if you select Azure Storage it will be added to your --> Estimate Section (in the bottom of the page, see pic below).

![pic232](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic232.jpg)

So you can scroll down and adjust this resource (Region, Tier, Redundancy-LRS(local redundant storage), how much CPU, memory. Storage you need etc.) for entire month, and Azure calculator will immediately tell us that for 1000GD for this configuration we will pay - 21.84 a month. If you scroll further down you will find other factors that affect the cost of your Azure Storage Account. For instance, the operations that we have talked about previously and all of those metrics combined will drive the final cost of your storage account. (see pic below)

![pic233](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic233.jpg)

# Services

Be aware that different service offerings of Azure also have different price of services associated with them. So when talking about services, we are really talking - What kind of Azure offer do you have? How did you purchase your Azure.

Answer to the question - What is our Azure offer type?

![pic234](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic234.jpg)

As a customer you have multiple ways to buy Azure from Microsoft. One of the most common ways is buying this through a:

1. Web Portal, where you can get one of many available Azure offer Types.

- Azure Free - which is great for testing
- Or Pay as you Go Subscription, where you billed monthly for your Azure usage. You can also get some Azure Credits from Microsoft partner network or if you have a visual studio license.

There is plenty different offer types that you can choose from.

2. Besides that you can contact Microsoft representative and buy enterprise agreement. This is agreement between your company and Microsoft. This is a contact that you sign.

3. Lastly you can buy Azure from a partner of Microsoft, called - Cloud Solution Provider (CSP).

Depending on which Azure offer type do you have, it will affect 2 things - one of them is usage rate, so simply the cost of your Azure Services and the building cycle. But the usage rates are changing because when you are purchasing from an Enterprise Agreement or through CSP you can negotiate the prices and if you negotiate any discounts, this discount will be applied for all the services available in your Azure Subscriptions. This will definitely affect the final cost of your Azure environment.

# Location of the Service

But there is one more very important thing when purchasing Azure services and this is the location of those services. So in which Azure Region are our services currently located.

Answer to the question - Where are our services located?

![pic235](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic235.jpg)

Let's imagine a scenario where you purchase Azure Virtual Machine in West Europe Region. That virtual machine will have 1 virtual Core and 4 GB Ram of memory. If you go to Azure Pricing Calculator you might see that this Virtual Machine will cost you $100 per month. But if you suddenly change region and you will pick exactly same machine with exactly same configuration in North Europe you might see that the price suddenly differs. This is the exact same configuration, exact same resource type on exact same offer. And you will see that across many different regions in Azure, that as soon as you will start picking the same service but in different Regions, price will be different. And true answer is a little bit more complex but we can narrow it down to a simple statement that the cost of running Azure Data Center differs from region to region. So when you picking a Region for your Azure solution, pick the Region that is nearby to your customers so the latency is small. The Region that has all the services available that you want to use and the lowest price for those services

# Bandwidth/Traffic

The last factor that affect the cost of your Azure environment. So how much Data are we moving to Azure and out of Azure.

Answer to the question - How much data do we move in and out of Azure?

![pic236](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic236.jpg)

When you are customer the first thing that tou will do most of the time is migrate to Azure. Therefore in your company from your servers you will want to upload data to Azure data center. And this upload is called - INGRESS. or otherwise is called - INBOUND TRAFFIC. This is because this is in traffic from the perspective of Azure. This is incoming data to Azure Data Center.

If you are downloading data from Azure then we are talking about - EGRESS or OUTBOUND TRAFFIC. Because this is the traffic that is going out of Azure.

So most of the time in most scenarios the traffic that is going to Azure is Free, so the INBOUND TRAFFIC is free in most cases. But the OUTBOUND TRAFFIC is not.

One of the things that I advise you to go to Microsoft Pricing Page for BANDWIDTH and read about the scenarios when it comes to - how bandwidth is priced, because there is quite a few of them.

There are different pricing scenarios for moving data across Data Centers when moving across different regions in different markets or different continents.

# Key Characteristics

If you are estimating the base cost of your Azure environment the key factors that you should look at are:

Base Cost

- Resource Types - All Azure services (resources) have resource-specific pricing models. typically consisting of one or more metrics.
- Services - Azure specific offers (Enterprice, Web Direct, CSP, etc.) have different cost and billing components like prepaids, billing cycles, discounts, etc.
- Location - running Azure services vary between Azure Regions
- Bandwidth - network traffic when uploading (inbound/ingress) data to Azure or downloading (outbound/egress) from Azure.

If you deploying globally, scalable applications or infrastructure and will be moving a lot of data, bendwidth is something we should look at. Because moving the traffic out of Azure data centers typically will have some charges applied.

2 more cost affecting factors are directly related to savings. So how to save some on Azure environment. We will explore those in next episode

- Savings:
  - Reserved Instances
  - Hybrid Benefits

Saving are applicable in specific scenarios.
