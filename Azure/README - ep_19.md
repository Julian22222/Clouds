# Azure Tools | Azure Portal, CLI, PowerShell & Cloud Shell

Here we will learn about the tools that will help us with management of our Azure environments and resources.

# Azure Portal

As a users we simply open browser, type in [portal.azure.com](portal.azure.com) to connect to Azure and manage our Azure resources.

Key Characteristics:

- Public web-based interface for management of Azure platform. It is publicly accessible web interface for management of everything related to Azure platform.
- Designed for self-service. So all the task is easy to do. Most of the things with Azure can be done in Azure Portal.
- Customizable. You can create your own dashboards to get a quick glance at your Azure resources and their statuses.
- Simple tasks.

# Azure PowerShell (pic 104)

This tool that allows to automate stuff in Azure. Besides the classic approach of using browser and accessing Azure through Azure Portal. You can also access Azure through a terminal. So this works --> Windows, Linux and macOS. You just need to install PowerShell modules and you will be able to connect to Azure. To work with Azure resources through a command terminal. This is one of the ways of managing Azure resources in an imperative way.

This Azure PowerShell can be installed through:

1. VS Code extensions --> Azure PowerShell Tools,
2. or put in terminal

```C#
sudo apt-get update
sudo apt-get install -y powershell
```

Key Characteristics:

- PowerShell and module. PowerShell is simply a module that Microsoft created for a popular PowerShell scripting language.
- Designed for automation. Helps with automation tasks when it comes to Azure. With this module and PowerShell language you can create very complex logic using scripts.
- Multi-platform with PowerShell Core. Now we can use PowerShell in any operating system -> Windows, Linux or macOS.
- Simple to use. The module is simple to use. For example: you can type
  - Connect-AzAccount - script to LogIn into Azure
  - Get-AzResourceGroup - script to list all available resource groups in your Azure subscription
  - New-AzResourceGroup - script to create new resource group
  - New-AzVm - to create new VM

So using those commands and very powerful scripting language which is PowerShell, you can create almost any automation tasks in no time. You can then grab those scripts and either automate them in Azure or in a tool like Azure DevOps.
PowerShell in general is a very native approach for IT professionals who are working with Windows servers in the past. But if your background is more on the Linux side you might prefer to use Azure CLI instead.

# Azure CLI (Command Line Interface) (pic 104)

Just like PowerShell you will use terminal to log into Azure and manage Azure resources but instead of installing modules for PowerShell you will install CLI. This is just another way of managing other resources through terminal.

This Azure CLI can be installed through:

1. VS Code extensions --> Azure CLI Tools,
2. or using [https://formulae.brew.sh/](https://formulae.brew.sh/)
3. or put in terminal

```C#
sudo apt-get update
sudo apt-get install -y azure-cli
```

Key Characteristics:

- Command Line Interface for Azure
- Designed for automation just like PowerShell
- Multi-platform (Python) . It is based on Python so you can use it on any operating system
- Simple to use, just like PowerShell. Type:
  - az login - script to log into Azure
  - az group list - will list all resource groups
  - az group create - to create a new resource group
  - az vm create
  - to create new VM
    CLI is just a tool for the native terminal. So depending on which operating system terminal you are using you will have different scripting capabilities.
- Native OS terminal scripting

In general you can use either PowerShell or CLI to perform most of the tasks when it comes to Azure. It is just a matter of preference. Microsoft wanted to provide you with tool kit. So that you can use your existing skills whether you are coming from Windows or more unix-based environments and integrate with Azure in no time.

# Azure Cloud Shell (pic 105)

Everything that we talked about in this episode 19 is happening on user machine. So users need to either use their own browsers or they need to install tools like PowerShell or Azure CLI Tools (in VS Code extensions) to perform automations with azure. But there are many scenarios where you simply won't be able to install those tools locally (Azure PowerShell and Azure CLI) or you don't have access to user machine on a specific time. Microsoft wanted to solve those challenges by providing you with another environment. Where all the tools will be pre-installed for you and will always be up to date. This extra environment is called --> Cloud Shell. You can access Cloud Shell through many interfaces for example through a Web browser by navigating to [Shell.Azure.com](Shell.Azure.com).

There are a lot of great things about Cloud Shell environment, for example it is based on Ubuntu container. You get a lot of additional tools that come with Linux natively. You can use both PowerShell and CLI depending on which do you prefer. And this environment is competely Free, so you can perform your day-to-day operations directly from the browser without the need to install a single tool on your local machine. Azure Cloud Shell also comes with a lot of interfaces to use. You can use it from dedicated shell.azure.com portal, you can also use portal.azure.com with a small integration directly in Azure portal or if you are on the go and you don't have access to your machine or you don't want to open this you can use mobile application which has a native integration with Cloud Shell

# How to use Cloud Shell (pic 106)

- go to [portal.azure.com](portal.azure.com). it is one of interfaces to use Cloud Shell.
- on the main portal page click --> Cloud Shell btn, it will open new cloud session.
- Then choose Bash with CLI or PowerShell, automatically Azure use Bash. But if you want you can easily switch to PowerShell. (btn located on top left corner in the Cloud Shell window)
- Once this session is established. You are logged In to your Azure environment. And you can write any commands to interact with Azure services. Few examples below:

```C#
//this command will list all the resource groups available in your Azure Subscription
az group list -o table

//this command will create new Azure resource group,
//by adding parameters like name to provide resource group name --> (--name az-900cli)
//--location <-- providing Azure region where resource group will be located (--location northeurope)
az group create --name az-900cli --location northeurope

//this command will create new VM
// --name amdemo  <-- provide the parameter name for the name of VM
// --resource-group  <-- provide the name of resource group where this machine will be located
// --image  <-- specify the base Image for out VM
// --generate-ssh-keys  <--with generate SSH keys parameter you will be able to connect to this VM using SSH keys in no time
// --location northeurope  <-- provide the region where this VM will be created
az vm create --name amdemo --resource-group az-900cli --image UbuntuLTS --generate-ssh-keys --location northeurope

//to connect to VM, or to check that this just created VM works by using built-in ssh functionallity of Azure Cloud Shell, we type-->
//yourUserName <-- your user name in Azure
//publickIpAddress <-- you can find in bash, when create VM
ssh yourUserName@publickIpAddress

//close the session
exit

//and many other comands are available
```

Key Characteristics:

- Cloud-based scripting environment
- Completely free to use
- Supports both Azure PowerShell and Azure CLI. Clud Shell allows us to use both PowerShell and Azure CLI in our browsers to connect to Azure and manage resources.
- It has a lot of additional tools installed, because it is based on Ubuntu machine
- Multiple/ a lot of client interfaces:
  - Azure Portal integration (portal.azure.com)
  - Shell Portal (shell.azure.com)
  - Visual Studio Code Extension (can connect to Cloud Shell directly from VS Code)
  - Windows Terminal
  - Azure mobile App
  - Microsoft Docs integration (you can use Cloud Shell directly in Microsoft documentation when you are learning, you can try it from docs)

Summary:

- Azure Portal - Web based portal for self-service management of Azure platform. Azure Portal is our web-based interface for managing Azure platform.
- Azure CLI - automation module for terminal. It is automation tools for managing Azure resources through a terminal.
- Azure PowerShell - automation module for PowerShell. If you want to create sripting using powershell we can simply install Azure module and use PowerShell instead.
- Azure Cloud Shell - free cloud-based scripting environment. It is cloud environment for scripting to perform our day-to-day operations without a need to install anything on our local machines.
