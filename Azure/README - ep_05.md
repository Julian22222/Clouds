# Cloud service type models

![pic13](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic13.jpg)

Let imagine we are startup company and we want to host our own application and build entire infrastructure for that reason.
We need:

- First 3 bullet points are Hardware that are needed in order to run the server

1. Servers (Memory, Motherboard, CPU)
2. Networking (Our servers need to be able to connect to the internet)
3. Storage (HDD, SSD) (Every server needs a storage, can be eather hard drives or solid state drives)

- To ensure the best utilization of the hardware that we have we need virtualization software, that we can run multiple virtual machines on a single hardware piece. So you can host multiple applications but maintain the total separation of the environments, and virtualization software will allow to do that

4. Virtualization

- all these virtual machines will need operating systems

5. Operating System (Windows,Linux, amy other operating systems)

- when operating system is in place we need additionally install a middleware

6. Middleware (all the software additions that you need to run the system and the application itself)

- typical application additionally need a runtime, another additional layer of the software which will host your application. If this is a web application this could be IIS web container, if it is container application it can be a Docker

7. Runtime (IIS, Docker)

- Once all of those layers are in place we are now finally ready to host our application and application Data on that system

8. Applications Data (Data, App)

## Infrastructure-as-a-Service (IaaS)

First 4 layers are called Infrastructure. All the layers that directly are related to the hardware and the virtualization.

## Platform-as-a-Service (PaaS)

Layers from 5 to 7 are called Platfrom. All the layers that directly are related to Operating System, Middleware and Runtime. These are all the software's all the system and configuration that are required for you to run the application but not the application itself

## Software-as-a-Service (SaaS)

layer 8 are called Software - The application and the data itself.

# Who will manage what?

### On-Premises Environment

- if you manage all of these layers (all 8 layers) - that means we are talking about the ON-Premises. Clear ownership is on you, you manage all the infrastructure, platform and the software. And Cloud providers not even involved.

Key Characteristics:
ownership

- Cloud provider manages nothing
- You manage everithing
  - infrastructure --> Networking, Hardware & Virtualization
  - Platform --> Operating system, Middleware, Runtime
  - Software --> Data and Applications

### Infrastructure-as-a-Service (IaaS)

![pic14](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic14.jpg)

But if you decide to outsource the infrastructure. Purchase the infrastructure from the Cloud provider. So let Microsoft manage the Infrastructure while you manage the Platform and Software --> this is called Infrastructure as a Service (IaaS)

Key Characteristics:
Ownership

- Cloud provider manages infrastructure (Microsoft)

  - Infrastructure --> Networking, Hardware and Virtualization

- You manage Platform and Software
  - Platform --> Operating System, Middleware, Runtime
  - Software --> Data and Applications

Typical use cases here are:

- Migration of the workload from the On-Premises Environment to Cloud
- Testing and development
- Extending your On-Premises environment of the capacity of the cloud (that you can create storage backup and disaster recovery scenarios)

The list of services used in Azure to implement Infrastructure-as-a-Service solutions is quite long but typically you will see things like -->

- Virtual machine
- Virtual networks
- Managed Disks
- other many services

But in general, the rule of thumb is if someone says that they have Infrastucture-as-a-Service solution that means they have a lot of Virtual machines and probably this is the skills they are looking for.

### Platfors-as-a-Service

![pic15](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic15.jpg)

Key Characteristics:
Ownership

- Cloud provider manages infrastructure and Platform (Microsoft)

  - Infrastructure --> Networking, Hardware and Virtualization
  - Platform --> Operating System, all security patches, Middleware and Runtime to host your application

- You manage Software (you will only need to build and manage your own applications)
  - Software --> Data and Applications

If you are designing for the cloud you most likely will go one level up. You will allow Microsoft to manage Platform and Infrastucture part while you just build your own applications. in that case we are talking about Platfors-as-a-Service. In this model Cloud provider will manage the Infrastructure and the Platform

Typically this model is used whenever you are:

- Developing cloud applications,
- this could be a state-of-the-art web applications
- AI
- Machine learning
- business analytic solutions
- basically it can be anything

If you are building applications you are most likely using Platfors-as-a-Service solutions. In this case we can talk about:

- SQL for relational databases
- App service for web hosting
- logic apps for enterprise integrations
- function apps for serverless and one of the hundreds of other services allowing to take advantage of the Cloud in a Platfors-as-a-Service model

### Software-as-a-Service (SaaS)

![pic16](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic16.jpg)

Key Characteristics:
Ownership

- Cloud provider manages infrastructure, Platform and Software (Microsoft manages everything and you just use the applications)

  - Infrastructure --> Networking, Hardware and Virtualization
  - Platform --> Operating System, all security patches, Middleware and Runtime to host your application
  - Softwae --> Data and Applications

- You manage nothing

If you decide to outsource everything to Microsoft. That means you are using Software-as-a-Service model. In that case the ownership of the cloud provider is everething and there is nothing on you

Use cases:
usually this means buying of-the-shell applications. Applications like Outlook, Skype, One drive and all the other business applications that you are probably using every day

# Diffrences between these service models ![pic17](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic17.jpg)

```C#
//Infrastructure-as-a-Service (IaaS)

if you let cloud provider manage the physical Datacentre buildings, Security, Servers and Storage we are talking about IaaS
```

```C#
//Platform-as-a-Service (PaaS)

if that cloud provider additionally manages the operating system and the development tools we are talking about PaaS
```

```C#
//Software-as-a-Service (SaaS)

if that cloud provider additionally manages the applications and Data we are talking about SaaS
```
