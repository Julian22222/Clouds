# Azure Cost Management Service ![logo27](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo27.jpg)

Dring our Azure finances journey we have mentioned how the cost of our Azure Environment is based on the usage. That means if we need more services, we scale them out and start paying more. When we don't need them, we scale them down and immediately see the cost reduction. And each of those services is tracked separately so you really pay only for what you use depending on the pricing Tier of the services that you configured.

Each service additionally has multiple metrics that are being tracked in order to ensure that the billing is calculated propertly.

![pic242](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic242.jpg)

And the purpose of Azure Cost Management is to grab all of that data and present it to you in easy to ingest format. In this case a very small self-service reporting capability tool within Azure.

In order to access Cost Management service - you siply search for -> cost. And you will Cost Management and billing.

This is the place where you can start your navigation. In here you will see all your subscriptions, invoices, payment methods and bills associated with each one of your Subscriptions. And if you want to review the cost information of any particular subscription - simply select it.

In Cost Management and Billing service, On the left hand side- you can find Cost analysis, Cost alerts, Budgets, Advisor recommendations.

You can hit Cost analysis and you can reviewing your current spendings, it showing high level overview of the cost associated with your Azure Subscription during the current billing period. Here you can change cost review dates - monthly, annually, etc.

Budgets allow you to track the spending on your Azure Services. And get notified when you are nearing the budget limit. You can Add new budget (see pic below).

![pic243](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic243.jpg)

And then fill the form - Provide Budget name, reset period for this budget(monthly budgets, quarter, year, etc.), you can go by a billing period or by a calendar month, choosing specific dates when to start and when to finish budget. And then you add budget amount. And then you will see the current set budget across multiple months in your Azure subscription and estimation of the future usage. If you happy with your budget you press Next button. Then you can set up alerts. For example: if my actual usage will be at 50% of my budget i want to do something (you can set up- to send an email,etc)

Cost Management is not only its self-service reporting capabilities. But has the ability to review those costs at the Resource Group and the service level. What does it mean? For example: If we navigate to our Resource Groups and let's say I'm an owner of a Resource Group called - az-900-vm. If I will be granted permissions to this Resource Group, on the left side menu bar I can find -Cost Management section of Azure Cost Management Service. As a Resource Group owner I can select Cost Analysis, and the Scope will be narrowed down to only view the cost associated with this Resource Group. (see pic below)

![pic244](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic244.jpg)

Therefore I can review the cost of my Azure Resources within this Resource Group.

Resource Groups are a logical containers used to organize your resources by a life cycle, typically by an application. This way application owners and development teams can review the cost of their Azure Services and act and optimize their services to be cost effective as possible.

If you give someone an access to the Resource Group then they will be able to review the cost as well.

# Summary:

- Azure Cost Management is a centralized service for reporting usage and billing of Azure environment.
- And primarily it allows for self-service cost exploration in your Azure environment. This allows you to decentralize responsibilities when it comes to the cost of Azure services and allow application teams for effective management of their Azure environments without need of any special privilages.
- With Budgets and alerts you can track the usage and get notified if you are nearing your monthly estimated cost for your Azure environment.

One thing to note here is that budgets are not a hard limit, so you can't stop Azure services when budgets are reached. Although you can use budgets to do some automation so if you are nearing the budget you can execute some scripts that maybe will shut down your machines.

- Additionally Azure Cost Management is integrated with Azure advisor. So you will see cost recommendation associated with your Azure Resources.
- And lastly, if you want some advanced reporting capabilities Azure Cost Management allows you to automatically export billing information into a CSV on Azure Blob Storage. so you can connect with any kind of reporting tool like - Power BI and perform some advanced cost analysis.

# Minimizing costs (overview from last episodes)

1. Use Azure Pricing Calculator to find the low cost regions for your Azure environment but remember that the choice of region is not based on the price alone.

- Remember to pick region that also has a good latency, to where your customers and your company is.
- Additionally choose a Region that has all require services available.
- Lastly, also consider Data sovereignty/comliance requirements of the applications that you will be building.

2. Check if you can use Azure Hybrid benefit and reuse some existing licenses(Windows license), especially if you are moving from ON-Premises environments. If you have some very stable workloads consider reserving some of the services within Azure with Azure Reservations.
3. Use Azure Cost Management to monitor, set up budgets, alerts and even use recommendations to make sure that you are using your Azure platform effectively.
4. Understand the lifecycle of your Azure environments. If you see that the development environment doesn't have to run 24h every day, maybe it is good to automate and shut it down every day and let developers turn those machines on when they need them.
5. Use autoscaling features of Azure platform to your advantage. Only scale and create bigger services when needed and scaale down when they are not needed.
6. Use Azure Monitor to find and scale down underutilized resources. Azure allows you to scale down and scale up at any time so you don't lose anything, you just save some money.
7. Use tags & policies for effective governance. Use tags for effective resource management and identifying cost owners. Also, use Azure policy which allows you to effectively manage your Azure environment. For example: a good policy for your environment would be- forbid people from creating expensive resources on their Dev Test environments.
