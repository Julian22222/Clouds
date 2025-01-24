# Azure Identity Services | Authentication, Authorization & Active Directory (AD)

Identity and access management

# Identity

In general means a fact of being something or someone. For example our user accounts are considered Identity. So when we log In to Azure Portal we use our own Identities and we typically identify ourselves using -> username and passwords. But Identity can also mean an application or server which will identify itself with a secret key or certificate. And the process of verification of that identity is called - Authentication.

# Authentication

So if user connects to your server presented himself with username, for instance - Tom. Authentication server will require Tom to present some sort of Authentication factor,like a Password. Only then Tom session will be established and the Identity will be verified. Whenever we logged into Azure Portal we need to present our own credentials, this is the process of authentication.
But once the identity is verified there is another process called -> Authorization.

# Authorization

When Tom will try to access one of our services, his account will need to be validated. Whether this account was granted an access by resource owner. In this case services can do it on its own or they can contact an external authorization server whether Tom has been granted access to this specific service. This process of ensuring that only authenticated identities get access to resources for which they have been granted access to by the resource owner is called - Authorization. We see that in every aspect of the management for Azure platform.

![pic135](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic135.jpg)

If we go to Azure Resource Group that means we already have access to view that Resource Group. If we try to create or delete resource group or any service within that Resource Group that means we have been granted access to do so. And this process of checking that is called - Authorization.

# Access Management

All of that things/processes like controlling, verifying, tracking and managing access to authorized users and applications is called Access Management.

# Microsoft Entra ID ![logo33](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo33.jpg)

Previous service --> Azure Active Directory (Azure AD) is now Microsoft Entra ID

![pic136](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic136.jpg)

Everything that we did so far in Azure Portal when we as a users were connecting to Azure and managing our Subscriptions, our Resources like VMs, Databases and Resource Groups went through Microsoft Entra ID. So not only Microsoft Entra ID is storing our Azure accounts but also is granting permissions to access Azure Resources and it governs/control all the access to those specific resources. Also Microsoft Entra ID doesn't only work with Azure platform. If you are using one of the live.com services like -> SKYPE, OUTLOOK, ONEDRIVE. Again your user account on live.com is also stored in Microsoft Entra ID and also Microsoft Entra ID governing/controlling access to those services. If you are using your organizational resources like -> ONEDRIVE for business, SHAREPOINT, POWERBI, TEAMS or any other product from Office 365 platform again you are going through Azure AD. Microsoft Entra ID manages your users groups, licenses and access to those services. Also, you can extend your own applications with authentication and authorization features of Microsoft Entra ID.

Microsoft Entra ID is quite powerful service

# How to use Azure Active Directory (Azure AD) --> now it is Microsoft Entra ID

There are multiple ways how you can access Microsoft Entra ID.

- Go to Microsoft Entra ID ( in this panel you can manage everything related to Azure Active Directory and my Azure Identities)

![pic137](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic137.jpg)

In order to manage Microsoft Entra ID you need to have a Global administrator (step 1 on the picture), You can check that in the Microsoft Entra ID panel. Only then you will be able to manage every aspect of it.

On the left side menu you have a lot of blades that allow you to manage most important things when it comes to Identities. For example: Users and Groups <- will allow you to create new Users and Groups (step 2 on the picture).

### Create new User Identity

![pic138](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic138.jpg)

- Let's create new User Identity, Click on Users and then click -> + New user (to create new user)
- Fill new User Identity form: (see picture above)
  - User name <- which is our login and + add the domain (here you can use custom domain as well), it is work email / user name for Azure Portal
  - Name <-- Display name (this name that will be displayed everywhere else in Azure Portal especially when we search for the specific user)
  - Password (we can either auto generate or create yourself). Pasword to LogIn to Azure Portal
- Then press --> Create

And our new User Identity has been created --> It will show on Microsoft Entra ID panel. We can prove that this Identity works by LogIn to Azure Portal.

### Create new Group

- Go to Groups
- Press --> + New group (to create new group)
- Fill new Group form:
  - Group type --> (choose Security)
  - Group name
  - Members <-- Here you can assign members to this Group
- Then hit --> Create

This just created group can be assign to Role assignment --> in IAM (in Resource Group) --> step

### Where to use just created Users and Groups

![pic139](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic139.jpg)

![pic139a](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic139a.jpg)

- When you have created User Identity (through Microsoft Entra ID) or a Group you can go to specific Resource Group (where you want to manage some user accesability) and on the left side menu click --> Access control (IAM) (step 1 on the picture).
- Then click --> + Add. It is step 2 on the picture (to add role assignment for this resource group, step 3 on the picture).
- Then give an access/assign a Role (example: Owner (full administrative access to this Resource Group), reader, contributor, etc.) for a new user/ or full Users Group that we just created --> for this specifc Resource Group. It is step 4
- In step 5 you can assign particular user or Group of users for particular Resource Group

- When you have added new User to some certain Resource Group, this Resource group will be shown in that User's Resource Group section. For example if you have added Tom to your Resource Group which is called RG-Test, then Tom will have this RG-Test Resource Group in his Azure Portal account.

Key Characteristics:

- Microsoft Entra ID is our Identity but also also Access Management services in Azure.
- It allows us manage our Identities, things like --> users, groups and applications
- Access management for our Azure Resources --> subscriptions, resource groups, roles, role assignments, authentication & authorization settings for our organization, etc.
- It is used by multiple Microsoft cloud platforms: (has centralized system for logIn to any other Microsoft cloud platform)
  - Azure
  - Microsoft 365
  - Office 365
  - Live.com services (Skype, OneDrive,etc.)
- If your organizaion uses Microsoft Entra ID in your On-Premises environment you can use a Sync service that will sync your On-Premise Identities with the Cloud. So you will be able to use the same accounts for both environments which is important for Hybrid Cloud environments and organizations that are starting to move to the Cloud.

# Multi-factor Authentication

Providing username and password is not enough. Servers need more credentials, more authentication factors from their users in order to prove their identity. For example providing a code that was sent to their mobile phones. This type of process is called multi-factor authentication. It is a process of presenting 2 or more pieces of evidence, factors to prove user identity.

Key Characteristics:

- It is a process of authentication using more than 1 factor (evidence) to prove identity.
- There are many factor types that you can use, for example:
  - Knowledge Factor <-- "something you know", example: password, pin
  - Possesion Factor <-- "something you have", example: phone, token, card, key.
  - Physical Characteristic Factor <-- "something you are", example: fingerprint, voice, face, eye iris
  - Location Factor <--"somewhere you are", example GPS location
- Supported by Microsoft Entra ID by default (simple on-off switch)

There are many different Factor types, so Multi-factor Authentication simply means use more than one of those factor types and all of that is supported by --> Microsoft Entra ID
