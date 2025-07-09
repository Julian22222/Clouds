# Azure Blueprints ![logo37](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo37.jpg)

We will talk about Azure governance even further with use of Azure Blueprints if you want to find out how they work.

Azure Blueprints is the last service when it comes to the governance of your Azure environment and in this episode we will be talking about what blueprints are and what are the typical scenarios for using blueprints in your own Azure environments.

A Blueprint - is a guide, pattern or design for making something.

So it could be something as simple as a chair. If you have a blueprint of the chair, you can make as many chairs as you want and you know they will be identical. If you just follow that blueprint and the same principle applies to Azure blueprints.

![pic198](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic198.jpg)

Azure blueprints - it's a service within an Azure that helps to manage your Azure environments consistently.

Let's picture a simple scenario where we are a central governance team and we want to deploy pre-approved environment for building web applications.

To do that in our Azure Subscription the first thing we will need to do is to

1. create a Resource Group, once the Resource Group is created,
2. then we will create - Role Assignments, which will allow your team to manage their Azure Resources and build their own applications.
3. For typical web application you might want to create Resources - like SQL Database and App service for hosting your web application. You might additionally want to pre-configure those services to match your internal requirements when it comes to security and compliance.
4. And lastly if you have some Policies, then you might want to assign those for the specific research group.

Depending on how many of those Role Assignments you need to make, how many resources you need to create and how many Policy assignments you will want to do. You will start seeing that this will grow as your organization grows and more standards will appear and this effort might take some time especially if you will want to replicate this entire environment that you just created in another Subscription or just another Resource Group. You would have to go through all of those steps again and since we are all humans we will make mistakes. To avoid those mistakes your operation teams will start creating scripts but you don't really have to create those scripts because Azure Blueprints is to help with this. You can grab all of those pieces and put it into a single blueprint definition.(see pic below)

![pic199](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic199.jpg)

A Blueprint definition is a collection of Azure components, Role Assignments, Resource Groups, Resources and policy assignments. Allowing you to deploy those with a single press of a button. And when the definition is created, you can then go to your Subscription and create Blueprint Assignment. When you create assignment, Azure will deploy all of the components defined by the Blueprint automatically. And because this is the definition you can apply this as an assignment as many times as you want replicating your environment very easily and technically this is what this service is all about. (see pic below)

![pic200](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic200.jpg)

It's about creating definitions and assigning them and deploying resources and in high level this is what the service is for. When it comes to functionality itself it's about providing you with another tool in Azure to script and automate resource deployment and environment setup and do it in a consistent manner, be able to define essential repository for your pre-approved designs and patterns allowing your teams to create environments fast and in very consistent manner.

# Azure Blueprints in Azure Portal ![logo37](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo37.jpg)

- Search forBlueprints in search bar
- In the Blueprint service. Here you just have BLUEPRINT DEFINITIONS (see pic below- 1) and ASSIGN BLUEPRINTS (see pic below -2) on the left hand side.

![pic201](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic201.jpg)

- We go to Blueprints definitions (1 on the pic below) and create a new blueprint (2 on the pic below)

![pic202](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic202.jpg)

- In this panel you can use samples provided by Microsoft covering most of the clasic and most of the common standards on the market regarding the security and compliance.

![pic203](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic203.jpg)

If we want we can start with a blank blueprint ( see pic above - 1).

- (in this case we will use blank blueprint) Click to start with blank blueprint.
  - Blueprint name: demo-bp ( step 1 on pic below)
  - Definition location, you can specify where this blueprint can be assigned to you. Can either choose a Management Group or specific Subscription (step 2 and 3 on pic below) and hit NEXT

![pic204](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic204.jpg)

- go to artifacts is just another name for Azure components. For this example, we will add an artifact (step 1 on the pic below ) which is a Resource Group (step 2) under our Subscription.

![pic205](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic205.jpg)

- We can give an artifact name or leave it blank and with those check boxes we can either provide the static values or leave the checkbox marked. So that whoever will be assigned the blueprint will need provide this as a value and hit add button (see pic below)

![pic206](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic206.jpg)

This will create Resource Group artifact line ( see pic below -step 1)

![pic207](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic207.jpg)

- Under this Resource Group I want to do 3 things. (press add artifact - see picture above,step 2)
  - First of all I want to do a Role assignment and give someone a - Rader role (see pic, step 3). I want to be able to provide that later on. Therefore I'm leaving this checkbox on. and hit Add (step 4).

This will create --> [User group or application name]; Reader (see pic below, step 1)

![pic208](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic208.jpg)

- Secondly, Additionaly I will always want to apply a TAG to all the resources within this Resource Group. to do that -> press Add artifact (see pic above, step 2)

- In this case Artifact type: Policy assignment and search for - append --> and choose -> Append a tag and its value to resources and hit Add button.

- Thirdly, Then again press - Add artifact and create any kind of Resource, for this example we will create storage account. Fill form->
  - Artifact type: Azure Resource Manager template, then give a name in Artifact display name section, and provide the template or use default values by -> unselecting 2 tickboxes in Parameters section. and hit Done.
- In the end press Save Draft. it is a very important mechanism which allows you to manage versions for your Blueprints. Once the draft is created you can select it and then if you hapy with all info, you can press - Publish blueprint (top pannel ) and give a version - 1.0.
- Then you can assign this blueprint

# Key Characteristics

- Blueprint is a package of various Azure components (which called - artifacts), And those include:
  - Resource Groups
  - ARM Templates (creation if Azure resources)
  - Policy Assignments
  - Role Assignments
- Centralized storage for organizationally approved design patterns

And Service itself was designed to provide you with centralized storage for those approved design patterns by your organization

- Blueprint definition - describes what should happen (reusable package) and it can be parametrized
- Blueprint assignment - describing where it should happen (package deployment)
