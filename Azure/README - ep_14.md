# Azure IoT Services | IoT Hub, IoT Central, Azure Sphere

Internet of Things (IoT) Services

These are services within Azure that helps us build IoT based solutions.

Internet of Things - it is a network of internet connected devices so called IoT devices (IoT Devices). those devices are embeded within everyday objects and they enable those objects to send and receive data from the cloud such as settings or telemetry.
Most of us have some sort of IoT device at home whether it is something as simple as a smart lighting, maybe a mobile phone, a plant watering system or something more complex like a door lock or a smart car or raspberry pi. Most of us have some sort of IoT devices at home already. And to build solutions based on those IoT devices you need a set of specific services for that purpose.

# Azure IoT Hub (pic 82)

This service allows for BI- Directional communication (both side communication) between the cloud and IoT devices and then allows developers to take advantage of these information to provide Insights, Monitoring and develop custom solutions for their IoT platform.

Azure IoT Hub is a managed service for bi-directional communication between the cloud and IoT devices. It is a platform as a Service offering in Azure for IoT development. It is highly secure, scalable and reliable service for IoT. IoT Hubs perfectly integrates with a lot of Azure services and has a lot of SDKs (Software Development Kit, a set of platform-specific building tools for developers. SDKs put everything you need to develop and run software in one place.) for the most popular languages on the market. So that your teams don't need to learn any new language to use IoT Hub for development purposes (supports many popular languages). Azure IoT Hub also has support for multiple common standards on the market when it comes to communication protocols.
And just by looking on this list we can see that Microsoft created IoT Hub to help developers build, custom IoT solutions

Key Characteristics:

- Managed service for bi-directional communication
- Platform as a Service(PaaS)
- Highly secure,scalable and reliable
- Integrates with a lot of Azure Services
- Programmable SDKs for popular languages (C, C#, Java, Python, Node.js)
- Multiple protocols (HTTPS, AMQP, MQTT)

# How to use

For example we have Raspberry pi to connect to IoT Hub. Rasberry pi has a code block: Where we can edit the code to send the data to IoT Hub

- We create Iot Hub service on Azure Portal
- Fill form:

  - Subscription
  - Resource Group
  - Region
  - IoT hub name

- Then go to just created Iot Hub resource to start managing it
- Then in the Iot Hub panel , on the left side menu bar click --> IoT devices ( to register the device)
- Then add new device, press --> + new
- Then give the name of the device, and for basic config leave the rest as it is
- Once the device has been added, we can open that just created device and copy --> primary connection string that we will use in Raspberry pi to start sending Data and Authorize ourselves to IoT Hub.
- Coppied connection string insert to Rasberry pi code block and replace connction string in the Rasberry pi code. And hit --> Run btn

Now you can send the data from IoT device to the cloud. Now all the data is gathered and governed by IoT Hub. Next step as the developers would be connecting to IoT Hub from their external services, processing the data and reacting to that data.

If building solutions from scratch is not something that your organization wants to do then you should use -->

# Azure IoT Central (pic 83)

this service is very similar to IoT Hub but it works on entirely different level. It still allows for connectivity of your IoT devices with the cloud. But IoT Central as a service provides you a set of tamplates for building applications using standardized templates. It is application delivery platform for IoT for device management and centralization purposes. This is an amazing solution for organizations that want to take advantage for IoT and they don't want to build applications from scratch.

Azure IoT Central is an IoT application platform, it is a software as a service solution that allows you to use industry specific app templates to get out of the box solutions for your IoT devices and manage them at scale in the cloud. Using this service Microsoft allow customers to build IoT solutions without the need to have very deep technical knowledge about IoT solutions. Main goal of this service to provide you with application templates so you can very easy connect, manage and monitor your IoT devices at scale. Similarly to IoT Hub this service is highly secure, scalable and reliable so you can build your applications without worrying about the platform itself. Also, this service is actually built on top of IoT Hub and 30+ Azure services

Key Characteristics:

- IoT App Platform - Software as a Service (SaaS)
- Industry specific app templates
- No deep technical knowledge required
- Service for connecting, management and monitoring IoT devices
- Highly secure,scalable and reliable
- Built on top of the IoT Hub service and 30+ other services

# Azure Sphere (pic 84)

It is not really a service alone it is a set of components allowing you to build secure IoT applications.

For example, let's say we have 2 washing machines and we are building applications that will run on those washing machines.

- First thing that Azure Sphere delivers are Azure Sphere microcontroller unit (build-in chip in the washing machine). It is a simple chip that Microsoft build-in to their standards and specifications. Microsoft then delivers this specification to hardware vendors so that they can build their chipsets according to the specification.
- Additionally Azure Sphere delivers an operating system. Microsoft manage this operating system to make sure that it is always up to date and this system has the latest security patches applied. Then you build your application on top of that.
- Azure Sphere also delivers --> Azure Sphere security service. This service is used for secure communication between the cloud and devices themselves so that your support teams can apply updates to your application through that service but also Microsoft can apply updates to the operating system using Azure Sphere Security Service.

All these needed to build, secure end-to-end IoT solutions by creating standardized, certified chips, by creating secure operating system and providing secure channel to communicate between devices in the cloud. Azure Sphere is something bigger than just a service, it is a set of tools for secure IoT solutions.

Key Characteristics:

- Secure end-2-end IoT Solutions

  - Azure Sphere certified chips (microcontroller unit - MCUs)
  - Azure Sphere OS based on Linuz
  - Azure Security Service trusted device-to-cloud communication

  Summary:

  - IoT Hub is a managed service for bi-directional comunication of IoT devices in the cloud. It is a platform as a service (PaaS), used to build custom IoT applications. But your organization can leverage, existing industry standard specific templates for building IoT solutions. In that case use -->
  - IoT Central, which is an IoT application platform with dozen of functionalities for provisioning management and monitoring of IoT solutions. Software as a service (SaaS).
  - Azure Sphere, which is end-to-end approach for building secure IoT solutions by providing both hardware operating system and communication channels for securing our IoT solutions.
