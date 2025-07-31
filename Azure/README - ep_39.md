# Service Lifecycle in Azure | Public Preview and General Availability

Service lifecycle in Azure defines a process of how every Azure service is released for public use. Every Azure service has its own lifecycle. The process of building that Azure service follows a typical development path.

![pic251](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic251.jpg)

- It starts with requirement gathering followed by development testing and when the service is ready for wider use it's then released to the public.
- The first release to the public is done by releasing a preview version of the service. At this stage most of the service functionality is ready so customers can use it and test it. This stage is called - Public Preview. Think of it like a beta version for your service. Public Preview is designed to allow customers to experement with the service, provide feedback and then for Microsoft to incorporate that feedback to improve the service before the final release is made.
- When the service is validated it's then released to the public for the econd time, this time as a production-ready service. This stage is known as a General Availability (GA). You will very often hear people say that the service has been GA'ed. When the service is in General Availability (GA) Microsoft will keep improving the service and bringing new features in. Those features might land directly in GA, but very often they will be marked as a Public Preview 2. SO it is entirely possible to use this that has been GA'ed very long time ago. Like this Azure SQL for instance that has still certain features in Public Preview.

For example, this GEO Replication(see picture above). so you always need to be aware if the service that you are using and the features re already available for a general use/for the production use.

![pic252](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic252.jpg)

From the perspective of the general public these 3 stages is all that matters. But Microsoft also has some internal versions of the service before it is released to the Public Preview. One of these stages is called private preview and it is released to a narrower audience. This stage is covered by an NDA and typically only high-profile customers who needed this particular feature. Microsoft employees, MVPS and Regional Directors have access to these. This stage allows to prove the value and test the service before releasing it to a wider audience.

# Public Preview

Key information

We need to note, Public Preview is a beta service so it has certain limitations and key things that you need to remember.

- No SLA. Very often if not always Public Preview services are out of scope for the service level agreements. SO using them for production workloads is not recommended.
- Some services in Preview have no support coverage, are not covered by customer support. Most of the time Microsoft will try to help but sometimes they might not be able to.
- Limited Region availability. When the services are released they are often released to a limited number of Azure Regions. They are then released gradually to more and more Azure Regions.
- Limited functionality. During previous stages certain services and features might have limited functionality. So you need to be aware of that.
- Pricing changes. Public Preview services very often have different or discounted pricing. As the Public Preview stages is also designed to test and understand the best and the most fair pricing strategy for the service.
- Direction changes. In rare scenarios Microsoft might decide that the direction that the service or a particular feature is moving towards is not good and either change this feature or a service completely or even cancel it. Always remember about these.
- Azure Portal Preview releases (https://preview.portal.azure.com)

If you want to provide a feedback about Azure service that is currently in a Public Preview or is currently in a GA you can click -->

![pic253](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic253.jpg)

to send your feedback. Remember yhat your voice counts and Microsoft is reading those activily.

If you want to stay up to date you can visit Azure Updates website available at [--> Here <--](https://azure.microsoft.com/en-us/updates). On this website you can find the latest information about Azure products and features that are currently in Development, in Preview or currently being released to a general availability - Launched (see pic below)

![pic254](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic254.jpg)

You can filter those news by category or update types - using Product dropdown menu (step 1 on the pic above). If you want to see what was recently released to a Production simply check list below (see step2 on the pic above )

If you want tyou can also use RSS feed here -> (step 3 on the picture above) and read all those updates in your favorite RSS reader.

# Public Preview Key Information

One qustion that I get very often is do i use public preview features or services in my production applications. yes I do but only sometimes. It is a tricky decision to make. For me it is a simple question on whether the benefits outweigh the risks and the limitations that come with a public preview service, Sometimes I'm willing to take that risk and use the service for my production application but not very often especially not for the critical business applications.

- No SLA
- Some services have no support coverage
- Limited region availability
- Limited functionality
- Pricing changes
- Direction changes
- Azure Portal Previews (https://preview.portal.azure.com)

# Summary

To summarize the service life cycle remember

- Every service in Azure follows its own service lifecycle, Every service in Azure has its own lifecycle. Every service feature also can follow a separate lifecycle.
- First stage is called - Public preview is a "beta" stage of the service available to general public use - remember that certain features can be in previous stages as well even if the service has been in general availability for a very long time. - This stage is designed for testing, not production solutions
  -Another stage is called - General availability. It is a "production" release of the service. That means the service has all the functionality that Microsoft wanted to have and you can use it for your applications
