# Azure Serverless Computing Services | Azure Functions, Azure Logic Apps, Event Grid

What is zure Serverless Computing Services? and What services in Azure fall under this category?

Serverless computing is cloud-hosted execution environment that allows customers to run their applications in the cloud while completely abstracting underlying infrastracture.

Serverless computing is a way of hosting your applications in the cloud while completely abstracting the infrastructure part. So we are just deploying our applications or using out of the box products available in Azure and let Microsoft scale up and out the infrastructure to match our demand.

# Azure Functions (Function Apps)

We have already talked about Azure functions as part of the compute episode. Let's quickly rewise, because while there are a compute resources, there are also a serverless compute resource.

Azure Functions (Function Apps) (pic 97) - is a service that allows customers to build applications using code. In this case small pieces of code and host those as a Web services. In which case customers create a small pieces of code, package them and send them to the Function Apps. From this point onword this is the serverless part. Because Azure Function app grab your code and deploy this across multiple servers and allow external services to communicate with you application and if necessary scaling up and down depending on your need.

Azure Functions is our serverless coding platform so called function as a service allowing us to build nano-services architecture and event-based application. It also allows for quick scaling up and scaling down. It is highly scalable because in this case you can go up to 200 servers if required. And lastly this service supports most popular languages and frameworks that are used for building web services. That means you don't have to learn any new languages to start using Azure Functions.

Key Characteristics:

- Serverless coding platform (Functions as a Service, FaaS)
- Designer for nano-service architecture and event-based applications
- Scales up and down very quickly
- Highly scalable
- Supports popular languages and frameworks
  - .NET & .NET Core
  - Java
  - Node.js
  - Python
  - PowerShell
  - etc.

# Azure Logic Apps (pic 98)

This service allows you to build workflows using a visual interface. Those workflows can represent both business scenarios but also cross-application integrations. (Numbers on pic 98 represent 1 of 4 options below)
1.So you can build a simple step-by-step workflows or
2.you can do something more complex with conditions,
3.you can do loops if you need to or
4.you can do parallel runs.

All of those scenarios are very easy to implement using Azure Logic Apps.

Additionally each flow can be triggered. For example:
-it can be triggered by a web request.
-Or you can trigger your flows using emails.
-Or triggered them based on office 365 events.
-Or you can trigger them based on what is happening in your Azure subscriptions.
There is over 200 connectors (options to trigger each flow) available to you. So you can trigger your workflows not only based on Microsoft technologies but also other clouds, other software as a service aplications, like Salesforce, SAP and etc.

Additionally all of those 200 connectors allow you to use them within the flow. So you can send web request if you need to you, maybe send an email or save some files to Blob storage or write data to SQL database.

## How to use Logic Apps

- Create --> Logic Apps
- go to just created Logic App service. Where you can either use standard out of the box templates available for Logic Apps or start from the blank application.
- then press Blank Logic app. Or you can use ready templates (pic 99)
- then in the search box (search for connectors) --> we can search for Blob, for example. Because in your scenario when new files added to Blob Storage, or modified in Blob Storage --> it will trigger other processes.

- After Selection of needed connector --> fill form:
  - Connection Name
  - Storage Account
- Once connection has been created, Then you will see pop up window --> now we can select the container, Azure Blob Storage container where our files will be uploaded (this is our connector in this case). And additionally we need to specify how often we going to check for any changes in that container.
- Once this is done, then we can select an operation that will trigger other processes. In Search bar find a process that you want to run once new file will be added or modified in Blob Storage. For example, We can select Outlook.com and now search for actions (identify what to do with the email)--> select "SEND EMAIL(V2)"
- Then Sign In, in next pop up window to create a connection between Logic App and your email and give all permissions on your behalf.
- Then it will show another pop up window --> select where do you want to send your emails, and email text to send. (Here you can choose dinamic data to attach it to email, such as File names, file links etc. that was added or modified)

Logic Apps Key Characteristics:

- Serverless enterprice integration service (PaaS), that means we as a customers just design the flows and let Microsoft to hadle the provisioning and scaling on the underlying infrastracture
- 200+ connectors for popular services, that means we can connect connectors and triggers without writing a single line of code.
- This service Designed for orchestration of:
  - business processes
  - integration workflows for applications, data, systems and services
- It is very powerful, No-code service solution. You can build your applications without writing a single line of code.

# Event Grid (100)

It is a service for routing messages as such there will be a lot of services sending events to event grid.
Services like Azure Blob Storage, Azure Subscription with some subscription events or Event Hubs, or custom Web application sending custom events. Those messages are called - Topics. Once Topics are sent to Event Grid, Event Grid will have a lot of other services that will subscribe to those messages, like azure Functions, Azure Logic Apps, custom Webhooks or Storage Queues. All of those are called - Subscribers.
The main purpose of Azure Event Grid is routing of those messages across those services ensuring successful delivery of those messages to those services.

Key Characteristics:

- Fully managed serverless event routing service, that means we just publish or subscribe to events without worrying about the underlying infrastructure.
- Uses publish and subscribe model for sending and receiving the messages, that means because of the serverless nature of the service and because it is very quick, very responsive service.
- Designed for event-based and near-real time applications
- Supports a lot of built-in events from most common Azure services. That means if your VM will go down they will be event flying to Azure Event Grid that you can react to using your applications. You can react to almost any event in Azure using Azure Event Grid. If someone creates a VM, that is an event. It is only rescaled VM that is event. Provisioning of other resources it is event. You can create applications that will react to changes in your Azure services and Azure subscriptions.

Summary:

- Azure Functions - application development platform for nano-services and event-based applications using popular languages / frameworks.
  Azure Functions and environment which allows us to build custom web applications for nano-services and event-based applications using popular frameworks completely serverless.
- Azure Logic Apps - enterprise integration services for orchestration of business and application workflows.
  Logic Apps - it is enterprise integration service allowing you to build our application workloads using visual interface.
- Azure Event Grid - scalable event routing service for integration and near-real time applications.
  Azure Event Grid is a scalable routing service in Azure for building real time and event-based applications.
