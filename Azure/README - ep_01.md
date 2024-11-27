# AZ - 900 Microsoft Azure Fundamentals

# Clouds most important vocabulary

[-->> TEST HERE <<--](https://marczak.io/az-900/#ep01)

## Cloud Computing (See pic 1) ![pic01](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic01.jpg)

it is a delivery model for services. Services like:

1. Storage services (doesn't only mean stroring data but also all the services and tools that allow to migrate your data to the cloud).

Once your data is in the cloud you need a computer resources

2. Compute Power. like a Windows virtual machines, Linux, web containers or any of the hundreds of services available in the cloud. Cloud is about creating applications whenever those are web, AI, machine learning, reporting , any kind of applications out there.

Once you have your components you need to be able to connect them to each other securely

3. Networking (securely connecting between those components).

If your entire platform is managed in the cloud, cloud also needs to deliver analytic capabilities, where you can review your performance and telemetry data for your services

4. Analytics

The list of the services delivered by cloud computing is much longer than these 4 bullet points, but these 4 are main ones.
All of these services are delivered over the internet and this is basically what cloud is.

Cloud computing also has some certain characteristics. Which we will list below:

## Scalability (See pic 2)

- it is ability of the system to scale. Scaling it is a process of allocating (adding) or deallocating (removing) resources.

image you have a resource, resource can be anything. it can be web application, it can be a database, it can be a virtual machine which gives us opportunity to scale.

1. To scale up this virtual machine by increasing its size. Increasing the size of the resource means adding more POWER, like CPU, memory, faster sorage. In this case we are moving along the vertical line --> that's why this is called VERTICAL SCALING.

Increasing the size of the resource is called --> SCALING UP.
If you decrease the size, decrease the power of the virtual machine this is called SCALING DOWN

2. Besides of changing the size of our resource, changing the POWER of the resource you can also scale by adding more resources to your environmen. Increasing the amount of the resources. In this case we are moving along horizontal line, thit's called HORIZONATL SCALING.
   If you increase the amount of your resources, this is called --> SCALING OUT.
   if you decrease the amount of your resources, this is called --> SCALING IN.

## Elasticity (See pic 3)

Best way to explain elasticity to show workload of the typical application during the day. Where the user workload changes during the day, making more busier during some certain ours during the day. In this case you need to assign the specific amount of resources to handle the workload. Properly design system will be able to allocate and deallocate resources whenever needed.
If this porcess done automatically it is called --> Automatic Scaling
Automatic Scaling means automatic scaling by adding and removing resources depending from workload

## Agility (See pic 4)

- ability to react quickly and in the CLOUD this means being able to allocate and deallocate your resources in very short time.

In the cloud there are two ways to provision/get resources:

1. Manual (via portal)
2. Automated (ways using APIs and scripting )

in both cases there's the time between the request is submitted and response that the request has been fulfilled.

Major difference between the CLOUD and ON-PREMISES is that:

- requesting resources ON-PREMISES environment usually takes days, weeks or somethimes even months.
- In CLOUD once you request the resource, you will most likely get it within seconds or minutes and for very big servises this might take few hours.

## Fault Tolerance (See pic 5)

As a user you purchase services from the cloud, whenever that's Web application, Virtual machine or SQL but regardless of the service that you choose, all that services need to run on Servers in a Data Centers, storing their Data on DISK ARRAYS.
If there is any service or component failures on those Servers, there automatically move to another Server and the same for DISK ARRAYS. The Data is automatically stored on multiple disk and multiple disk arrays to ensure no Data is LOST.

Fault tolerance is the ability of the system to remain up and running during component and service failures. The localized failures will not interrupt your service. Most of the time in the cloud all the services have build-in fault tolerance. That means if you use cloud services you won't notice those localized failures affecting your system.

Also, can happen much greater failures than the localized failures - Disaster

## Disaster Recovery (See pic 6)

Disaster - is a serious disruption of entire service caused by natural or human induced causes. It can be:

- Floods
- Earthquakes
- Thunderstorms
- Power grid failures
- Human errors

They can affect entire Azure region or entire Azure servers from working properly. in this case we need to set up Disaster recovery.
Disaster recovery means creating 2 copies of the same application into Azure Regions and then setting up replication between them. So we have 2 identical copies of your application then in front of those applications you need to set up a simple DNS Routing. That your users are automatically redirected to the working version of your application. If any service fails they --> DNS Routing will automayically get rederected to replicated version of your application.
Disaster recovery is the system's ability to recover from an event that has taken down entire Region or service (disaster)

## High Availability (See pic 7)

Is a simple metric that measures how much uptime of the system being accessible to users deviding on system downtime. It is simple calculation between the uptime and entire lifetime of the system.
Avilability is a measure of system uptime for either users or services.
High availability means ability of the system to run for very extended periods of time with very little downtime.
In Azure many services deliver very high availability by default.
We can calculate availability per year, month or day.

Downtime - means planned occurences like system downtime for patching or unplanned (system failures)
