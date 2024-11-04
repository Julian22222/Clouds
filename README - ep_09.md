# Compute Services : Virtual Machines (VMs), VM Scale Set, App Service, Functions, Container Instances (ACI), Kubernetes Services (AKS) | Azure

# Compute Services

It is a category of services in Azure allowing you to build and run cloud-based applications. So whenever this is a web application, web service, some scripting desctop applications Compute Services are here to help.

Our firs Service is Virtual Machine (VM), but before we talk about VM lets talk about virtualization in general.

(pic 41) If you have a physical server (physical machine) -> what you will do first is install Operating System, which have standard components like file system, some services, some ports and other configuration.

If you want to run applications on this physical machine you will simply install them on that operating system. But the problem with hosting multiple applications on the same operating system is that they will share the same file system, same services, same ports and other system configurations. Because there is no boundaries between those applications at some point or another they will collide and it doesn't matter whether they use the same service or same ports, at some point they will collide which is very bad.

The thing that you can do to avoid that to use virtualization, where on the physical machine you install operating system but additionally you install virtualization software. Virtualization software will allow you to create virtual machines so an emulation of a physical machine that machine sense is an emulated physical machine will get its own operating system. And on that operating system you will be able to host your application. And this application now has its own sound box, it doesn't matter what it will do on this operating system it will not impact any other application because other application will be hosted on separate virtual machines with their own environments. This gives you a full separation and allow you to virtualize, emulate multiple physical machines using a single physical machine.

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

# Summarize of Virtual Machines

- they give you a lot of control over the system but that also gives you additional maintenance therefore I rate them quite high when it comes to control and maintenance
- they have no Auto scaling features therefore you always work with one node one virtual machine at a time. As such the scalability of this solution is quite low because you can't auto scale only way of scaling is vertical scaling by adding faster CPUs or more Memory, Faster Drives.

# Virtual Machine Scale Sets (pic 43)

with this service you pick an image, whenever it is a Custom Image or a Marketplace Image. This Image is automatically scaled across multiple virtual machines. Those virtual machines are hidden behind a Load Balancer which redirects the traffic from your users or applications to one of those virtual machines within the scale set. The amount of Virtual machines can be set statically by saying 3,5,10 or 100 or automatically with autoscaling feature. So you can increase the amount of virtual machines in scale set or decrease the amount based on your application demand.

Key Characteristics:

- Infrastructure-as-a-Service(IaaS)
- Set of identical virtual machines
- Built-in auto scaling features
- Designed for manual and auto-scaled workloads like web services, batch processing atc.

Virtual machine scale sets are still infrastructure-as-a-Service(IaaS), because you still managing the Virtual Machines you need still prepare Images but they are set of identical virtual machines created from the same Image. As such they have built-in auto scaling features allowing you to create and delete virtual machines based on demand and they are designed for manual or out of scale workloads, things like web services, batch processing etc. This is your way to scale out with virtual machines in the Cloud. In this case you still have quite a lot of maintenance but high degree of control over the virtual machine scale sets. in this case you are getting auto scaling features, so you can scale up to maximum of thousand nodes or 600 depending whenever this is custom or marketplace Image which makes scales as one of the most scalable services in Azure. If you want to decrease the maintenance required you can move away from Virtual Machines into containers.

Containers are little bit different than virtual machines.
