# Resources, Resource Groups & Resource Manager

Resources, Resource Groups & Resource Manager are building blocks for management of Azure services

# Resources

![pic35](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic35.jpg)

Users go to Azure --> they purcase services (services like SQL database, Web application hosting, virtual machine etc). It doesn't matter which service user buy, all those services are represented as a generic object which is called --> Resource. You can think of Resources like an obect that are used to represent your services in Azure.

Service Lifecycle (meaning)--> so as soon as you purchase a service in Azure you create a Resource, as soon as you delete the service you delete that Resource.

![pic36](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic36.jpg)

Azure uses Resources to save all the configurations that you make for your service. Any configuration option that you have for your service is represented as a property on that Resource. All the resources in Azure can be represented as a json (JavaScript Object Notation) template. It is simple file that has properties and values. It is very common used standards on the market described almost any object.
There are 4 common properties across all resorces:

- TYPE
- APIVERSION
- NAME
- LOCATION

and there are some other non-common properties that are different and used to describe different resources, different services within Azure.

But No Resource in Azure can be created without --> Resource Group

# Resource Group ![logo28](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo28.jpg)

![pic37](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic37.jpg)

It is logical container for only resources and it is requirement in order to create any Resource in Azure.
It is a grouping of Resources, you should use it to logically group related resources (it is like a bag where you keep all resources for particular application in one Resource group)

One of the purpose of Resource Groups is to use --> acces control (IAM), where you can add permissions for your coleagues for this Resource Group Resouces

# How to group resources together in Resource Groups ? ![pic38](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic38.jpg)

There are many strategies to do that, for instance there is a strategy that you can group your resources by services --> as example: all SQL databases in one Resource Group, all other resources in separate Resource groups for your web applications.

Also, can be organised by department name or use resorce groups to group resources for billing purposes. For instance creating a separate resource group for each cost center within your organization.

You can create your Resource Groups by location which is Azure Region, this way it is easier for you to manage Data, sovereignty and security compliance requirements for your organization.

More Common used approach is grouping Resources by application lifecycle. Having your development resource groups spread from your production resource group, so you can apply different scripts, different policies, different security rules and different access management policies.

There is no Main Rule how to organize Resource Groups. Therefore any organization uses a mix a combination of these strategies, like combining application names with environment names to give full separation of the application development life cycle with their production life cycle, and also total separation across multiple applications. This is most commonly used strategy on the market.

# Create Resource Group on Azure Cloud

Resource Groups are FREE, so you can create them as many as you need without worrying about charges.
Create Resource groups first , to creating new resource group you need to fill a form of different properties.

- Subscription property --> it is a billing unit for your entire Azure account
- Resource group property --> create a name for this Resource group
- Region property --> choose where the servers will be located with your Data

#### Also, you can work with Azure Cloud using Azure CLI or PowerShell in terminal

You just need to install PowerShell or CLI and you will be able to connect to Azure through terminal, (see --> Episode_19)

one of the comands, comand to login to Azure Cloud, which will open the browser window

```C#
az login
```

The managing our resorces and resource group from CLI is as easy as in Azure Portal

# How to find resource object data

[Resources.azure.com](https://resources.azure.com/)

Here you can review you JSON definition, if you want to see the common properties for the service that you are created that you can find it here.

There are 2 options how to do it

1. Option 1 ![pic39](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic39.jpg)
   Go to your Resource group in Azure portal --> copy URL link starting from --> subscriptions/..... and paste it to https://resources.azure.com/ <-- add this URL here

```C#
https://resources.azure.com/subscriptions/.....
```

2. Option 2

Click Subscriptions --> resourceGroups --> choose resource group --> providers --> storageAccounts

# Resouce Groups

- Each resource must be in one, and only one Resource Group
- Resource groups have their own location assigned (but this location is only used to store metadata, so it is not impacting resources)
- Each resource in the Resource Groups can be in a different location
- Resources can be moved between the Resorce Groups (If you don't know about your strategy)
- Resource Groups can't be nested (you can't create a hierarchy of Resorce Groups)
- Organize based on your organization needs but consider (When picking the strategy) :

  - Billing
  - Security and access management
  - Application Lifecycle

  It is up to you to decide that what works best for your organization

  # Resource Manager

  ![pic40](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic40.jpg)

  As an Azure customer you can use one of many methods of purchasing services:

  - you can do it through Azure Portal
  - you can use it through Rest API (so you can create scripts and applications that will automate resorce deployments)
  - you can use powershell scripting
  - you can use CLI
  - you can simply use one of many programming SDKs

  All these interfaces connect to the same point, sending the same template at point it is service called --> Azure Resource Manager.

  Azure Resource Manager - it is a centralized service governing all the resources in Azure and it is service that is responsible for creating each service within Azure.

  Azure Resource Manager - is a centrlized management layer for all the resources and resource groups in Azure. And because it has unified language unified template language you always send the same properties and the same validations and everything is consistent across multiple interfaces.

  Resource Manager also is responsible for checking your privilages with Microsoft Entra ID (previously was known as --> Azure Active Directory (Azure AD)). Because AMicrosoft Entra ID is a centralized identity and access management service in Azure , so this is where all the privileges are stored (IAM). So Azure Resource Manager will check with Azure id whenever the user that is requesting Resource creation, deletion or changes as a proper privilages is assigned.

  Azure Resource Manager is also responsible for controlling the access and management of the Resources.

  All the actions you perform - creating the Resources, giving access (IAM), putting Resources to Resource Groups --> go through Azure Resource Manager in order to create those Resource Groups and Resources.

  Resource Manager is internal Azure service for building and managing our resources
