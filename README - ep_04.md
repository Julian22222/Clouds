# Consumption-based Model (See pic 11)

Before you start working with Azure. You need to understand How Azure pricing being formed, therefore you need to understand Consumption-based Model.
Typical usage, workload is changing over the time and match that usage demand you want to allocate as many resources as you need at any given time.

Key Characteristics:

- No upfront costs
- No wasted resources
- Multiple pricing components per service
- Very granular usage measurement

You will only pay for those resources during the time of the usage and only as much as the resources that you consumed. There is no upfront cost because with consumption-based model you only start paying when you start using the resources and because CLOUD is elastic you don't have to assign resources when you don't need them. It means there are no wasted resources and you don't paying for them. you only pay for the resources when you need them and you stop paying as soon as you don't need them.

You will pay only for how much resources you used and for how long you have used those resources.

### One more thing to understand (pic 12)

Let me use Virtual machine as an example here. Charging for a service like virtual machine might be very tricky. Therefore Microsoft created a few metrics that the price is based on.

First one is:

1. Compute

It is a power of virtual machine (the size of virtual machine that we purchased). if your usage changes per day or your size changes per day you will be charged different amount each day. Additionally to your virtual machine usually there is a storage attached and you will be priced for that storage separately. If you have small virtual machine but a lot of storage you will pay different price comparing if you have big virtual machine and very low amount of storage. Also, there is additional metrics that are separately priced on the top of your service --> like networking and can be other additional costs depending from services that you use and complexity. Because some services are easier to price other are harder but Microsoft separate all the services and charge you appropriately to your usage.
Therefore, Consumption-based Model have multiple pricing components per each service. The charges are very granular, if you use only virtual machine for 20 seconds you will only pay for 20 seconds of the usage

# To check the costs of the CLOUD resources

Azure service that allows to track all the costs you have on the CLOUD --> Cost Management + Billing.

Using this service --> Cost Management + Billing , you can see the cost of your's subscription. On the left side menu bar click on --> Cost managemnt --> Cost analysis.
Here you can track your costs for any months and different resources per day

To see what price you pay for each service per day (understand where are the costs coming from), choose--> Group by: Service name, Granularity: Daily , Column chart(stacked)
