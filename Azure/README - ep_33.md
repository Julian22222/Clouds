# Cloud Adoption Framework for Azure

This is one of the most important processes when starting with the Cloud which is Cloud Adoption.

Here we will talk about Cloud Adoption Framework in the context of Azure platform.

##### Cloud adoption - is a strategic move by an organization to use, leverage cloud in their business.

Cloud has a lot of things to offer to accelerate your business and allow you to innovate and build solutions faster. Therefore provide more value to your customers.

##### Cloud Adoption Framework for Azure is a set of tools, best practices, guidelines and documentation created by Microsoft, to help companies with this journey.

This framework is what we will be focusing in this episode. In this episode will contain very compressed and short paragraph to show Cloud Adoption overview to you.

Cloud Adoption Framework is divided into stages:

![pic209](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic209.jpg)

# first stage is called - STRATEGY

It is simply building organizational alignment of moving to the cloud to begin the cloud adoption.
The first step in the STRATEGY is called - Motivations. During this step you want to answer the question - WHY MOVE? As such you want to meet with your key stakeholders and executives in your company to document what are the motivations behind the Cloud Adoption. And to do that you need to understand, what are your motivation triggers.

1. The most common motivation triggers are either MIGRATION triggers. So moving your current infrastructure to the cloud so you can gain some cost savings, you can reduce the complexity of your current infrastructure, maybe you want to optimize your current operations or increase business agility by having more flexible approach to managing infrastructure.

Another motivation trigger is called - INNOVATION. In this category you want to leverage the cloud and its features to provide some improvements to your company. For example reaching a global scale or improving customer experience, maybe you want to disrupt new markets or create new products and services. All of those are easier to do if you start using the cloud with all of its features.

Of course it is up to you to decide which kind of features would be useful to you, your products and your customers.

Once we understand why to move, we go to next thing that you need to do

![pic210](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic210.jpg)

2. Business Outcomes. here you want to answer the question - WHAT TO MEASURE? What would be your criteria of success that would support your move to the cloud? And this measure has to be a define concise observable outcome for your company. Typical things might include an increase in revenue and profit or a cost reduction or maybe something more business oriented - like having a global access and reaching new markets. But it is important that this measure can be calculated and can be observed so that you can define it and track it. In this process you will want to meet with your business leaders, from the finance, IT infrastructure and application groups.

When we know what to measure and why do we moved to the Cloud, next thing that you need to do

![pic211](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic211.jpg)

3. Business Justification. During this step we need to understand - WHAT IS MY RETURN OF INVESTMENT? Because your company is there to make money and it is important to track it and this is what this step is all about. As part of the business justification you will want to develop a business case that will create a financial model that supports both MOTIVATIONS and the OUTCOMES. So this business justification will use the input from the 2 previous steps. There are many tools provided by Microsoft that supports you in the process of building this financial model.

For example a person like a Chief or Financial Officer in your company might want to use Azure TCO which stands for TOTAL COST OF OWNERSHIP CALCULATOR. To calculate the cost of your current ON-PREMISES infrastructure with Azure pricing calculator you can estimate the monthly cost of Azure infrastructure. And once you start deploying things to Azure, Azure cost management will give you a full visibility on existing resources and their cost those free tools that you see here will be covered in more detail in future episodes.

Remember these are the Key elements, used in the business justification phase.

![pic212](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic212.jpg)

And lastly as part of the STRATEGY we want to decide on the FIRST PROJECT. This first project will help you align your motivations and technical efforts and to choose the right first project you need to follow 2 criterias:

- First criteria is called - Business Criteria. In here you want to find a project that is first of all currently operating. So the project that is constantly working your company and has dedicated owner. But this is very important that this owner and this application has a strong motivation to move to the cloud because it sees its benefits. This is important because the engagement of the owner will be very important across every single step of the process. And additionally there are technical criteria you want to find a project that has minimum amount of dependencies and assets. This is because if you choose a project that is too big it will take you too long to validate your strategy.

In Summary our first stage - STRATEGY, is about defining business justification and the outcomes. Once the stage is completed we move to the Planning PHASE.

# Planning PHASE.

In the Planning PHASE there are again, few steps we need to follow.

![pic213](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic213.jpg)

1. First step is DIGITAL ESTATE. This is called inventory of assets. You want to review what you currently have in your company. And what you should do with it and that decision that rationalization is called - DECIDED based on this 5 "R" of RATIONALIZATION RULE.

- So for each digital asset that you will find in your company you want to assign one -> R. First we have Rehost. Rehost means that we take existing application and we move it to the cloud without any changes. This typically means move existing applications into infrastructure as a service. So deploy this into Virtual Machine or a Container.

- Another - R is for Refactor. So you want to make a small changes to your existing application code base in order to fit it into existing Platform as a Service (PAAS) offerings in Azure. For example, if you have a web application running on a Virtual Machine and in this web application uses SQL Server, maybe with a little bit changes in your code you can fit it to Azure App Service and Azure SQL to take advantage of the Platform as a Service (PAAS) offering in Azure.

- Another option is called R-for Rearchitect. For the Rearchitect you will need complex changes to your code base. This is used if you want to introduce new services in your application. For example: you might see that a key vault is very good service in Azure and you want to introduce it in your application. Therefore you might want to Rearchitect existing ones to take advantage of those security services in Azure. But another reason for Rearchitecture is when your application strongly depends on the physical infrastructure in your company. So it is incompatible with the Cloud. So in short, you use Rearchitect to implement new features or fix incompatible applications.

- Another is Rebuild. For this rationale we create applications from scratch, this could be also called new. So we look at existing application, we see that effort of introducing this in the cloud is too big or maybe the code is too old and we decide to Rebuild this from scratch. To take full advantage of what cloud has to offer.

- And the last one is called - Replace. You want to look at every single application that you have and see what cloud has to offer already. Maybe not only Azure but Office 365 has a lot of software as a service offerings. Maybe there is offering that completely replaces the functionality that your current application provides. In which case you might want to drop the current application and take the Software as a Service (SAAS) offering.

So basically in your company go through every project that you have, assign one of those - "R" for every project that you can and then create a plan out of this.

Next step is INITIAL ORGANIZATION ALIGNMENT, During this when the plan is being established you want to meet with the key stakeholders in your organization to make sure that everyone is aligned and every key person supports this adoption plan. During this step the alignment of people who will make this plan a reality is very important. It is also a step, where you map your people to the capabilities. So you know who should be engaged when.

And once your organization is aligned you will create SKILLS READINESS PLAN. During this stage you want to review your current skill sets in your company and create a plan that will address the gaps. Because in the Cloud you will need to have a lot of new skills in your company across different teams and different people and this plan will take care of that.

And once you do all those things, simply put it into called CLOUD ADOPTION PLAN. This plan will be used to manage the change across your digital estate, skills and the organization and the processes.

To Summarize in the PLANNING STAGE we want to create actionable plan for our Cloud Adoption. From there we move to the next stage,called - READY.

# READY.

![pic214](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic214.jpg)

Readiness stage is all about preparing your first Azure environment. To do that you start with Azure setup guide. So you read Azure documentation on how the initial environment should look like, you want to become familiar with the tools and approaches that will help you create this first Azure environment. Also, at this stage you will want to choose which type of Azure Subscription should you use and which is the best for your company. And once you have everything prepared you start creating you first Azure environment, this is called- Azure Landing Zone. This will be your first Azure environment, it will be completely created out of Microsoft guidelines and it will allow you to set up a code based for future improvements. An advice here is to use infrastructure as a code approach so that everything can be later changed, expanded, updated. But everything will be consistent and very easy to redeploy if needed. And once the Landing Zone is created you want to extend it even further, to match your organizational needs and allow for the smooth Cloud transition. One important thing is that this will be shown across this entire process and a lot of places in cloud adoption framework is. As you go through those stages always check the best practices. You just want to be sure that this Initial Landing Zone and the Expansion goes according to the best practices. Because later on it's very hard change things if you will create bad platform architecture.

To summarize the READY STAGE. We want to prepare Azure environment since we have the plan to adopt the Cloud our next step is ADOPT.

All our previous stages were preparing us to move to the Cloud. Adopt is where we start doing that.

# Adoption

![pic215](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic215.jpg)

Adoption has few steps but Adoption splits into 2 separate streams. One is called MIGRATE. When we were talking about motivations one of the most common motivation triggers was MIGRATIONS. And this is why ADOPTION is also split into MIGRATIONS and INOVATIONS.

The first step that you want to do in this stage, is do your firts migration. During this step you want to migrate your first project to the Cloud. This is so that you can read all the guides that Microsoft prepare for the migration paths, you want to familiarize yourself with the native tools and approaches in Azure that will help you to do that migration. But important part here is not the migration but also the learning curve. Because after this first migration you need to familiarize yourself with migration scenarios. When moving to the Cloud you will see that there is plenty of different scenarios, different workload that need to migrated. For example, migrating Virtual Machines is completely different from migrating data services or maybe Web applications. Microsoft has plenty guides that are available for you to use during this process. So you need to familiarize yourself with those and prepare migration scenarios for your own company. Just like with previous step, remember to check best practices. Because migrating is one thing but setting everything up is another. So make sure that your architectural decision will follow the best practices for each tool that you decided to use in the tool chain. Because all those tools and decisions that you make, will accelerate other migrations in your own company that is why so important.

And lastly, remember about process improvements. Migration is very process heavy activity, so it will take a very long time to migrate everything to the Cloud. Therefore being able to evaluate, how your current migration is going?, what are the things that should be improved? is very important aspect of this process.

![pic216](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic216.jpg)

And besides migration you also have Innovation. In the Innovation part of the Adoption process you want to make so called - Business Value Consensus. So it is a decision that you need to make on a technical solution and identify a hypothetical customer need and map it to a business value that you can provide by building this solution. And then match it and map that value to your Cloud strategy. Once you map this value to a strategy, the next part is the Innovation guide. In the Innovation guide you will decide on the tools that are available in the Cloud to accelerate development of this solution and build this minimum valuable product - MVP. Similarly to migration remember about best practices because your architectural decisions should follow them because they will be your solid foundation for the other applications. Again similarly to migration, remember about process improvements. you want to go through each iteration where you create this application to make that your customers and your teams provide feedback. In Auzre there is a lot of tools, like Azure DevOps or GitHub, Which help you wit these processes.

![pic217](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic217.jpg)

In Summary ADOPT Stage is about implementing existing plan and either migrating or innovating or maybe both. One thing that I want to note here is that those 3 Stages plan - Plan, Ready and Adopt are the key stages that define Cloud Adoption according to cloud Adoption framework.

What are the 3 main stages that the Cloud Adoption helps with? Are these 3 Stages -> Plan, Ready and Adopt. Because all of the other stages that we will be talking about are the supporting processes and supporting stages for this entire framework.

The next 2 processes that we need to talk about are governance and management, and those processes span across all those 3 stages. Because regardless of what is your current stage you need to start to govern and manage your environment from the earliest stages until the very end.

![pic218](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic218.jpg)

For the governance and management part, there are 2 main things you need to do. First of all you need to define what are the governance solutions. But for the solutions here remember about 3 important things. First of all the solutions that you decide needs to meet your business needs but at the same time they need to provide the agility. So you can easily adopt the Cloud, you don't want to constrain yourself but while providing the agility, the most important part here is you need to control the risks. So you need to make sure that your environment will stay compliant and stay secure at all times. And oce the solutions are defined and the platform is ready you can hand it over to Cloud operations. Whose responsibilities are to provide the stability and manage the cost of the platform. This is very important because those 2 needs to work together because you want your environment to be stable but also you want to control the cost because you want to meet your business commitments as part of your financial model.

In Summary.

Governance is about making sure that your environments stay compliant. it will be controlled and secure.

Whereas management is about ongoing operation and optimizations of your current environment.

![pic217](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic217.jpg)

But I want to talk about one more thing here, which is called- Organize. It is a stage per say but it is an alignment that needs to go across this entire process. So you need to be sure that across this entire process people will have assigned roles and responsibilities. This is because this entire Cloud adoption framework will involve a lot of people, a lot of stakeholders, a lot of teams. So you need to make sure that everyone knows what to do. One of the ways to achive that is to create this RICI matrix. Which stands for - Responsible Accountable Consulted and Informed. So that every team knows what to do and when during this entire process.

In documentation for Cloud Adoption Framework read below.

[Cloud Adoption Framework1](https://learn.microsoft.com/en-us/training/modules/cloud-adoption-framework/?WT.mc_id=AZ-MVP-5003556)

[Cloud Adoption Framework2](https://azure.microsoft.com/en-us/solutions/azure-essentials/cloud-adoption-framework/?WT.mc_id=AZ-MVP-5003556)

[Cloud Adoption Framework3](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/?WT.mc_id=AZ-MVP-5003556)

# Key Characteristics

- Cloud adoption framework (CAF) for azure is a set of tools, best practices, guidelines and documentation prepared by Microsoft to help customers with Cloud Adoption process in the context of Azure platform.

This framework is divided into multiple stages

- Stages:
  - Strategy - understand why move to the Cloud and how to provide business value from that move. Then you go to next stage.
  - Plan - prepare actionable plan based on current digital assets and supporting current strategy. Then go to next stage
  - Ready - prepare and align users, processes and environment (Azure landing zone). Thne go to next stage.
  - Adopt - start move (migrate/innovate) based on the plan (implement the plan)
  - Govern - align compliance and security standards and tools
  - Manage - manage, monitor and optimize environment when it comes to stability but also cost
- Organize - ensure everyone knows waht to do and when (RACI matrix).

Documentation and communication of every stage is crucial requirement for the process. So make sure that as you move along everyone knows what to do and everything is very well documented.

Living document - (Microsoft documentation for Cloud Adoption framework is a living document). That means it will be constantly changing, therefore if you are going through the Cloud Adoption process in your company at every stage, every now and then make sure to go back there and check if anyting has been changed. Most of the time the changes are not because something was bad, but because there were new good practices that were found or maybe new tools that will support you even further. it is only advantages for you to check it.
