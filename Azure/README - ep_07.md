# Azure phisical infrastructure, Data Centers, Geographies, Regions, Region Pairs & Availability Zones

## Data Center

![pic24](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic24.jpg)

Key Characteristics:

- Physical facility
- Hosting for group of networked servers

If you purchase services in Azure whenever this is SQL Database, Web hosting, Virtual machine or one of many services within Azure. All those services run on a physical infrastructure --> on servers. A physical facility that hosts those servers called --> Data Center.

Data Center is used to host a group of network servers. A Data Center has its own:

- Power
- Cooling
- Networking infrastructure

So Data Centers are building blocks of global Azure infrastructure

![pic25](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic25.jpg).

A group of Data Centers that are connected with each other with high throughput internet connectivity are called - Regions. Microsoft has many Regions across the globe of different sizes. Regions can be as small as single Data Center or they can contain multiple Data Centers.

Regions are globally distributed

![pic26](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic26.jpg)

For instance in USA you have one --> East US Region and one --> West US Region.
In Ireland there is a --> North Europe region and
in Singapore we have --> Southeast Asia region.
There is also one in Japan --> Japan East region.
There are plenty more Regions available. All the dots (on the picture above) it is a different Region in Azure. It is 50 dots on the map and you can choose any from those Regions but it must be as close to your clients as possible. It is important decision for every Azure developer and Architect because the closer your Region is to client the lower the latency between the servers and your clients.

## Region

![pic27](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic27.jpg)

- Region is simply a geographical area on the planet.
- Region consists from one but usually more Data Centers and they need to be connected with low latency network. It should be under 2 milliseconds (2 milliseconds ) latency between the Data Centers.
- Additionally this is the location for your services

Location is a word that will come up very often when you work with Azure. Whenever you purchase any Azure service a location will be always mandatory field that you need to fill. It means which phisical server on the planet, which Region on the planet should you deploy your service to.

- Important things to remember. Some of the services are available only in certain regions. You should always check which Region has the services that you need to build your application.

- Also, there are some services that are called Global Services. They don't have any specific region and specific location assign. Things like traffic manager for DNS routing or Entra ID (previously known as Azure active directory).

- Azure is globally available in over 50 Regions. New regions are being announced and built almost every day. In future can be more regions.

- Also, there are some special regions like government regions for government regulations and partner regions like China regions where Microsoft is providing the services but it doesn't really manage and run Data Centers themselves

When you choosing Resource in Azure Cloud you choosing Location of this resource --> Choosing the Region of Azure on the globe where you will be deploying your service to.

The Region that you choose must be as closer to your clients as posible, to decide which Region is closer we can check using link below, it calculates an average latency between your current location and all available Azure Regions

[-->SPEED TEST<--](https://www.azurespeed.com/Azure/Latency)

Remember, not all the services are available on all of the Regions. Microsoft has another website to check that. This website will list all the available services per Region, Where you select the Region and Microsoft will list all available services for that region within Azure Cloud. Check link below

[--> Check Here<--](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region)

## Availability Zone

![pic28](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic28.jpg)

A Data Center has its own:

- Power
- Cooling
- Networking infrastructure

A group of Data Centers that are connected with super fast internet, they are called --> Regions. Regions can be as small as single Data Center or they can contain multiple Data Centers.

In a typical scenario you don't have control to which Data center your services will be deploy to. That is why availability zones were created. this is a regional feature where each Data Center gets a number. A number that represent a grouping of physically separate facilities.

Availability Zones are designed to protect from Data Center failures. Because each availability zone has its own Power, Cooling and Networking infrastructure. For example we have 3 Data centers, Whenever there is a failure in a single Data Center, other two Data Centers will continue working (picture above). This is how Data Centers operate.

Microsoft introduces Availability zones and also created services and features within services that can take advantage of this information. Those services are split in two cateories/types:

1. Zonal services (you choose availability zone where to save a copy of your service)
   you can choose to which availability zones are you doing the deployment to. In case virtual machines now you have a choice, you can create two virtual machines for highly available environment and specify that the first virtual machine goes to availability zone number 1 and second virtual machine goes to availablity zone number 2 or 3. This way you ensure that if there is a data center level failure your virtual machine at least one of them will continue working. In the classical scenarion without availability zones it is possible that your virtual machine even in a big region could be deployed to the same Data Center or even to the same physical server. That is why zonal services are so good and availability zones allow you to create those highly available applications.

![pic31](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic31.jpg)

When you choose the location for your service in Azure Cloud, also you can choose a specific availability zone from the drop down menu that i want to deploy to.

2. Zone-redundant (Automatically replicate Data across multiple availability zones)
   Those services like SQL database, storage accounts allow you to take advantage of multiple availability zones out of the box. With simple check of an option your services will automatically replicate data across multiple availability zones and will work in redundant way. So if there is a Data Center level failure you wouldn't even notice it in your application. Few things you should note here:
   - first of all --> not all regions support availability zones. About 7 Regions right now support it, with more coming in the future
   - second of all --> if the region supports it, there is at least 3 or more zones within that region. That means there is at least 3 Data Centers required.

Lastly availablity zones is built from one or more Data Centers. It is not necessarily a single Data Center.
Some of Azure Regions will have logical groupings over their Data Centers --> making them zone enabled regions

![pic29](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic29.jpg)

![pic30](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic30.jpg)

When you choose the location for your service in Azure Cloud, also you can choose in Replication option --> Zone-redundant (<--This service will atocatically will be replicate Data across multiple availability zones)
If you choose Region that doesn't support --> Zone-redundant, we won't see Zone-redundant option in Replication section

# What happens if there is region level failure, if entire region goes down?

![pic32](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic32.jpg)

It doesn't matter if you did use availablility zones.

For that reason Microsoft create Region Pairs. So Each Region has Region Pair. Pair Regions are at least 300 miles away from each other to ensure there is enough distance to cover the natural level disasters, like floods, storms, earthquakes etc. This way Microsoft ensures that if one region goes down the second region that is paired with that region will be UP and gives you a set of features to allow you to replicate your Data, replicate your application across multiple regions.

Key Characteristics:

![pic33](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic33.jpg)

- Each region is paired with another region making it a region pair
- Each Region pair is static and cannot be chosen (you can't choose which region you are pairing to, check documentation to which region your region is paired to)
- Each region resides within the same geography (exception of a single Brazil South, which is replicating to US)
- Each region pair has Physical isolation with at least 300 miles distance from each other (when possible. To ensure that large-scale natural disaster will not take two regions down at the same time)
- Some services will provide a platform level replication (automatically replicate your data and your services across multiple regions, to protect you from region level failures)
- Microsoft is planning updates across pairs (Microsoft is making sure the plan updates plan rollout of the services don't happen to the same paired regions at the same time. Therefore it will roll out all the updates and all the necessary things to the first region if everything is working correctly the updates will be rolled out to that paired region. Making sure that platform updates will not impact your application )
- Data residency (if you are planning for dissaster recovery scenarios)

# Some Examples of Region Pairs

Region Pair A ------------------- Region Pair B

- East US ------------------------West US
- UK West ------------------------Uk South
- North Europe (Ireland) ---------West Europe (Netherlands)
- East Azia (Hong Kong) ----------South Asia (Singapore)

These Pairs not always within the same country but they must be close enough to maintain high speed connectivity but far enough to ensure that Natural Level Disasters will not take them down

# Geography

![pic34](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic34.jpg)

All Regions and Region Pairs are grouped into geographies.
Each Geography describes a discreate market and contains typically at least two or more Regions and their purpose is you ensure that all the Data level requirements are met. Like residency, sovereignty, resiliency and compliance. Additionally geographies are fault tolerant so they also protect you from region-wide failures and geographies are broken into areas, like: Americas, Europe, Asia Pacific, Middle East and Africa. Each region belongs to only one geography at the time.

Key Characteristics:

- Discrete market
- Typically contains 2 or more regions
- Ensures Data residency, sovereignty, resiliency and compliance requirements are met
- Fault tolerant to protect from region wide failures
- Broken up into areas:
  - Americas
  - Europe
  - Asia Pacific
  - Middle East and Africa
- Each region belongs only to one Geography at the time
