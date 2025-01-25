# Azure Advisor ![logo26](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo26.jpg)

In order to talk about Azure advisor let's picture a scenario typically when building solutions in Azure we will have multiple services. Services like SQL databases, Web services or VMs and all of those services have to be set up by someone. Our developers, administrators, operation teams or just external vendors. But the only problem with this approach is that none of us are experts when it comes to all of Azure services. So it is very easy to miss some critical configuration that might impact your application or entire platform and here comes Azure Advisor.

![pic107](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic107.jpg)

Azure Advisor - it is a service that was created to continuously scan those services for all of the improvements according to Microsoft best practices. Because you can imagine if you are just starting with Azure Microsoft might have some good tips for you. That will improve entire application works and how you operate your entire Azure platform and recomendations that you can get are around cost of your Azure resources, their performance, reliablility, security and operational excellence. All of those recomendations are then provided to either admins or developers. You can even setup some alerts to get automatically notified when there are new recommendations.

# How to use Azure Advisor ![logo26](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo26.jpg)

![pic108](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic108.jpg)

There are multiple ways to find Azure Advisor either by:

- using search box at the top of main Azure portal page or
- going to the left side menu to --> Advisor or
- on the left side menu to --> All services and find it in the feature section.

![pic109](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic109.jpg)

When you open Azure Advisor you will be presented with a dashboard showing you all the recomendations for your services in Azure. In here you have all the recommendations for cost, security, reliability, operational excellence and performance.

![pic110](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic110.jpg)

On this picture currently the only one recomendations that You have are around reliability. Click on Reliability tile to open this recommendation and in here you can see that you have 3 recomendations around your Azure resources.
![pic111](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic111.jpg)

You can check their impact (LOW, MEDIUM, HIGH). Then you can check description that is provided for each recomendation. Also, here you can see benefits if you follow the recommendations, and also here you can check how many resources are impacted from each recomendation.

Another great thing about Azure Advisor is that you can act on this recomendation directly from the same panel, you don't have to research how to do that. You just click on the recommendation

![pic111](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic111.jpg)

Then click on Recommended action link and then adjust your resource how it was recommended.
If you want to postpone or you don't want to apply this recommendation you can select recomendation and hit dismiss

![pic112](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic112.jpg)

--> and it will instantly disappear from the recommendations for Azure Advisor.

Key Characteristics:

- Personalized consultant service
- Designed to provide recommendations and best practices for:
  - Cost (to things like SKU sizes for our resources so we can downscale and save some money, idle services that can be deleted, services where we can reserve the instances for longer periods to save a lot of money, etc.)
  - Security (Multi-factor authentication (MFA) settings for our users, vulnerability settings, agent installations, etc.)
  - Reliability, previously this was called High availability but this is now not only about keeping the application up and running but also protecting our data. ( redundancy settings, soft delete on blobs, etc.)
  - Performance (SKU sizes, SDK versions, IO throttling, etc.) In this case should we scale up our aplications in order to get better performance. Shuld we upgrade SDK versions if we are using old ones.
  - Operational Excellence (service health, subscription limits, etc.). For example are there any subscription limits that we are about to hit, are there any service health statuses that we should know about that might impact our application uptime.
- Actionable recommendations. You can apply, postpone or dismiss those recommendations dirrectly from Azure Advisor.
- All of these recommendations is Free.
