# EC2 Instance Storage

Different storage options for EC2 Instances

## EBS Volume

In EBS Volumes - you keep the data for your Instance - data to setup the server (put here packages that you use in - npm install, in terminal)

![pic117](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic117.jpg)

- Note: CCP - Certified Cloud Practitioner - one EBS can be only mounted to one EC2 instance Associate Level (Solutions Architect, Developer, SysOps): "multi-attach" feature for some EBS
- When you create EBS Volume it is bound to specific availability zone (AZ). You can't have EBS Volume in created for example in US-east-1a and attach to an instance in US-east-1b

![pic118](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic118.jpg)

# EBS Volume - Example

![pic119](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic119.jpg)

- Here on the left side, we have --> US-EAST-1A availability zone.
- We have one EC2 Instance and we can attach for example one EBS volume to that EC2 Instance (see step 1 on the pic above).
- If we create another EC2 Instance , EBS volume can't be attached to two Instance at the same time - At AWS Certified Cloud Practitional Level!!! (see step 1).

(EBS volumes cannot be attached to multiple instances, I know it is not true for io1 and io2 volume types: this is called the EBS Multi-Attach feature. From an AWS Cloud Practitioner exam perspective this out of scope for the exam. If you are curious to learn about EBS Multi-Attach, you will find it in the AWS Certified Solutions Architect Associate course, or in the AWS documentation. )

One EBS volume can't be attached to two Instance at the same time. Therefore, other EC2 Instance needs to have its own EBS Volume attached to it. Also, you can attach two EBS volumes to one Instance (see step 2 on the pic above).

- EBS Volumes are linked to an availability zones (AZ) as you can see on example above we are useing US-EAST-1A. But if you want other EBS Volumes in other availability zones (AZ) then you need to create separate EBS Volume in other availability zone (AZ) (see step 3 on the pic above).
- You can create EBS Volumes and leave it unattached, they don't need to be attached to EC2 Instance. They can be attached on demand (see step 4 on the pic above).

![pic120](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic120.jpg)

- When you create EBS Volume the EBS Console you can see section -> Delete on Termination. By default it is selected for a Root volume and not for a new EBS Volume. (see pic above)

# How to work with EBS Volumes

![pic121](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic121.jpg)

- Go to EC2 --> Instances (on the left side menu bar) -> select needed Instance (see step 1,2,3 on the pic above)
- then click on Instance -> Storage section (see step 4)
- then find - Block devices (step 5)-> where we can find EBS Volume (step 6)

- This EBS Volume has 8 Gb, Attachment status = Attached, Volume State = In-use, Delete on termination = yes, etc data about current EBS Volume.
- Then click on the "Volume ID" (step 7) - of the current EBS Volume
- This will take you directly to EBS Volume Console (see pic below). It will show all EBS Volumes that are under this EC2 Instance.

![pic122](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic122.jpg)

- This will show all details about current EBS Volume (see step 1 on the pic above)
- You can create new EBS Volume (step 2). When you fill the form to create new EBS Volume for current Instance - the availability zone (AZ) should be the same as your EC2 Instance has (see step a, and step 3 on pics above). Otherwise you won't be able to attach this new EBS Volume to your EC2. If you Availablity zone will be different when you created new EBS Volume. -> it will appear in EBS Volume Console with State = "available" but you will not be able to attach it to your EC2 Instance because it will have different availability zone.

- When you created new EBS Volume, then you can select your EBS volume and then attach this EBS volume to your EC2 Instance, you can detach or Delete the EBS Volume (see step 4)

Created Instance will appear in EBS Volume Console and "Block devices" on EC2 Instance -storage section (if the EBS is in use), but the State = available. Then you need to attach the EBS Volume to your Instance if needed -> to make State = in-use. (see pic below)

After you created new EBS Volume. In EBS Volume Console clear all the filters to see all EBS Volumes (see pic below)

![pic124](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic124.jpg)

Also, you can find all EBS Volumes on the left side menu bar -> from EC2 Dashboard or from EC2 Instances Dashboard --> see pic below

![pic127](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic127.jpg)

- then you will see another EBS Volume - which has State - available, but not in use, In Actions you can attach this EBS Volume to your EC2 Instance -> to make in-use.(see pic below)

![pic123](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic123.jpg)

# EBS Snapshots

see step a on the pic below

It allows to backup the data from EBS and copy EBS volume to use it in different Availability zone

![pic122](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic122.jpg)

![pic125](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic125.jpg)

- You will be able to make a EBS snapshot = backup of EBS Volumes, after that -> even if EBS Volume is terminated later on you can restore it from that backup.

![pic126](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic126.jpg)

# How to use Snapshots

- Select your EBS Volume

- then go to Actions --> Create snapshot (see step a on the pic below)

![pic122](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic122.jpg)

- then fill the form -> add description, tags. And then press create a snapshot.
- then on the left side menu click on --> Snapshots (see pic below)

![pic127](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic127.jpg)

- then it will show the list of all Snapshots you have. (pic below)

![pic128](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic128.jpg)

- then right click on the selected Snapshot (see step 1), to copy that snapshot to another region. Or you can clik on Actions (step 1) --> then copy snapshot (step 2). (see pic below).

![pic129](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic129.jpg)

- then you can choose what Region to copy your Snapshot. It is very helpful in disaster recovery or starategy to make sure your data is backed up to another Region within AWS.

Also you can recreate a Volume from the selected Snupshot (step a from pic below)

![pic129](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic129.jpg)

- then fill the form -> Volume type, Size, availability zone, tags --> then press Create Volume. New Volume will appear in Volumes Console (can find on the left side menu bar).

With the Snapshot you can copy EBS Volumes across different availability zones (AZ).

# Snapshot Recycle Bin

- go to EC2 -> Volumes or EC2 -> Snapshots

![pic124](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic124.jpg)

- It the way to protect your EBS Snapshots and Amazon Machine Images (AMIs) from accidendt deletion
- after pressing Recycle Bin --> you fill the form -> "Resource type" = EBS Snapshots or AMIs, depending what do you need. And add "Retention period" -> how many days it will keep deleted file in memery for recovery if needed. This new Rycle Bin rule will show up in --> Recycle Bin List. By clicking -> Recycle Bin to see the list of all Rycycle Bin files (see pic above). Deleted Snapshot will appear in -> Recycle Bin -> Resources section. Where you can recover it.

Also, you can Archive the Snapshot --> (see pic below). Go to Snapshots -> select a Snapshot -> press Actions -> Archive snapshot. To restore the snapshot it may take 24 - 72 hours.

![pic130](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic130.jpg)

# AMI Overview (EC2 Instances)

AMI (Amazon Machine Image) is a template for creating virtual servers (EC2 instances) that contains the operating system, application server, and applications needed to launch an instance, acting like a master blueprint for a server's initial state, allowing for quick, consistent server provisioning, backups, and disaster recovery.

AMI- it is a server template with all needed middleware, runtimes, applications <-- for example you can create an Image - on Ubuntu, add node.js,mongodb,dotnet, etc. -> and then save this Image.

![pic131](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic131.jpg)

![pic132](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic132.jpg)

# How to work with AMI

Before creating an AMi we need to create EC2 Instance

- go to EC2 -> Instances -> press Launch Instances (top rignt corner, see pic below)

![pic103](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic103.jpg)

- then fill new EC2 Instance form --> (see pic below) and press -> Launch Instance

![pic72](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic72.jpg)

- then we can create an AMI from new, just created EC2 Instance
- go to EC2 -> Instances Dashboard, select new EC2 Instance and click on Actions -> Image and templates -> Create image (we creating am Image - our own AMI from selected Instance) (see pic below)

![pic133](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic133.jpg)

- then fill the Image form -> name, tags -> click on Create Image

Now we can Launch new EC2 Instance from our AMI that we just created. AMI is a template/layout with some saved Instance settings that we can use letter for our new Instances. To do that -->

- go to EC2 -> Instances -> Launch Instances (top rignt corner, see pic below)

![pic103](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic103.jpg)

- you will see -> "My AMIs" option to Launch new Instance from. Select "My AMIs" and choose your AMI to launch new instance (see pic below)

![pic134](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic134.jpg)

- there was no "My AMIs" option before we created our own AMI (see pic below)

![pic72](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic72.jpg)

Also, you can find all your AMIs from left side menu bar - from EC2 Console or from EC2/Instances Console --> see pic below

![pic135](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic135.jpg)

AMI allow to start yuor Instance much quicker because sowtware we needed was already installed to our EC2 Instance.

# EC2 Image Builder

another service in AWS

![pic136](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic136.jpg)

# How to use EC2 Image Builder

- go to EC2 Image Builder (service)
- press -> Create image pipeline and fill the pipeline form. and click -> Next (see pic below)

we will use Manual Build schedule. It is cheeper. If you use schedule option it will use AWS resources more often to create new images and volumes -> therefore you will get higher price of using AWS resources.

![pic137](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic137.jpg)

- then you will see Recipe Configuration page.

Choose the recipe for your image. Recipe - it is a document that defines how the source image going to be customised. (see pic below).

![pic138](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic138.jpg)

- then you will see Workflow page

leave Default workflows. And click --> Next (see pic below)

![pic139](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic139.jpg)

- then you will see Infrustructure Configuration page

You can create new infrastructure Configuration or use service defaults.

How you want to create this AMI and what type of EC2 Insatances do you want to create your image?

If you choose to create new infrastructure you need new IAM Role, Role must have these policies - AmazonSSMManagedInstanceCore, EC2InstanceProfileForImageBuilder, EC2InstanceProfileForImageBuilderECRContainerBuilds

--> If you select -> create new infrastructure (see pic below). Here you can choose -> t3.micro Instance type which is from Free tier / very cheap. You need to create a Role with these policies -> AmazonSSMManagedInstanceCore, EC2InstanceProfileForImageBuilder, EC2InstanceProfileForImageBuilderECRContainerBuilds

![pic142](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic142.jpg)

---> If you leave as default infrustructure. Default setings -> Under the hood it creates -> m5.large Instance type - which is expensive. And click --> Next (see pic below)

![pic140](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic140.jpg)

- then you will see Distribution Settings page.

For distribution settings you can use default distribution settings -> then your AMI will be disributed to current Region, Region that you are in. Or you can create new distribution settings and here you can set up different Regions to distribute your AMI.

![pic141](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic141.jpg)

- and then click -> Create Pipeline.

Now we need manually trigger this just created pipeline

- Now go to -> EC2 Image Builder Dashboard to see your just created pipeline and click on it (see step 1 on the pic below)

![pic143](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic143.jpg)

- and press Actions -> run pipeline

![pic144](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic144.jpg)

-> now it will take a some time to create new Instance using pipeline -> During pipeline running process -> In you EC2 -> Instances, will show up some running Instances and then stop running from our pipeline.

To check the workflow of the pipeline / check what is running, what is happening with your pipeline ->

- go to EC2 Image Builder -> click Images (from left side menu bar) - see step 1 on the pic below -> then click on image (step 2) -> then click again on the image link

![pic145](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic145.jpg)

- then clcik on workflow section -> here you can track all the steps from the pipeline, what is going on (it will show - running, skipped, completed, failed)

![pic146](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic146.jpg)

#### Now you can use this, just created AMI Instance

- Go to -> EC2 -> and click -> Launch Instance (create new instance)
- now you can use it in -> it will appear in "My AMIs" section (see pic below)

![pic147](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic147.jpg)

06 -ep59 9:39

## Remember

- Always -> stop or Terminate your Instances if you don't use them (from EC2 -> Instances)

![pic148](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic148.jpg)

- AMIs -> delete your AMI, by selecting correct AMI -> Actions -> Deregister AMI (from EC2 -> left side menu bar -> AMIs) - (pic below)

![pic149](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic149.jpg)

- Snapshots -> delete your Snapshots by selecting correct Snapshot -> Actions -> Delete snapshot (this is a snapshot that was created from your AMI) - (pic below)

![pic150](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic150.jpg)

EC2 Image Builder -> Images (you can leave your EC2 Image Builder images) - it is Free (pic below)

![pic151](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic151.jpg)

# EC2 Instance Store (2nd type of storage that you can attach to your Instance)

1st type of storage is - EBS Volumes

EC2 Instance Store:

- it is a virtual machine that is attached to real hardware server and some of this servers have disk space that is attached directly with physical connection to the server.
- It is special type of EC2 Instance Store - hardware that can be attached to the physical server.

![pic152](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic152.jpg)

# EFS - Elastic File System (3rd type of storage that you can attach to your Instance)

- one EFC can be mounted / connected to many EC2 Instances at the same time. It makes shared network file system or shared NFS. (For example: one EBS Volume can be attached only to one EC2 Instance at the time)
- EFS work only with Linux EC2 instances and it works across multiple availability zones (AZ). --> Instance in one AZ to be attaching the same EFS volume in another AZ.
- EFS is expensive = 3x of gp2 EBS volume

![pic153](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic153.jpg)

# Differences between EBS vs. EFS

![pic154](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic154.jpg)

- With EBS ->

EBS volume can only be attached to one Instance, and to one specific AZ. EBS volumes are bound to specific availability zone. But if you want to move over this EBS volume from one AZ to another AZ -> you can create a "Snapshot" -> then you create "EBS Snapshot" -> then restore that "Snapshot" to a new availability zone. This is how you move your EBS volume to different AZ. But this is a copy of your EBS volume in different AZ. (see pic above)

- with EFS ->

It is network file system. That means whatever is one EFS drive is shared by everything is mounted /connected to it. It means -> lets say we have many Instances in Availability zone 1 or many Instances in Availability zone 2. At the same time all these Instances can be connected /mount the same EFS drive - using EFS Mount Target. And all these Instances that are monted will see the same files - making shared file system. (see pic above)

# EFS Infrequent Access (EFS -IA)

It is another storage class. This is cost saving optimisation. And from application perspective there is no drawbacks, it is very transparent to application.

![pic155](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic155.jpg)

- if you enable EFS-IA then -> EFS automatically move your files to EFS-IA if your files are not accessible for some time.

- See pic above,(the diagramm). EFS Standard has 4 files - but one file hasn't been accessed for 60 days for example (no one hasn't read or write to this file.).

If you define your Lifecycle Policy (adjust the rules after what time it goes to different storage) and you enable EFS-IA -> then you can say - after 60 days move this file to different storage class which is --> EFS-IA. Which has some cost saving. This is going to be done automatically. Next time when you/user access this file - it is going to be put back to EFS Standard because it is more accessable location/for more often use.

# Shared Responsibility Model for EC2 Storage

Lets understand where is AWS and your responsibility regarding EC2 Storage

![pic156](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic156.jpg)

# Amazon FSx

In case you don't want to use EFS or S3 and you want somethin else you can use FSx to manage your file systems. FSx fo Lustre and FSx for Windows File Server are most important ones. Can be add some more option over time.

![pic157](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic157.jpg)

### Amazon FSx for Windows File Server

![pic158](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic158.jpg)

See diagram above

- You deploy FSx usually across two availability zones and there is support all the Windows native protocols - SMB protocol & Windows NTFS, which allows you to mount this file system to your Windows machines. For example we have - Windows client and over SMB it is able to access the windows file server. But also if you have EC2 Instances that are windows based then they could also access this windows file server. Amazon FSx it is the way to deploy this windows file server that leverages SNB protocol and windows NTFS.
- Also this is Microsoft type of offering - there is an integration with Micorsoft Active Directory for user security.

### Amazon FSx for Lustre

![pic159](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic159.jpg)

See diagram above

- They it works - Amazon FSx for Lustre can be connected eather to your Corporate data center or to your Compute Instances directly within AWS. And then in backend Amazon FSx for Lustre is storing your data possibly on Amazon S3 bucket.

# Summary

![pic160](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic160.jpg)

# EC2 Dashboard

- Here you can see all the resources are running in your region. Owerview of all resources within your EC2.

![pic161](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic161.jpg)

- Instances, Volumes, Snapshots - if you keep these, you will have some bill for it from AWS

- You can leave - Key pairs (it is Free to keep it) - don't need to delete
- You can leave - Security groups (it is Free to keep it) - don't need to delete
