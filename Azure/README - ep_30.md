# Azure Resource Tags

You can organise you Azure resources with use of Azure Resource tags

Why we need them in you Azure environment?

![pic176](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic176.jpg)

In Azure you can place your resources into Resource groups and the typical approach to do that is to group your Azure resources by the name of the applications that you are building. So all the resources that are components of your application one will be in the same Resource Group. This approach is very popular because it allows you to build your application more efficiently.

But if you want to group your Azure resources by something else, other than your application name, of course you could implement different resource group naming convention but if you would change your mind or want to add additional information --> there is no way to change the resource group name. So to achive that you would be forced to create new Resource Group with new name and then move all your resources to that resource group. This introduces a lot of additional maintenance effort which is not what you want when managing Azure environments at scale. This is where resource tags can help.

If you want to assign a department name information to your Azure resource you can do it with the tag. To do that you would locate this resource in Azure and then assign a tag, giving it a name, for example: Department and then value = finance. In this case, tags allow you add some extra information to your Azure resources. So if your goal to group your resources by departments you could assign this department tag in every single resource in Azure and give different values, depending which department owns the specific resources. (see picture above - Column 1)

What is good about resource tags is that you can assign multiple tags to a single resource. So for example you can add an owner information, so a person who should be contacted whenever an inquiry is required about this specific resource. You can also use tags to do some automation, for example- assign a shutdown time on a specific virtual machine and then create scripts which will leverage is information to do your automation tasks. When it comes to tags you can also use tags on resource group level. So you can assign owner, cost, whatever is necessary for your organization. It is extremely important to note that resource tags are very simple in nature. It is just about assigning information. So you can assign any resource tag name and any resource tag value. It is really about you and yuour organization,how do you want to manage your resources using Azure Resource tags. (see picture above - Column 1)

What is important here, is that resource tags are not inherited by default, so in this case if we assigned a tag - cost_center = 327 on resource group App1. (see pic above -Column 2) This cost_center tag will not be inherited on this Web application and this virtual machine be default(see pic above - Column 1). This can be achieved with something that we will learn about in the next episode which is called Azure Policy. But by default resource tags are not inherited.

# How to assign Azure Resource Tags

If you creating new Resources (It can be any resource), each resource panel will have different sections on the top (see pic below). For example: we will create new Web App resource.

![pic177](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic177.jpg)

and then give Tag name and tag value. You decide how do you want to manage and tag your resources.

![pic178](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic178.jpg)

Then it will be a tag section in the main Panel of created resource, whicj can be changed or checked. In this section will be all the tags that we assign for this specific resource.(see pic below)

![pic179](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic179.jpg)

It is important to know that tags on their own don't do anything. It is just extra information for your Azure resource, resource groups and Azure subscriptions.

For example:

- App services will have all app services within your Azure environment
- Storage Account will have all storage accounts within your Azure environment
- SQL databases will have all SQL databases that you have in your Azure environment
- Subscriptions will have all subscriptions that you have in your Azure environment
- SQL servers will have all SQL servers that you have in your Azure environment
- this works for all resources

#### In Azure Portal this is not the only place where you can see tags. You can go to your

- In Azure Portal, Go to Home page and click on any Resorce that you want to get Azure Resource Tags (see pic below)

![pic180](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic180.jpg)

Or you can find Resources on the left side menu bar (see pic below), all these are Resources, find that you need from that list and click on it.

![pic181](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic181.jpg)

- Then click on -> Manage View (on the Top section - step 1 on pic below) and Edit columns (step 2 on pic below)

![pic182](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic182.jpg)

Where you can edit columns and add tags to your default view and see all the resource groups that you assign tags to.

#### Add Resource tag to existing resource group or resource

- Navigate to needed resource group/resource (step 1 on the pic below) and on the left side menu bar you will see - Tags (step 2 on the pic below)

![pic183](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic183.jpg)

- Then you will need to fill Resource tag names and values

What is also important is that tags are natively integrated with Azure platform. If you go to Cost Management ![logo27](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo27.jpg) you will be able to review the cost for your Azure subscriptions by tags. Choose Group by: Tag.

One of the most common use cases for using tags in Azure is for billing purposes. So you can assign a tag to a department or cost_center and then you can charge them internally, based on the amount of the money they spend on Azure resources.

(Not important)
And lastly what is important is that tags once assigned can be used also for automation, in this case it is really as simple as opening Azure cloud shell

![pic184](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic184.jpg)

and typing a single command which will list all Azure resources. Which have at least one tag asigned.

![pic185](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic185.jpg)

Once this is returned you can review all of Azure resources with the resource groups and what tags have been assigned to those specific resources.

![pic186](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic186.jpg)

Like in our example we have our az-900-devops and our storage account - amdemo123a with the cost_center and owner tag assigned.

# Resource Tags Key Characteristics:

- Tags are simple Name(key) -Value pairs which you assign, giving a name and value
- Designed to help with organization of Azure resources
- There are plenty scenarious where Azure resource tags can be used to - Used for resource governance, security, operations management, cost management, automation, etc. Tags it is just extra information for your Azure resources, so how you manage it it up to you.
- There are lot of tagging strategies that are typically used for organizations:
  - Functional -mark by function (ex:environment=production, or development or test)
  - Classification -mark by policies used (ex:classification=restricted)
  - Finance/Accounting -mark for billing purposes(ex:department=finance)
  - Partnership -mark by association of users/groups(ex:owner=adam)
- Applicable for resources, resource groups and subscriptions
- Not inherited by default
