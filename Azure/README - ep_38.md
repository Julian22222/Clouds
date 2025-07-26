# SLA and Composite SLA in Azure

Azure Service Level Agreement (SLA) is a formal agreement between a service provider and a customer. In case of Azure this is between Microsoft and our company.

SLA is a promise of service's availability(uptime & connectivity).

- SLA in the context of Azure simply means a promise that Microsoft makes to us when it comes to the service availability. This is both, uptime and the connectivity of that particular service.
- Availability is a measure of time that this service remains operational.

If you search the web for Service Level Agrements(SLA) in Azure this page should come up first [-->This Page<--](https://azure.microsoft.com/en-us/support/legal/sla/)

This page contains all the Service Level Agreements (SLA) for Azure Services. So on this page you can search for any particular service that you will use in your application.

For example: type in -> SQL ,to find Azure SQL Database Service. When you select that service, another page will be opened, detailing all the information about SLA of our SQL Database. On this page you can read that if you use Azure SQL Database in a Business Critical or a Premium tiers configured with a Zone Redundant Deployments. Microsoft promises you 99.995% of availability but if you use some lower tiers like General Purpose, Standard or Basic tiers or simply Business Critical and Premium tiers without those Zone Redundant Deployments the availability goes down and the promise is 99.99%.

Therefore this page will detail out what kind of configurations can you make for your services that will impact your SLA. When you open this page and you start reviewing the details, always scroll down to the section called - SLA details. This section describes in a great detail, how the SLQ is calculated for Azure SQL Database and what kind of factors impact that SLA. You can also find here a lot of useful information and one of the most important one is Service Credit Returns. Let me explain, if we are using Azure SQL Database in a General Purpose tier Microsoft promises 99.99% availability and if Microsoft will not meet this promise, if the service uptime, the availability will be lower than this you will get 10% Service Credit.(see pic below)

![pic245](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic245.jpg)

So what exactly this Service Credit is? It is a discount from your monthly bill for youe Azure SQL Database. And if availability will go even lower, below 99% you will get 25% discount from your monthly bill and if it will go even further, below 95% you will get 100% discount for your Azure SQL.

So you can review all of those details and understand all of the configurations that will impact this and make the right choice for your applications.

Therefore, SLA is simply a promise of availability calculated per month.

- every Service in Azure has its own SLA definition, because every single service can have different configuration and different availability associated with it.
- The availability for most of Azure Service range from 99% - 99.999%
- Most of Azure Free Services tiers typically don't have an SLA. If you are using Azure and you are purchasing Free services or Shared Services - they don't have SLA. This also goes when you are using Services that are currently in preview, they do not offer SLA either.
- Broken SLA means Service Credit Return a discount. And precentages simply describe monthly downtime for your services.

![pic246](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic246.jpg)

99% is not so good - with 7 hours 18 minutes and 17 seconds downtime per month. This is the maximum amount of downtime that Microsoft says there might be. Typically i used services with NO SLA or 99% of SLA and I had no issues at all. This is just about the promise of something to put in the legal documents. But this is how it is, so if you are building highly available and critical applications you typically will try to reach those higher SLA's.

For example: 99.99% is already 4 minutes of unavailability and 99.999% is 26 seconds in entire month.

My recommendation for you is, when you build applications in Azure go to SLA documentation for those services that you need and check the SLA associated with the configuration that you are planning to use, understand if this availability is enough for you in order to meet your business requirements. You might also want to consult with your business users if this good enough.

Composite SLA - is a combined SLA of all components in your application. It is a combined SLA of all of your application components. Therefore, if you use multiple Azure Services you need to combine their SLA to calculate the SLA for your entire application.

![pic247](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic247.jpg)

Example (see pic above): Let's start with a very simple application, let's say we have users who reach our Web application. We don't have any other components, this is a simple static Web application. We host this on Azure App Service. If we go to the documentation for Azure App Service we will find that the SLA for a single app service is 99.95% so what does this mean for our composite SLA? It is quite simple because since we have only one component, the SLA for our entire application is the same as SLA for this particular service. So in our case availability for our entire application is 99.95%. That means the unavailability is simply availability substracted from 100%. In our case this gives us 0.05% unavailability. If you would like to understand how much time is this in a mounth you simply multiply the average amount of hours in a month which is 730 x 60 minutes x unavailability in the decimal points. 730 x 60 =43800 minutes x 0.0005 = 21 minutes 54 seconds. If you accepting that potentially tis service might not work for 21.54 minutes a month or you might have connectivity issues.

![pic248](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic248.jpg)

Let's move to a little bit more complex example (see pic above). Let's say we have again a Web application but this time we also have a database. For the purpose of this example let's say the SQL has 99.95% SLA and the same has Web application. How do we calculate SLA? A composite SLA for 2 components that need to work together. In our example when users send a request to a Web app that request needs to be forwarded to SQL Database to pick up some data and return it to our users. SO both of those components have to be available in order for our entire application to be considered operational. When you have this kind of logical end between 2 services. The way you calculate the composite SLA is simply multiplying their availabilities. So lets calculate that, in our case this is availability of Web application multiply by the availability of our SQL. So it is 99.95 x 99.95, this will give us the final result of 99.9% availability. That is our composite SLA, if you notice the number you will immediately see that is little bit lower than the availability of our components because now our application is dependant on both components working. Therefore, we are lowering the SLA that we can provide for our application.

# SLA Summary

Factors that will impact SLA

Lower your SLA - negative imapct:

- Adding more services
- use Free / Preview services (because they don't offer any SLA)

Increase your SLQ - positive impact:

![pic249](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic249.jpg)

In this scenario our application looks a little bit different, we have users who will reach either of the Web applications hidden behind load balancer. This is a typical scenario for very scalable applications. You put Load balancer in front and then you have redundant Web applications behind the scenes. So if either of them will go down, the entire application will still be working (se pic above).

Let me show you how to calculate the composite SLA in this case. First of all always grab the SLA information from the documentation. SInce those application services are exactly the same, they have the same SLA. Important part is that when user sends a request this request needs to reach the first or the second Web application. Therefore if you would put a logical statement between those - it is an "OR", because either of those Web applications have to work. Web application 1 has to work or Web application 2 has to work in order for entire application to remain operational. When you have a logical "OR" between 2 services, the availability is calculated a little differently. It is simply multiplication of each service unavailability and then subtracting that from 100%. Let's calculate this for our both Web applications. This means the availability of both of those Web applications is 100% minus unavailability of Web application 1 multiplied by unavailability of Web application 2.(see pic above). So let's give them the values, move those to decimals and the result is great 99.9999%. Our SLA result become much better by introducing another Web application service. Remember we still have a Load Balancer and that Load Balancer also has its own SLA. SO how do we calculate this? We use first scenarion, both of those components have to work so therefore there is a logical "AND" between them. So we are back to the first formula to calculate the full availability for our application we multiply the availability of our Load Balancer by the availability of both Web applications which we calculated in the previous step giving us the final result of 99.98%.

![pic250](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic250.jpg)

To increase your SLA, you can add redundancy to your services by multiplying the amount of services and hiding them behind Load Balancers. And change Service configuration for example, very often adding those Zone Redundant deployments, Availability zones. You can read all about this in the documentation.

Remember in Azure there is a lot of services that might serve the same purpose. For example, Azure CosmosDB and Azure Table Storage are both - no SQL Databases. So you need to decide which is better for your use case. Which one has better SLA or better pricing or both.

Also, remember about those different service tiers - Standard, Premium, Business Critical etc. that we mentioned previously. Those also impact the SLA.

Lower tiers typically have lower SLA, higher tiers have higher SLA.

# Key Characteristics

- SLA is a formal agreement between Microsoft & the customer.
- That agreement talks about the availability of these services. Calculated as a percentage of service availability(uptime & connectivity)(it is a promise of that availability)
- Breaking the SLA (if Microsoft will not keep that promise you will get a discount for a final monthly bill for this service) provides a discount from the final monthly bill (this is called Service Credit).
- Higher tier services ofefr better SLAs, better SKU.
- Free services typically have no SLA(0% SLA). Service configuration also affects the SLA.
- Preview services have no SLA

Recommendation is don't use either Free or Preview services for your production workloads.

- Composite SLA is a combined SLA of all application components. If you are using Azure services or general or any public cloud services you should calculate the composite SLA for your entire application.
