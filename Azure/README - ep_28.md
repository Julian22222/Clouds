# Azure Role-based Access Control (RBAC)

In previous documents we talked about Entra ID before known as Azure Active Directory (AD) is a centralized service for Identity and Access management. And that access management for Azure resources is done with role-based access control feature. To better understand how this works let's start with what are roles.

# Roles

![pic153](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic153.jpg)

In Azure you have multiple resources - like Disks, Virtual Machines (VM), SQl Databases or Web applications or many more and for all of those services you can perform certain actions. You can create a Disk, update that Disk, attach it to a VM, start or stop this VM, scale up your database or just deploy Web application. All those things that you can do in Azure with Azure services are called - Actions. Actions - as the name suggests, defines what can be done with a certain type of service.

Potentially you can assign each specific action to users and applications to allow them to manage Azure resources. But it would be very time consuming because there are literally hundreds or even thousands of actions that can be performed in Azure.

It is easier to create a bundles of those actions, so you can combine the actions that you are interested in - Update Disk, start and stop VM and attache disk and create a Role called - Virtual Machine opeator and you create as many roles as you want for your organization. So you can fine-grain your permissions for your applications and for your users however you need and all of those are Roles.

Azure comes with a lot of already Built-in roles allowing you to manage your access to your resources and cover the most common scenarios very easily.

Role (role definition) - is a collection of actions that the assigned identity will be able to perform. Is it a collection of actions that can be assigned to user or application identity and it will define which actions can be performed by that specific identity.

Role definition is an answer to a question "What can be done?", which actions can you perform on Azure resources.

Role needs to be assigned to identity . In this case identitie are called - security principle. Objects with an Entra ID (previously known as Azure Active Directory -AAD) that represent users or applications. Those could be Users or Group of Users. You can also assign Roles to service principles so application accounts in Azure or application accounts that are tied to specific service, called - Manage Identity. All those are called Security Principles and they can be assigned a role.(see pic below)

![pic154](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic154.jpg)

Let's say we have user, called - Tom, we can assign Roles to Tom. Lets's say we can assign him a Virtual Machine and Database operator role. Now Tom can perform support and opeation tasks effectively and you can combine as many roles as you need to fit your needs.

It is a common practice in Azure to give multiple roles to users and groups so that you can find great permissions and only grant the least privilege require to perform certain actions for specific users. You can also assign to Tom, let's say a Web Developer if he is developing web applications or assign it to a group in this case - DB operator will be assigned to support L1 group. So that means both Jess and Pete who are part of this group would get that role assigned as well. This is quite important to understand that assigning a Role to a group will affect all of the users within that group. And those are Security Principles that we have been talking about.

![pic155](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic155.jpg)

# Security Principal

Security Principal is an Azure object (or identity) that can be assigned to a role (example(these identities, these objects can be)- users, groups or applications).

Security Principal assignment is an answer to a question "Who can do it?".

Additionally a Role needs to be assigned to a scope, so where exactly those actions can be taken. Azure is organized in a hierarchy. A top level object in Azure is called - Management Group, which allows you to group multiple subscriptions or multiple management groups.

A subscription is top level billing object. So most of us will have a subscription asset our top level resource in Azure when we purchase our Azure subscriptions. Under each subscription you will have multiple resource groups and of course, since resource groups are a logical container for resources, under them you will have your own resources. When you assign a role to a scope you can assign it at any level. In this case if you assign it on a top level - on a management group level. Then that role will be inheririted by all child resources. So if you assign a role on a management group level that role will be propagated across all of these subscriptions, all of the resource groups and all of the resources within this management group.(see pic below)

![pic156](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic156.jpg)

If you decide to assign it on a subscription level of course it will affect only resource groups and resources within that subscription.(see pic below)

![pic157](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic157.jpg)

And if you assign it to resource group level, the same thing applies(see pic below)

![pic158](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic158.jpg)

So you can assign it on any level that you want even down to a resource level. If you want you can give me an access to your specific Virtual Machine or specific Database only(see pic below)

![pic159](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic159.jpg)

And all of those are called Scopes.

# Scopes

Scope one or more Azure resources that the access applies to.

Scope assignment is an answer to a question "Where can it be done?"

Example:

- What can be done? If you assign an owner role - that means everything can be done, all the actions with an Azure can be taken.
- By who it can be done? In this case if you assign it to user -Tom, that means Tom can do everything.
- So the last question is - where it can be done? Let's say you assign it to a Virtual Machine resource called - DEV-VM. In this case you can read it from the top to bottom. Every action, everything can be performed by Tom on the DEV-VM virtual machine.

This three things are combined into something called - Role assignment. Role assignment is a combination of role definition, security principle and the scope.

![pic160](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic160.jpg)

Users can have many different scopes within 1 project

```C#
//Example, you have a project --> az-900-vm, and this virtual machine has other different resources.

//Each resources can be assigned with specific Role to user or user group, security principle

//We can assign Tom to Role -> Reader access for --> az-900-vm (can read only this resource)

//and can assign Tom to Role -> Virtual Machine contributor for --> amdemo-vm (where he can make any changes)

//you can assign different scopes for the same project

- az-900-vm (Virtual machine)
    - amdemomo-vm
    - amdemo-vm-ip
    - amdemo-vm-nsg
    -
```

# How to check your Role assignment and how to assign other users to your projcts in Azure.

For example: If you are an Owner of some App or project you can assigned other users to your resources (app/projects). If you assign Tom to some of your resources. Tom can find it in his Resource groups ![logo28](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo28.jpg), where you can see all resources that you have access to.

If you just assigned Tom to some Resource Group or Resource you need to wait couple of minutes to see this changes in Tom's Resource Group Panel. ![logo28](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo28.jpg)

What Roles Tom can be assign and how to manage Roles for Tom in Azure Portal?
If you are an owner of some resource:

- Go to Resource groups panel ![logo28](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo28.jpg)

Here you will find all resource groups that you have access to. And let's say we want to give access to one of those resource groups.

![pic161](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic161.jpg)

- Let's say we want to assign Tom to --> az-900-vm (resource group)
- and on the left hand side navigate to the - Access control (IAM)

![pic162](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic162.jpg)

In this Panel you can manage the access to your Azure resources and Resource groups. This panel exists on every single resource in Azure.

In here there are multiple tabs that you can use.

![pic163](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic163.jpg)

- Check access tab - allows you to check what are the currently assigned permissons to a specific User, Group or a Service Principle. (here you can check scopes for this resource - Subscription level, Management level etc.)

If you want to check access for some User, Group or a Service Principle for this current resource - use step 1 and step 2 - where you put -> User name, email or Group name.

If you want to assign a Role for Tom for example, you press + Add -> Role assignment. We will see - Add role assignment form.

![pic164](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic164.jpg)

As we mentioned above, Role assignment is a combination of 3 things.

- We need to select a Role ("what can be done?").- There is a list of plenty available roles in Azure and they solve the most common challenges around access management in Azure. If You want to give a Reader role to Tom - Tom will be only able to read and see Azure resources but don't change them -> then you can select Reader Role.
- Then we need to select to whom do we assign. Do we assign it to user, group, service principle or maybe some manageidentities.(select from dropdown list)
- Then we need to select the object, who can perform this, in this case we will type Tom - and select Tom's account and hit SAVE.

Notice that we didn't pick a scope for Tom, because scope in this case was automatically picked, because we are now on the resource group level --> (see pic below)

![pic165](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic165.jpg)

We can review all of the assignments that are done for this specific resource groups in another tab, called - Role assignments.

![pic163](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic163.jpg)

Here you can review all the roles and role assignments that have been done for the specific resource group. Now we will see Tom added as a Reader.

Next Tab is called Roles. This panel allows you to review what are the built-in and custom roles in Azure, which user groups and service principles are assigned to those roles but also what are the actions that are bundle under each specific role. (see pic below)

![pic166](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic166.jpg)

# Adding different Scopes

- we can assign Tom on the top level of your resource group (+Add in Resource group that we assigning)

- If we want to make different scope for Tom - we can navigate from az-900-vm resource group even further down to a level of a virtual machine for example (or any other resource in the current Resource Group).

![pic167](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic167.jpg)

- Click on Virtual machine (scope will apply only for this Virtual Machine). Then go to access control(IAM) and click --> +Add, and then click --> Add role assignment and fill add role assignment form (the same as we did before but on another scope level)- see pic below. Underlined part is a scope level. (the assignment will apply only for this scope)

![pic168](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic168.jpg)

And Choosen Role will be relatad to this specific scope - only to this Virtual machine -> amdemo-vm, where we put access level and assignment to User, group or service principal.

# Role-Based Access Control (RBAC) Key Characteristics

- Authorization system built on Azure Resource Manager (ARM) which allows you to manage the access to your Azure resources with very high granularity.
- Designed for fine-grained access management of Azure Resources
- Role assignment is a combination of:
  - Role definition - list of permissions(actions that you can take) like create VM, delete SQL, assign permissions, etc.
  - Security principal - user, group, service principal and managed identity and
  - Scope (where we assign those permissions to?)- resource, resource groups, subscription, management group
- Scopes are hierarchical
  - Management Groups > Subscriptions > Resource Groups > Resources
    If you assign a role on a management group level it will affect all the subscriptions, resource groups and resources
- Built-in and Custom roles are supported (Microsoft provides you with very long list of already available roles in Azure you can use those to manage the access for your Azure resources, but if you will be doing a lot of operations, a lot of automations you might find those built-in roles might not suit your needs, might not cover all of the corner cases - in this case Azure allows you to create a custom roles, so define your own collections of actions and then assign those as a regular role in Azure and it works anywhere across Azure the same way. So you can either use built-in or a custom roles )
