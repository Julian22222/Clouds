# Azure Resource Locks

We will talk about what is Azure Resource locks and how they help to protect your Azure environment when it comes to building operation and automation.

We will talk about functionallity and usage of Azure Locks.

Example:
If you are a User of your Azure subscription and you have your Azure resources. When you are granted a role, lets say an Owner Role, we can perform any action on this virtual machine - like reading, creating chat resources, updating this virtual machine or deleting this virtual machine. The general issue is that the owner can do everything, including deletion part. So if the owner makes the mistake and deletes this virtual machine by mistake - its gone. And Microsoft won't be able to recover it.

So what you can do to prevent that? You can either take away owner previlages from that user or better - apply Resource Lock. When you apply a Resource Lock, of type - Delete, on this specific resource, all the actions still will be allowed based on user permissions, in this case Owner permissions except of Delete permission. Even if the user is the owner of resource, he won't be able to delete the resource. If the user wants to delete this virtual machine, first he needs to remove -Resource Lock.(see pic below)

But in Azure besides of resource lock that prevents from deleting the resources, there is one more resource lock type. So if you have the same scenarion, lets say this time Azure SQL, you can applu resource lock of type -read only. This resource lock works in opposite way in how delete works. In this case read only lock only allow you to read information about Azure resources and prevent from running any actions that notify this state of Azure SQL, this is how you can prevent accidental changes and accidental deletion of your resources, of maintaining the previlages that you have assign to your users. Maintain all the roles and only apply Locks whenever need it.(see pic below)

![pic169](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic169.jpg)

You can manage the Locks on an individual resources level, but it is better to manage this on resource group level. So instead Reading Lock on specific resources, you can create a resource lock on Resource Group level. And when you do it, when you apply a resource lock of type -delete, all the resources within that resource group will be affected in the same way. In this case Resource Lock of type - delete, will prevent deletion of any resources within this resource group.(see pic below)

![pic170](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic170.jpg)

In Azure Resource Lock Scopes hierarchy key goes from --> management group > subscription > resource group > resource group > resource

The highest level that you can apply Lock to - Subscription level, in this case the Lock will affect all the resource groups and resources within that specific subscription.(see pic below)

![pic171](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic171.jpg)

You can use Lock on resource group level (see pic below)

![pic172](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic172.jpg)

Or on individual resources (see pic below)

![pic173](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic173.jpg)

It is up to you, which resources do you want lock. One of the most common use cases of using locks is -> Locking the production services, which contain your data. Because if you delete a storage account, Microsoft won't be able to recover that and all the data that you stored in this storage account will be lost.

# How to use Azure Resource Locks

![pic174](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic174.jpg)

Only Owner Role and User access administrator Role are allowed to make this (add Delete or read-only Resource Lock) changes to Resource Group. Example: if i am an owner of MyBookStoreWebApp_group and put Delete Resource Lock for MyBookStoreWebApp_group, And Tom is assigned to this resource with some Role.Tom will not be able to delete this resource or any child resources or change Resource Lock settings. (if he doesn't have Owner Role and User access administrator Role for current resource)

```C#
//If you put Delete Resource Lock - Tom will be able to add new changes, but he won't be able to delete MyBookStoreWebApp_group or delete anything from its child resources
- MyBookStoreWebApp_group
    - My-storage //child resource
    - another child resource //child resource
    - another child resource //child resource
```

- Go to Resource Groups - (step 1 on the pic) ![logo28](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo28.jpg)
- choose and click on -> Resource Group, where you want to apply Resource Lock (step 2 on the pic)

- Click Settings on the left hand side menu and navigate to Lock section (step 4 on the pic). You will see the scope, that you are in the MyBookStoreWebApp_group and Locks section (step 3 on the picture )

- Then click +Add (step 5 on the pic) to add Lock
- then fill Add Lock form (see pic below) to create new Lock

![pic175](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic175.jpg)

- Lock name - no delete (for example)
- Lock type - read-only or delete, (allowing read actions only on this resources or - Delete-to make sure no one would be able to delete this resource)
- Notes - can be blank, can add any notes to this Lock

Then hit ok, and Lock will be created

# Resource Lock Key Characteristics:

- Designed to prevent accidental deletion and/or modification of your Azure resources
- Used in conjunction with RBAC
- reason of using Locks - it allows you to Lock resources without modifying your existing roles.
- 2 types of Locks:
  - Read-only(ReadOnly) - only read actions are allowed on specific resources, resource groups or subscriptions
  - Delete(CanNotDelete) - all actions except delete are allowed
- Scopes are hierarchical (inherited)
  - Subscriptions > Resource Groups > Resources
    If you will apply this on Subscriptions it will affect all of Resource groups and individual resources
- Management Groups can't be locked (can't apply across multiple subscription within a single Lock)
- Only Owner and User Access Administrator roles can manage locks (built-in roles) -> creating or deleting existing Locks
