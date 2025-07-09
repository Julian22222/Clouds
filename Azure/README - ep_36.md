# Cost Reduction Methods, Reservations, Hybrid benefit, Spot VM, Pricing & TCO

In this episode we will find out how to save some money on your Azure Services.

There are multiple ways to reduce the cost of our Azure services.

First we will focus on the factors that can reduce the cost of our Azure services:

- Reservations (which consist of reserved instances, reserved capacity, etc.)
- Spot pricing for Virtual machines
- Hybrid use benefit

Then we will move to 2 tools that help during this journey:

- Azure Pricing calculator
- Total Cost of Ownership (TCO) calculator

# Reservations

![pic237](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic237.jpg)

In Azure you purchase capasity of the services over time. In case of virtual machine this simply means performance. And one of the biggest benefits of the cloud is being able to shut this Virtual Machine down whenever you don't need it. Turn it on when you need it or even scale it up and down whenever that is necessary. And you will only pay for the usage. (See pic above, step 1)

So the usage means the cost of the service but what happens if you have a different kind of workload, a workload that does not need those benefits of the cloud. A very stable workload, that will constantly consume 1 virtual Core of that Virtual machine over time and you won't be shutting it down or scaling up this Virtual machine. Therefore, you are losing those benefits of the cloud. (see pic above, step 2)

Does that mean you have no way to reduce the cost of that Virtual machine? Well there is a way and it is by using Azure Reservations.

Example: (see pic above, step 3)

Lets say we purchase a Virtual machine with 1 virtual Core and this Virtual machine price is $50 per month.

- If you buy that Virtual machine and you will use it for 1 week , this will cost you $12,
- If you purchase that for 1 month - $50.
- If you will use that Virtual machine constantly throughout the year this will cost you $600. If you know you will be using it for this long period of 1 year. What if you could reserve that Virtual machine and get a discount for that. If you do it and reserve that capacity , if you will commit yourself to that 1 Virtual Core capacity of that Virtual machine for entire year - Microsoft will give you a discount and when you do it the cost of this Virtual machine will suddenly drop to $360 a year. By that the cost of our Virtual machine per month drops to $30. That means we are getting 40% discount but Reservations can also be made for longer period of 3 years. In this case you will pay $720 for 3 years of that Virtual machine, making it only $20 per month or 60% discount of the total price. This is amazing way to save a lot of money if you have a lot of stable workloads, especially in large environments which rely on certain services running all the time.

There are 3 types of Reservations that you can make in Azure.

Types:

- Reseved instances - Azure Virtual Machines
  Reserved instances meaning that you reserve the Virtual Machine performance, where you reserve the SKU - the compute power of your Virtual machines.

- Reserved capacity - Azure Storage, SQL Database vCores, Databricks DBUs, Cosmos DB Rus
  You can also reserve capasity for platform as a service offerings like Azure Storage, SQL Databases, Databricks units, CosmosDB reviews, etc.

- Software plans - Red Hat, Red Hat OpenShift, SUSE Linux, etc.
  Also, you can make reservations for software plans. At this point in time this means reserving the licensing costs for operating systems like Red Hat. Just remember those reservations are made for 1 or 3 year periods.

# Spot Pricing for Virtual Machines

![pic238](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic238.jpg)

Imagine this box represents the data center capacity for Virtual machines (see pic above, step 1) and customers purchase virtual machines certain part of that capacity is being used. But at the same time Microsoft needs to be able to have a lot of unused capacity in order to meet growing demand and those auto scaling features of the cloud. So they need to have a reserve of the capacity whenever customers need it.

Would it be awesome if you could use that unused capacity at the discount. Well you can, and this is exactly what Spot Virtual machines are.

You can buy that unused capacity at a significant discount. If Microsoft will need that capacity back, they can take it at any time. And depending on the capacity that is left in the data center you will get different discount. If there is a very little capacity that is being unused - the discount will be very low. Therefore the price of the spot VM will increase. (see pic above , step 2)

If there is a lot of unused capacity the discount will be very high. Therefore, your cost of the Virtual machine, the price will be very low.

Spot VN Summary,

- How it works

  - Significant discount for Azure VMs
    You purchase regular VM in Azure except it is a spot virtual machine and you get a significant discount to the price of that virtual machine.
  - Capacity can be taken away at any time
    But the trade-off here is that Microsoft can take away that capacity at any time without any notice.
  - Customer can set maximum price after discount
    But additionally depending on the unused capacity the price will change. Therefore you have additional feature which allows you to set the maximum price that you want to pay. And if the price of the VM will go above this level you can evict this Virtual Machine. And if it will grow but it will be below your maximum price level, you can still keep it.

  Why would we want to purchase a spot virtual machine?

  - Best for interruptable workloads (batch processing, dev/test environments, large compute workloads, non-critical tasks, etc.)
    It is really awesome for those interruptable workloads. If you can create a service that will take advantage of those spot virtual machines for example for batch processing, maybe Dev/test environments or large compute workloads, especially those non-critical tasks, etc. You can save a lot of money on Virtual machines. But it is important those are non-critical tasks because Microsoft can take away those Virtual Machines at any time if there is a low capasity available. But that huge discount might be something that still will be good enough for you to take an interest in spot virtual machines.

# Hybrid use Benefit

![pic239](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic239.jpg)

Imagine a scenario where in your ON-PREMISES data center you have a Virtual Machine with 1 virtual Core running Windows server. Because this Virtual Machine is running Windows server that means you also purchased a license for a Windows server for 1 Core. When you migrate this workload to Azure you will also create a Virtual Machine if the same size with 1 virtual Core. And you will pay the price for the compute power with 1 virtual Core assigned. Because this Virtual Machine is using Windows you will also need to choose Windows Virtual Machine in Azure. Therefore, your price for the Virtual Machine will also include the cost of the Windows license.

When you go to any kind of calculator in Azure you will very quickly notice that the price for Windows Virtual Machines is always higher than when comparing those to a Linux Virtual Machines. This is because a Linux like Ubuntu is Free, but for Windows you need to pay for the Windows server licenses. But in this scenario you already have the license for your Windows server and then you are paying additionally the cost of the licensing cloud that doesn't make sense. This is where Hybrid use comes into play, you can use this license in the cloud by selecting hybrid benefit when you create your virtual machine. When you do it , it will remove the cost of the license associated with Virtual Machine. Therefore, the cost of your VM will be only associated with the compute power.

If you combine the Hybrid use Benefit with Azure Reservations, you can significantly reduce the cost of your Azure environments. Hybrid benefits allows you to use existing licenses that you already purchased for Windows Server, RedHat, SUSE or SQL Server in Azure. For the first three we are talking about the operating system costs on Azure VMs. But when it comes to SQL Server you can significantly reduce the price of Azure SQL Databases, Azure SQL managed Instances, Azure SQL Server on VM and Azure Data Factory SQL Server Integration Services

Summary

- Use existing licenses in the Azure
  - Windows Server
    - Azure VM
  - RedHat
    - Azure VM
  - SUSE Linux
    - Azure VM
  - SQL Server
    - Azure SQL Database
    - Azure SQL managed Instances
    - Azure SQL Server on VM
    - Azure Data Factory SQL Server Integration Services

# Cost Reduction Methods

2 Tools:

- Azure Pricing calculator - estimate cost of Azure services ( which we already learnt about in previous episde). In this Pricing Calculator you choose this service that you want to use. Then you adjust parameters for that service and you review the cost. Here we focus on Saving options ( see pic below) - 1year reseved or 3 year reserved

![pic232](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic232.jpg)

![pic233](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic233.jpg)

- Total Cost of Ownership (TCO) calculator - compare datacenter versus Azure workloads.
  This calculator is very interesting because it allows you to compare the cost of running certain workloads in your datacenter versus Azure. And the process is very simple, first you define your workloads that you have in your Data center. Then you adjust some assumptions like the cost of labor, cost of the licenses, you adjust what kind of things you would want to leverage in Azure and then you are presented with a report. Which shows you the comparison of running that particular workload in Azure versus your own Data center.

Example: using this link [--> TCO <--](https://azure.microsoft.com/en-gb/pricing/tco/calculator/) you will find Total Cost of Ownership Calculator. And It has 3 step process.

- First we need to define our workloads , so in this section we need to add how many servers do have in our Data center by selecting - Add server workload. (see pic below, step 1)

![pic240](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic240.jpg)

It will open some options, In here we can give it a name, make some adjustment. For instance whether this is a Physical server or a VM, what kind of operating system does it run, what kind of license does it have and all the other parameters (see pic below)

![pic241](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic241.jpg)

Then you scroll down to the Database Section (see pic below, step 2). Here you can add what kind of databases are you running in your ON-Premises environments.

Then you scroll down and you can add Storage solutions, you can estimate networking that is going out of your Data center and then hit Next button.

You will be redirected to second tab, In the Second Tab we adjust our assumtion by selecting

- what kind of currency do we want to use for this report.
- Do we have the software assurance covarage for our Windows Server and SQL Server licenses.
- Do we want to use Geo-redundant storages (GRS) for Azure Storage
- Do we want to use Bs-series VM <-- which are the cheapest VMs available
- and a lot of different factors that make up for the cost of running Data center. And then you click NEXT.

Then on the last Tab you will be presented with a report. This report will show how much money we can save when we move our workloads to Azure over 5 year period. And of course this depends on what kind of workloads we are runnong and what kind of assumptions did we make on our second Tab.

It is very important that you adjust those assumptions based on your current use case and what you have available in your company and what kind of workloads you are running. That makes incredible difference in the final estimations. Also you can see the charts here, this charts will show - different things -like etimated network cost of running ON-Premises data center. Or what is IT labor cost, etc.

# Summary

- Cost Reduction
  - Reservations (reserved instances, reserved capacity) - purchase Azure servics for 1-3 years in advance with a significant discounts.
  - Spot pricing - purchase unused VM capacity in Data center for significant discount. But this capacity can be taken by Microsoft by any time.
  - Hybrid use benefit - use existing licenses in the cloud
- Tools
  - Pricing calculator -allows to estimate the cost of Azure services before making the purchase
  - Total Cost of Ownership (TCO) calculator - estimate and compare the cost of running workloads in datacenter versus Azure
