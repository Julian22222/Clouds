# Cloud service models (pic 13)

Let image we are startup company and we want to host our own application and build entire infrastructure for that reason.
We need:

- First 3 bulet point are Hardware that are needed in order to run the server

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

- if you manage all of these layers (all 8 layers) - that means we are talking about the ON-Premises. Clear ownership is on you, you manage all the infrastructure, platform and the software. And Cloud providers not even involved.

Key Characteristics:
ownership

- Cloud provider manages nothing
- You manage everithing
  - infrastructure --> Networking, Hardware & Virtualization
  - Platform --> Operatingsystem, Middleware, Runtime
  - Software --> Data and Applications

# IaaS (pic 14)

But if you decide to outsource the infrastructure. Purchase the infrastructure from the Cloud provider. So let Microsoft manage the Infrastructure while you manage the Platform and Software --> this is called Infrastructure as a Service (IaaS)
