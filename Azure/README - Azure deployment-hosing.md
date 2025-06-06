# Azure Services to use to deploy your App.-->

[YouTube How to Deploy to Azure](https://www.youtube.com/watch?v=EKqXAMLsnKQ&list=PLR-Buy35u4SH0lmQhmlpf2gnX5TxCjUNH&index=13)

[Microsoft Azure](https://portal.azure.com/#home)

1. Subscriptions (Azure subscription) // each Project should go under separate Subscription, it will ease to find more datails regarding each Project (such as biling of each Project and etc.)

- What package you use and how mach you pay for using Azure services

2. Resource group (Create new Resource Group for each project)

- works as a bag where we put all used, needed services for our app in 1 Resource group. (App Services, SQL databases,SQL server,Key Vault, Log Analytics workspace, App Service Plan) <-- all of them must be in the same Resource group for particular applicatiopn

3. App Services

- allow you build and deploy/host your app (web apps, mobile back end and RESTful APIs without managing infrastructure).
- It offers auto-scaling and high availability, supports both Windows and Linux
- When creating new app services --> create Web App ( Not a Web App + Database)
- Supports many languages
  [App Services Video ](https://www.youtube.com/watch?v=4BwyqmRTrx8&t=363s)

How to know should you host you app on --> App Services or use Virtual machines, Bullet points for App Services below, to host your application on App Services:

- don't require full controll
- don't need high performance computr workload
- don't need microservices
- if you migrating and don't need high performance workload
- if you migrating and don't need containers and it is web or API application

4. SQL server

- allow to create Server name, Server user ID (In Azure Portal --> Server admin login) and Server Password

5. SQL databases

- allow to get the connection string to DB

6. Key Vault [How to use Key Vault for your secrets](https://www.youtube.com/watch?v=ZXfuxisC0IA&t=1s)

- Creates KeyVaultURL <--copy - paste it to - to use in appsettings.json and in Program.cs for Our secrets /// (Vault URL <- in Key Vault)
- KeyVault Client Secret value expires after some time --> will not connect to your Database , Need to Renew Client Secret for KeyVault in Microsoft Azure/ to Update --> Azure/App registrations/All applications --> choose your project name --> Certificates & secrets --> Create new Client Secret value here
- Located in Azure cloud, this is Azure service where we can store Secrets
- help to keep secrets that are encreapted,
- Here we insert our Secrets (Connection String etc.)
- To work with Key Vault in ASP.NET MVC Core we neeed few nuget packages
  dotnet add package (PackageName)

      1. Azure.Identity
      2. Azure.Security.KeyVault.Secrets
      3. Microsoft.Extensions.Configuration.AzureKeyVault

7. App registrations

- We register our application that Azure Id and Key Vault, all know that we have an application that what to grab these things and they are goood to go and authorised

- Creates ClientId, DirectoryID, ClientSecret(Secret value) <-- copy - paste it to use in appsettings.json and in Program.cs for Our secrets

# Debug or find an Error when your project is hosted on Azure Portal

1. [Azure LogIn](https://azure.microsoft.com/en-gb/get-started/azure-portal)
2. Click on App Services of the project that you want to debug
3. Diagnose and solve problems (Left menu column)
4. Click on --> Application Logs (bottom of the page)
