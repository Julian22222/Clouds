# Azure Key Vault | Secret , Key and Certificate Management ![logo35](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo35.jpg)

Key Vault is one of the best services in Azure when it comes to storing our secure information for our applications

![pic144](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic144.jpg)

1. One of the most common scenarios that we see in Azure is building infrastructure, so creating those VM (virtual machines) and disks. Those disks will typically both operating system information but also your application data. And all of our information on the disk needs to be encrypted so that if someone would get a hand of our disk they would not be able to decrypt the information and see what was on the drive. Typically this is done by providing an encription key by default Azure comes with a platform manage keys. So all disks in Azure are encrypted by default but as a customers we can provide our own keys to encrypt but also decrypt Virtual Machine drives. And these are called encryption keys, those keys can be stored, using Azure Key Vault. The Azure Key Vault is our secure storage for disk encryption keys in Azure.(see pic above)

2. But it's not the only scenario that Azure keyword can help you with. For example if you have a Web application and you connect to your SQL database. Those Web applications will need to store connectivity information in their configuration like a server, address, username and a password. This kind of information is typically called application secrets and Azure Key Vault can again help us with storing and secure management of those secrets for our applications. There is plenty of additional SDK's so it's very easy to integrate your existing applications with azure Key Vault. A lot of Azure solutions also allow you to implement integration of Key Vault without writing a single line of code.(see pic above)

3. And lastly if your Web applications are serving content to your users in a secure way over HTTPS so over encrypted channel through the internet. You can create a specific files called certificates. Certificates are a compex objects for cryptography so they are used to encrypt the traffic as it goes from your Web server to your users. But certificates can also be used to provide a secure communocation and authentication channel across multiple services. But those 2 are just examples. In reality there is plenty of other scenarios where certificates can be used and if you need secure storage for those certificates, you can use Azure Key Vault.(see pic above)

Azure Key Vault - it is a secure storage for your application keys, secrets and certificates.

# How to use Key Vault

1. Go to Azure Portal
2. Search for a Key Vault
3. press + Create
4. fill form:
   - Subscription
   - Resource Group
   - Key Vault name
   - Region
   - Pricing tier
   - Days to retain deleted vaults: (choose after how many days you need to change keys) --> 7 or 90 days
   - Pure protection

When you open Azure Key Vault you will see your Key Vault Panel to manage everything related to Key Vault and your application keys, secrets and certificates.

Most important things are on the left hand side in the panel. The Panel called - Objects. Where you can find keys,secrets, certificates - this 3 allow to manage that we mentioned above. (see picture below).
But Access policies allows you to manage the access and what kind of permissions users or applications will have to manage keys, secrets and certificates.

![pic145](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic145.jpg)

Then you can navigate to Secrets and create a new secret and then retrieve that secret from another service called - Azure Logic app. To show how easy it is to integrate with Azure Key Vault from external service.

To generate new secret

- in secret section panel we click -> + Generate/Import button to create new secret.

![pic146](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic146.jpg)

- then fill the form, (name of the secret, value of the secret, and rest can be blank). - Also, here you can - set an activation date --> which will allow you to make this secret only active from a certain time and date.
- Or you can set expiration date --> to make the secret invalid after certain date and time.

But if you don't want to, you can just leave it as enabled, and press create button in the bottom of the form.

![pic147](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic147.jpg)

When the secret is created, we can open this and will see - CURRENT VERSION. Each secret will have ots own version. When you change the secret -> you create new version. All the version history and all the changes for your secrets are maintained in Azure Key Vault. (see pic below).

![pic148](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic148.jpg)

When you open the curennt version you can see the secret identifier - which is the URL to your secret, you can review some details or just click on - show secret value to see what is the current version of that secret.(see pic below)

![pic149](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic149.jpg)

# How to use Key Vault secrets from external application

How we can retrieve this secret from an external application. To do that you need to create Azure logic app, there we can use multiple connectors.

- Create and Open just created Azure Logic app ![logo22](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo22.jpg) and start from a common trigger. In this case let's use recurrence trigger.

![pic150](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic150.jpg)

- In this case we want this logic app to run every couple of hours and then connect to your external servers which is Azure Key Vault (click + New step)

![pic151](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic151.jpg)

- To use Key Vault you need to Choose an operation an search for a Key Vault.
  Then you find a connector for Azure Key Vault. There is plenty of Actions that you can take with Azure Key Vault. And one of the Key Vault options in the list is called --> Get secret (Azure Key Vault).
- Then you need establish a new connection to Azure Key Vault by providing a Key Vault name (add Key Vault name from Key Vault app that we created before) and click Sign in.

This will allow you to sign In using your account or service principle in Azure.

- Then you need to choose the secret that you want to use from the list (that we just created in Key Vault secrets) and hit Save button.

If you want to confirm that runs and working correctly. --> Select Run. and you can see you secret value.

![pic152](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic152.jpg)

Most of Azure Services have native integration with Azure Key Vault so you don't have to run a single line of code. Or if you are building applications thta require you to write code, let's say - Web applications, Azure functions there is plenty of SDK's available for you to make this integration very easy.

Azure Key Vault Characteristics:

- Managed service for securing sensitive information (for building application/ platform management) (it is PaaS)
- It is designed to a scure storage service for:
  - Keys (encryption keys),
  - Secrets,
  - Certificates
- Highly integrated with other Azure services (VMs, Logic Apps, Data Factory, Web Apps, etc.). All of these services provide a lot of ways to connect Azure Key Vault and manage your application information in a secure manner.
- Centralization (If you use Azure Key Vault then multiple services can store their application secrets in a single place. If Logic app and Data Factory want to connect to the same SQL Server, they can use Azure Key Vault to store thSe connectivity information in there. For example: If you want to change that password you just change it in Azure Key Vault and then Logic app and Data Factory will use your updated password. Centralization part is really important when it comes to operations, especially in large applications in Azure).
- Access monitoring and logging.
  Everything in Azure Key Vault is very heavily monitored, so we can see who accessed what and when.
