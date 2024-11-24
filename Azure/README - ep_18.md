# Azure DevOps Solutions | Azure DevOps, DevTest Labs

DevOps is a set of practices that combine both development(Dev) and operations(Ops). It is a set of practices that combine both development and operations.

DevOps it is a interaction model between Developers who write the code and developers who hosting the code, send the code to production, who does server management, network management etc. When code is written and to make sure that the code works on customer's devices without laging, baging and delays. You need to take into account a lot of factors. Before DevOps there were occasions when code is written but something not working or working not as planned on customer's devices.

DevOps aims to shorten the development life cycle by providing continuous integration and delivery (CI/CD) capabilities while ensuring high quality of deliverables. DevOps goal is to shorten the development lifecycle by providing customers with set of tools for continuous integration and continuous delivery (CI/CD) of their software ensuring high quality of their deliverables. Deliver faster while ensuring high quality.

# Azure DevOps (pic 101)

Key features that Azure DevOps service delivers:

- Boards, this feature allows customers to track their work, track the progress across the team members but also manage all the deliverables, all the work status , all the features and user stores for the project in a single place.
- Additionally you have Repos, Repos allow you to manage code repositories and code versioning for yuor project and their deliverables.
- Pipelines, which allows to create automated builds and automated deployment processes for your code and your application across multiple environments
- Artifacts, which allows to create hosts, share packages with your team. You can also add the artifacts that you created to your CI/CD pipeline with a single click, etc.
- Test Plans, which allows you to track your testing progress with manual and exploratory testing tools.

All of those features above are combined into Azure DevOps. Also, there are over a thousand other feature additions in marketplace for Azure DevOps, so you can extend the basic functionalities and customize everything to your needs.

Key Characteristics:

- Collection of services for building solutions using DevOps practices. Collection of services that help customers build solutions with use of DevOps practices.
- Provide services:
  - Boards - tracking and managing your work on the project
  - Pipelines - building CI/CD workflows (build, test and deploy apps)
  - Repos - code collaboration and versioning with Git. To manage and collaborate on your code
  - Test Plans - manual and exploratory testing. Manage your tests and exploratory testing or manual testing.
  - Artifacts - manage all the project deliverables
- Extensible with Marketplace - over 1000 of available apps. If there is anything missing just go to marketplace and extend the functionalities of Azure DevOps.
- Evelved from TFS (Team Foundation Server), through VSTS (Visual Studio Team Services). DevOps oroginally was called TFS (Team Foundation Server On-Premises) then moved to cloud where it was called VSTS (Visual Studio Team Services). And now it is called Azure DevOps.

# Azure DevTest Labs (pic 102)

This service is a little bit similar to Azure Machine Learning service. Because it is all about providing a workspace for the users within Azure. So users connect to DevTest Labs and they are able to provision/supply virtual machines and in a simple terms this is what this service is all about.
Users like developers and testers coming to Azure DevTest Labs where they create VMs by choosing an Image for their operating system, the base Image. Then they additionally install some artifacts --> like Visual Studio or 7-ZIP or GIT. And they can do this configuration for every single VM that they create. And you can choose any artifacts they want and any operating systems.

DevTest Labs aims to provide users with the ability to create VMs at will. So they can very quickly test things, develop things and destroy them as soon as they don't need it. And they provide it within a single, concise workspace in Azure. But in order to control the cost and control your organizational resources admins can come to Azure DevTest Labs and provide set of policies like which operating system images can be used, what kind of sizes of VMs are available, what kind of quotas each user has. So how many VMs can each user provision/supply. Of course all of this is to be cost effective while still providing great flexibility for developers and testers.

# How to use DevTest Labs

- Create DevTest Labs service
- Go to that just created service
  When you open just created DevTest Labs service, you will see all the available options for you to manage your DevTest Labs environment.
- Here can create new DevTest Lab environment (here we can creating VM), click on btn --> + Add. (pic 103)
- then you need to choose (in search bar) from the base image, that will be a starting point for the VM. For example, you type in search bar --> Windows 10, because you want Windows 10 VM. And then choose needed Image for operating system.
- Then fill VM form:
  - VM name
  - User name
  - Password
  - Size of VM
  - Artifacts <-- this is most important section, which allows you to install additional tools. For example, you would like to add 7-ZIP to work on some archives, you can select 7-ZIP and click add. If you want to write some code, you can add Visual Studio and click add. The same way you can add any additional tools to your VM.
  - Once you created VM you can click on just created VM. Here we can adjust some details --> auto start, auto shutdown options, create custom image, create formula (reusable template for other team members to start from) etc.
    Also, we can connect to this VM to start using it. Click --> Connect. This will download a new remote desktop connection file.
- Then open that file and insert name and password (that you created during VM creation) to logIn to VM.
- Then It will open VM with all additional tools that you added in Artifacts section. Now you can develop, test, etc.
  When you are done with all the test or development you can close the connection and stop the VM, or let auto shutdown turn it off later on.

Key Characteristics:

- Service sandbox environment for developers/testers (PaaS). Allow developers and testers to use VM for testing and development purposes.
- Quick setup of self-managed VMs. Providing the ability to create self-managed VMs very quickly and very effectively.
- Preconfigured templates for VMs.
- Plenty of additional artifacts (tools, apps, custom actions)
- Lab policies (quotas, sizes, auto-shutdowns), this will allow to control the cost of your environments by applying quotas(max storage size), computer size, auto-shutdown policies and many others.
- Share and automate your existing labs via custom images
- Premade plugins/API/tools for CI/CD pipelines automation

Summary:

- Azure DevOps - end to end platform for building CI/CD pipelines, managing our code versioning, tracking and managing the work and all the project deliverables.
- Azure DevTest Labs - cloud-based environments for developers and testers with self-serve environments, reusable templates, cost management and multiple integrations. Azure DevTest Labs is concise workspace where developers and testers create cloud-based environments for testing and development purposes with some cool stuff like reusable templates, cost management policies and multiple integrations.
