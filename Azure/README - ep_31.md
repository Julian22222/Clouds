# Azure Policy ![logo36](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo36.jpg)

Azure Policy is one of the key elements of Azure control/ governance

As a customers of Azure we go to Azure Portal to create Azure services, wo do that by specifying the common properties for each service. We specify the:

- TYPE of the service that we want, let's say - App Service, which can host our Web Applications.
- LOCATION, which is also called - Azure Region. In this case - Germany.
- And other common properties for specific services. Let's say - SKU

1. When we choose all of those properties, we send request to Azure. We do that through either Azure Portal or we can do it through Azure Powershell, Azure CLI or ny other tool. Then Azure is validating this request, so Azure will check whether the service is a proper service, did you filled all the required properties, is the combination of the properties correct, is this service available in this region and many other things. And once the request is validated the next thing that is being checked are permissions.
2. Azure will check whether the user that submitted the request to create this specific Azure resource has all the permissions required to create the service and if it does, it creates the service with the properties that you specified.

![pic187](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic187.jpg)

But there is one more thing that Azure does before creating that service, which is checking for Policies. So what is Policy?

Azure Policy allows you to check for Azure resource properties and then make decisions based on the values of those properties. For example, let's say we have a company and our company has some data sovereignty requirements that needs to be met in order to create applications. Let's say because of the security policy our data might never be processed outside of the German borders. To do that we need to ensure that all of our services that will be created in Azure will be in LOCATION - Germany. To do that we can create Azure Policy. So we create a Policy in which will check for certain Azure properties - in this case -> LOCATION. And then we can create a rule and check whether LOCATION is Germany then we can allow for the deployment but if the value is anything else then deny the deployment. This is called Policy definition. In your Azure environment you can create as many Policy definitions as you want in order to match your internal standards. And once this Policy definition is created and then assigned to an Azure scope- let's say Azure subscription -> it will be active and will validate all of the deployments that will happen within this specific scope. In our example this means, all the properties from our request will go to Policy definition. In this case the LOCATION is Germany therefore we will allow for this deployment as such Azure will create our resource.

![pic188](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic188.jpg)

On the other hand, if our location would be, for instance - West Europe. That means in this case our policy definition would get a different location to validate. We would go into --> DENY Route (see on the picture below), therefore this validation would fail and the service would not be created.

![pic189](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic189.jpg)

What's important here to notice is that - Policies do not check for users permissions, they already assume that user has a right to create Azure Resources. Because this was checked in previous step. In case of Azure policy, we check for resource properties, so we focus on the definition of our resources, so we can make sure that our resources are compliant with our internal standards. When it comes to policy definition the decision that you make, so either --> ALLOW, DENY or any other is called Policy Effect, and there are more than just 2 options, so we will talk about this a little bit later.

# Azure Policy in Azure Portal ![logo36](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo36.jpg)

- Go To Azure Portal
- Search -> Policy
- Policy panel will show a high level overview of the Policies that are currently assigned across all of my Azure Subscriptions and how many resources within my Azure Subscriptions are compliant or not compliant with my Policies.

Importan section is Definitions on the left side menu bar.(step 1 on the picture). It will show the list of currently available policies in your Azure Subscriptions.

![pic190](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic190.jpg)

Microsoft prepared handreds of policies available to you just for you to use, so those are -> Built-in policies (see pic below).

There are 2 types of policies: (click on Definition type: All definition types button to see 2 types) - (see pic below)

- Policy (see pic -1) - is a singular check and then singular effect that you want to apply.
- Initiative (see pic -2) - if you want to group multiple policies. Initiatives allow you to bundle multiple policies and then assign them as a single combined bundle. So if you want to make sure that all the subscriptions will follow the same rules you can use policy Initiative

![pic191](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic191.jpg)

There are plenty of available initiative bundles already, for example in Initiative Policy: Uk OFFICIAL and UK NHS with 59 policies bundld together so you can use this initiative and apply to your environment if you want to follow those standards.

![pic192](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic192.jpg)

One important note here is that, those are of course the built-in policies. If you want you can create your own policy to match your company's standards. (se pic above- 3 and 4)

# How to use Azure Policy ![logo36](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo36.jpg)

Let's go back to Policy type, to show example that we were talking about in the beggining of this episode. For example I want make sure that NO resources can be created outside of my specified - Azure Region.

- To do that, you can search for Policy, choose Policy (Definition type, see pic -1) and apply.
- In search, put --> location (step 1)
- find - Allowed locations (step 2) and click it and review its details. (don't change them)

![pic191](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic192.jpg)

![pic193](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic193.jpg)

- if you want to use this Policy, then click --> Assign policy (step 3)

![pic194](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic194.jpg)

This allow you to choose:

![pic195](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic195.jpg)

- Scope. You choose in which Azure subscription, each Azure management group, or maybe a resource group this policy will be Active, will be checked. Here basically you choose Subscription and Resource Group where Policy will be Active (step 1 on the pic)
- Exclusions. It is a pretty neat feature which allows me to choose a scope, like a broader Scope, let's say entire subscriptions and then choose scopes for which this policy should NOT be checked. (step 2 on the pic)
- Assignment name. It is a name that will indicate what this specific Policy assignment does. In this case, let's call this - Alloed locations Germany. (step 3)
- Rest stay without changes
- Policy enforcement. Should be enabled (step 4) and hit NEXT

![pic196](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic196.jpg)

- to follow our example, we search for german and choose all German regions from the list and hit NEXT

![pic197](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic197.jpg)

- Remediation tab is very interesting because by default Azure Policies are applied to the newly created resources or the ones that are being currently modified. If you have already existing resources you can create something called - Remediation task. Which will audit and apply your policies against those resources that already exist in your Azure environment. But for now we don't need to worry about this. So will leave it empty and hit NEXT and CREATE.

Once the Policy has been created/assigned we can test it. We can go to our Resource group that we assigned to this Policy and create new Resource in this Resource Group. If the New Resource Region is German it will allow you to create that resource if there new Resource will have Region not in German it will FAIL to create that Resource.

# Key Characteristics of Azure Policy

- Designed to help with resource governance, resource security, compliance, cost management, etc.
  You can create Azure Policy which will allow standard tiers - let's say your Azure SQL Database and block Premium tiers from being created.

- Policies focus on resource properties (RBAC focused on user actions)
  One important distinction that should be made, in previous episodes we have learned about Role-based access control which is permission-based feature that focuses on user actions. We have been assigning Roles to users and preventing them from doing something. In this case we just focus on the resource properties themselves making sure that whoever creates the resource, those resources will be compliant.
- Policy definition - Defines what should happen.

  - Define the condition (if/else) and the effect (deny,audit,append,modify,etc.)
    This describes which properties should be checked and what should happen and it does that by specifying the condition of those properties. It is a simple if/else statement and then based on those statements you apply an effect and there are multiple effects that you can apply. In our example we used DENY effect,

    Deny effect stops the deployment from happening, but beside this DENY effect you can apply other effects.

    AUDIT effect - will allow for deployment to happen but it will raise a warning in this overview panel that we have seen in Azure. So we will see that this resource is not compliant but will still allow for the deployment to happen.

    Append and Modify effects - allow customers, they allow Azure administrators to modify the deployment before they happen.

  - Examples include allowed resource types, allowed locations, allowed SKUs, inherit resource tags
    it allows you to specify which services can be created in your Azure environment, which SKUs are allowed, etc.
  - Built-in and custom policies are supported, or you can create your own policies if needed

- Policy initiative - a group of policy definitions
  If you have multiple policies that you want to apply at the same time, you might want to group them into Policy Initiative.
- Policy assignment - assignment of a policy definition/initiative to a scope
  You can assign either policy definition or entire initiative to a scope as we learned scope can be anything from the management group and etc.
  - Scopes can be assigned to management groups, subscriptions, resource groups and resources
  - Policies allowed for exclusions of scopes
