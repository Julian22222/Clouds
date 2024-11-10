# Compute Services : Virtual Machines (VMs), VM Scale Set, App Service, Functions, Container Instances (ACI), Kubernetes Services (AKS) | Azure

# Compute Services

It is a category of services in Azure allowing you to build and run cloud-based applications. So whenever this is a web application, web service, some scripting desctop applications Compute Services are here to help.

Our first Service is Virtual Machine (VM), but before we talk about VM lets talk about virtualization in general.

(pic 41) If you have a physical server (physical machine) -> what you will do first is install Operating System, which have standard components like file system, some services, some ports and other configuration.

If you want to run applications on this physical machine you will simply install them on that operating system. But the problem with hosting multiple applications on the same operating system is that they will share the same file system, same services, same ports and other system configurations. Because there is no boundaries between those applications at some point or another they will collide and it doesn't matter whether they use the same service or same ports, at some point they will collide which is very bad. The thing that you can do to avoid that to use virtualization.

# Virtualization

Virtualization, where on the physical machine you install operating system but additionally you install virtualization software. Virtualization software will allow you to create virtual machines so an emulation of a physical machine that machine sense is an emulated physical machine will get its own operating system. And on that operating system you will be able to host your application. And this application now has its own sandbox, it doesn't matter what it will do on this operating system it will not impact any other application because other application will be hosted on separate virtual machines with their own environments. This gives you a full separation and allow you to virtualize, emulate multiple physical machines using a single physical machine.

Virtualization - is emulation of physical machines, it gives you ability to create different virtual hardware configuration per machine and per application. Additionally you are able to install different operating system per machine per application. If application needs different system this is a way to go. Because those are totally separate machines, each application can freely use its own file system, services, ports, install any meddleware or apply any configuration it needs to run.

Key Characteristics:

- Emulation of physical machines
- Different virtual hardware configuration per machine/app
- Different operating systems per machine/app
- Total separation of environments:
  - file systems,
  - services
  - ports
  - middleware
  - configuration

# Virtual Machines (VMs)

(pic 42) Virtualization in the cloud is done through Azure Virtual Machine Service. The process is very simple, you either grab Microsoft prepared Virtual machine images whenever this is Ubuntu, Windows, Oracle machine. Microsoft already prepared virtual machine images for you in the marketplace that you can start from. Or if you want you can configure your own system, install services, runtimes, applications and ask your developers to prepare a custom image for your own company and put that image into some storage. Azure virtual machine service grabs those images and allows you to choose a custom or marketplace image to start creating new Virtual machines and exposing them to your users. It doesn't matter which one you choose, in just couple of minutes a virtual machine will be provisioned and ready to use.

Virtual machines are Infrastructure-as-a-Service (IaaS). That you are responsible for both application , platform and operating system configurations. Because of that you have total control over operating system and the software running on it. You have support for marketplace but also custom provided images. Also, you can prepare your own images as a starting point for the virtual machines containing your organizational setup out of the box.
This service is best suited for a custom software requiring, custom system configuration or lift and shift scenarios. So moving your On-Premises environment application to the Cloud without a need to redesign. When it comes to supported scenarios you can run almost any application, any scenario using virtual machines whether this is a web application, web service, database, desktop application or using this as a jumpbox to connect to secure environmant or just data gateways or many other scenarios that virtual machines can support.

Key Characteristics:

- Infrastructure-as-a-Service (IaaS)
- Total control over the operating system and the software
- Supports marketplace and custom images
- Best suited for:
  - Custom software requiring custom system configuration
  - lift0and-shift scenarios
- Can run any application/scenario

  - Web apps & Web services
  - Databases
  - Desktop applications
  - jumpboxes
  - gateways, etc.

In Azure when you create a Virtual machine it will give you a list of virtual machines available in your subscription (under Image property). Virtual machine has quite a few configuration.

- When we choosing the Image you select from the dropdown list of Images prepared by Microsoft available directly from the marketplace.
- Then we need to choose the Size of virtual machine, which will affect your cost of virtual machine. Size means how powerful is hardware that we are virtualizing.
- Then we need to create --> starting Username and Password for our administrative account in this Virtual Machine
- then choose Select inbound ports: RDP (remote desktop protocol) <-- that means I want to connect to this Virtual machine through remote desktop protocol. Other options --> HTTP, HTTPS, SSH to connect to just created Virtual Machine
- other leave as a default.

# How to use Virtual Machine

- Go to just created Virtual Machine
- On Virtual Machine panel you can manage everything about your Virtual Machine and it will show all the details about VM general configuration.
- then Clik --> Connect --> Select RDP(remote desktop protocol) -->then Click --> Download RDP File (which will download the file allowing us to connect to this VM)
- Then Open that downloaded File --> login with your Username and Password administrative account and it is DONE
- Then You have a Server virtualized in the Cloud

# Comparing Vms and Summarize of Virtual Machines (pic JOINT TABLE)

- VMs give you a lot of control over the system but that also gives you additional maintenance therefore I rate them quite high when it comes to control and maintenance
- they have no Auto scaling features therefore you always work with 1 node /1 Virtual Machine at a time. Scalability of this solution is quite low because you can't auto scale, the only way of scaling is vertical scaling by adding faster CPUs or more Memory, Faster Drives etc.

# Virtual Machine Scale Sets (pic 43)

with this service you pick an image, whenever it is a Custom Image or a Marketplace Image. This Image is automatically scaled across multiple virtual machines. Those virtual machines are hidden behind a Load Balancer which redirects the traffic from your users or applications to one of those virtual machines within the scale set. The amount of Virtual machines can be set statically by saying 3,5,10 or 100 or automatically with autoscaling feature. So you can increase the amount of virtual machines in scale set or decrease the amount based on your application demand.

Key Characteristics:

- Infrastructure-as-a-Service(IaaS)
- Set of identical virtual machines
- Built-in auto scaling features
- Designed for manual and auto-scaled workloads like web services, batch processing etc.

# Comparing VMs and VM Scale Sets (VMSS) (pic JOINT TABLE)

VMSS have quite a lot of maintenance but high degre of control over the virtual machine scale sets.

Virtual machine scale sets are still infrastructure-as-a-Service(IaaS), because you still managing the Virtual Machines you need still prepare Images but they are set of identical virtual machines created from the same Image. As such they have built-in auto scaling features allowing you to create and delete virtual machines based on demand and they are designed for manual or out of scale workloads, things like web services, batch processing etc. This is your way to scale out with virtual machines in the Cloud. In this case you still have quite a lot of maintenance but high degree of control over the virtual machine scale sets. In this case you are getting autoscaling features, so you can scale up to maximum of thousand nodes/servers or 600 depending whenever this is custom or marketplace Image which makes scales as one of the most scalable services in Azure. If you want to decrease the maintenance required you can move away from Virtual Machines into containers.

# Contatainers Vs. VMs (pic 44)

Containers are little bit different than virtual machines. While there is still physical machine, there is still operating system underneath but instead of installing Virtualization Software, we install Container Runtime. Within Container Runtime --> you install containers. Container is a sandbox environment for each application and you can have multiple containers within a single runtime. The major differentce here is that there is no Operating System replicated across each container. As such the footprint of the container is much smaller than the one of virtual machine.

Containers don't have their own operating system, they actually use host operating system but because application needs operating system to run, they emulate it. While VMs emulate the hardware, containers emulate operating system to provide the sandbox environment for your applications. Because of that they are more lightweight than VMs therefore there is less development effort required for your team, there is less maintenance because you don't need to maintain the operating system, patches, updates and other things. Ans because there is no operating system there is less compute storage requirements from those containers, therefore you can respond quicker to demand changes, so you can auto scale faster than when use VMs. But at the same time Containers are very close to VMs therefore they allow you to run almost any scenario in the cloud. That is why containers are so popular recently on the market.

Key Characteristics:

- Use host's operating system
- Emulate operating system (VMs emulate hardware)
- Lightweight (no Operating System)
  - Development Effort
  - Maintenance
  - Compute & Storage requirements
- Respond quicker to demand changes
- Designed for almost any scenario

# Azure Container Instances

Our First service for Containers is called --> Container Instances (pic 45). When it comes to container instances instead of bundling entire system you just grab the application, grab the configuration and other runtime, middleware, software that you need for this application to run. You ask your developers to bundle this application into a container image and host it into container repository. Container Repository is a simple storage service, where you host your own images. Similarly to VMs there are public marketplace and public repositories of other images for containers as well. You can grab any of those images and push it to Azure Container Instance which will create a container group a simple virtual machine underneath the acenes and host your containers. Some containers might be exposed to users, some might not. It depends on what container really does. If it is Web application -> it will be exposed to Users. If it is a simple batch script -> may be it won't be exposed to the Users. You can create more container groups and a host more containers depending on your needs.

Simplest and fastest way to run a container in Azure. It is a first service that is categorized as a platform as a service. Sometimes it is called serverless containers because you can actually abstract from the managing of the servers underneath completely. This service is designed for small and simple web applications, running background jobs, maybe some scheduled scripts.

Key Characteristics:

- Simplest and fastest way to run a container in Azure
- Platform as a Service
- Serverless Containers
- Sesigned for:
  - Small and Simple Web apps/services
  - Background jobs
  - Scheduled scripts

# How to create Container Instance and Use it

In Azure Portal --> search for Container --> Click on Container Instances --> Click Create btn.
Filling the form when creating Container Instances:

- Image source --> it is a marketplace, where we can choose --> Quickstart images, which is Microsoft provided images.
- Image --> Microsoft/aci-helloworld (Linux) , it is simple Web application
- Size --> choosing power for host running my container

This service will be created and provided for us much faster than the VM.

To use just created Container Instance --> we need to go to just created Container Instance (just created resource), where we can review all the details about the service. Then we can copy IP address from there of our created container. Then we can past that public IP adress into new browser window to open the application that is currently hosted in my container.

# Comparing Container Instances to VMs and VM Scale Sets (pic JOINT TABLE)

We maintain some degree of control because you are virtualizing operating system. So you can install extra runtimes, extra software but it is still much less than maintaining full-fledged operational system. In container Instances there is no auto scaling but cool thing is that at minimum you don't need to run any servers, so you can have Minumum Nodes/ ammount of servers = 0 running if you don't need any. but at maximum you can have 20 container groups/ max nodes = 20. For scalability of this solution is not that great but this service is simple for simple use cases. If you need sacalability there are other services that deliver that like kuberneres services.

# Azure Kubernetes Services (AKS) (pic 46)

Kubernetes it is another service that allows you to work with containers using the same principle. Either hosting your own containers within container repository or using marketplace public repositories. Kubernetes servers can use those Images to spread this across nodes/servers. Of corse nodes underneath are VMs. But they are separated and abstracted from you and kubernetes is managing the deployment of containers across those nodes. When deployment of containers is finished kubernetes exposes everything to Users or applications through a load balancer and it also gives you the same abilities like a skill set, like staic scaling or auto scaling.

This is an open-source container orchestration platform. it is available in almost any cloud so it is not only Azure but also AWS and Google Cloud. Additionally this is one of the platform as a service offerings in Azure and it is highly scalable and customizable. So while container Instances were designed for a simple container deployments, kubernetes service is designed for high scale and highly customizable deployments of containers in the cloud. Because containers are so similar to VMs therefore almost any scenarion is supported.

key Characteristics:

- Open-source container orchestration platform
- Platform-as-a-Service
- Highly scalable and customizable
- Designed for high scale container deployments (anything really!)

# Comparing Kubernetes service to Container Instances VMs and VM Scale Sets (pic JOINT TABLE)

when comparing kubernetes service to other services, this is a very sophisticated platform offering. And because you are managing the containers and virtualizing operating system the degree of control is pretty high but it also requires quite a lot of skills from your team. Therefore the maintenance is also high and because it has autoscaling feature and scan scale up to 100 nodes at the time. The scalability of this solution is pretty good. Because containers have smaller footprint than Virtual Machines you can host more applications using 100 nodes than you can with VMs. But if we want to reduce the maintenance cost even further, we can move to --> App Services.

# App Services (pic 47)

Main purpose of the App Service is building Web Applications whenever those are user facing applications or web services. You ask developers to prepare a simple deployment package and send it to app service. This App Service responsibility to deploy this package across multiple nodes and expose this to users.

In this really simple service if you compare this diagram to our previous diagrams you see there is much less work. There is no need to create any Images and store them anywhere. You simple send your code to --> App Service.

App Service is Azure offering for hosting enterprise grade web applications and it is another Platform-as-a-Service (PaaS) offering. App Service supports multiple programming languages amd also containers.

App Services helps to quickly host your applications.

Key Characteristics:

- Designed as enterprise grade web application service
- Platform-as-a-Service (PaaS)
- Supports multiple programming languages and containers

# How to create Web Application using App Services

In Azure Portal --> choose App Services

- Resource Group
- Publish: choose Code or
- Rutime stack: choose language of your app
-
