# Azure Storage Services such as --> Blob storage, Queue storage, Table storage, Files storage, Disk storage and Storage Tiers

create Storage Account first in Azure Portal to get access to create one of the services below ->

4 Services:

- File storage
- Table storage
- Queue storage
- Disk storage

# General classification of Data

Types of Data:

1. Structured data - the data is laid out structured and you can described it using specific schema. Each table, each row of the table - you can define what are the properties of each row, what are the type of those properties and each row that you insert into that table has to follow the schema. Additionally if you have multiple tables you can define relationship between those tables. This is the scenario that you typically see in Relational Databases
2. Semi-Structured data - you still have a table but each row within this table don't need to follow any specific schema. That means each row can have its own unique properties. The only common property is usually some sort of Key, like an Id column. You can say this is a less formalized way of storing your data
3. Unstructured data - data like images, movies, applications, binary application files, txt files and many more files. Files that don't follow structure that can represent pretty much any kind of data.

# Azure Blob Storage (pic 63)

We were talking about unstructured data and any kind of unstructured data can be called --> BLOB

BLOB <-- stands for Binary Large OBject so any kind of file. And you can put those blobs into Azure Blob storage into something called container. Container is just a bucket for multiple blobs. You can have more than one container with an Azure blob storage. It is designed to allow both applications and users to work with unstructured files in the Cloud.

Azure Blob storage is simply a service designed to store any kind of file in Azure. Additionally there are three storage. Storage tiers allow Microsoft to provide better performance and better pricing depending on how often do you access your data. That's why there are three storage tiers. First tier is called - Hot tier. You use this for your frequently accessed data. So if you are building Web application and this web application is serving images to your customers then this would be the storage tier that you would use. Because hot storage tier provides the best performance for your files. But if your solution also store files that are accessed less frequently then you can use --> Cool tier. With Cool tier you are accepting lower availability and lower performance for accessing your files while maintaining high durability and getting significant discount for storing that data. This is the perfect solution for storing older versions and backups for your applications. But if you have files that you never plan to access, like a very very long term backups, let's say backup that you need to keep for 10 years. Then you can use archive storage tier. In this case the availability is the lowest because retrieving that data might even take couple of hours but the price for this tier is lowest. You are getting 10 times the discount for storing data in Archive tier. This really is the lowest price per Gigabyte that you can get when storing data in Azure.

Azure Blob Storage Key Characteristics:

- Designed for sorage of files of any kind (BLOB - Binary Large OBject -file)
- Three storage tiers:

  - Hot - frequently accessed data
  - Cool - infrequently accessed data (lower availabilit, high durability)
  - Archive - rarely (if-ever) accessed data

# Azure Queue Storage (pic 64)

It is very small service but very significant when building applications. When you have application that has several tasks to be completed and each of those three tasks might take some time to complete. What you can do is output those into Azure Queue as a separate messages. This will allow background processes and other services to pick those messages from the queue at their own pace and let them process those asynchronously. This will not only offload your Front-End application but also allow you to pick more suited services for the background processing.

Azure Queue Storage is a service that allows you to store small pieces of data which called messages. So that you can build scalable asynchronous processing solutions in Azure. It is very simple service with very specific use case in mind and it fits perfectly in this kind of scenarios.

Key Characteristics:

- Storage for small pieces of data (messages)
- Designed for scalable asynchronous processing

# Azure Table Storage (pic 65)

This service was designed with semi-structured data in mind. Both users and application can output the semi-structured data form into tables and this table is part of Table storage. Of corse you can have more than one table because table storage is just like database, where you store multiple tables with your data. Just remember this is a semi-structured database. So there are no joins, no schemas, just your data ans a simple storage. This kind of databases are also called --> No SQL databases.

To Summarize Azure table storage is one of the storage services in Azure for your semi-structured data needs. You can work, insert, update and operate on the data in a semi-structured form. Remember you use this kind of database when you don't need stuff like foreign joins, foreign keys, relationships or when you don't need to follow any strict schema. Additionally this service is designed for fast access. If you store petabytes of data you will still get your data within milliseconds. If you would use compound key to access that specific rows. So it is quite scalable despite that it is a simple service. And similarly to Blob storage Microsoft provides many programming interfaces and many SDKs. So it is very easy for your developers to use table storage when building solutions in Azure.

Key Characteristics:

- Storage for semi-structured data (NoSQL)
  - No need for foreign joins, foreign keys, relationships or strict schema
  - Designed for fast access
- Many programming interfaces and SDKs

# Azure File Storage (pic 66)

This service is similar to Blob Storage. As we already said the Blob is synonym for file.

What is the difference between Blob Storage and File Storage ?
Let's talk about the semantic differences first.

- In file storage instead of blobs you store files.
- Instead of containers you have shares.
- Instead of blob storage you have file storage

So semantically they are pretty much identical (to Blob Storage), they work almost identical. The only difference is the way you access them. In case of File Storage you access your shares via SMB protocol. So this is a simple file share service.

Azure File Storage service is a service that allows you to store files. Files that will be accessed for share drive protocols. Whether you will use Windows or Linux machines you can take advantage of file storage service. There are two common scenarios that this service was designed for. First one is extension of the On-Premise file shares. So if your company already has file shares that are used internally and they just need to extend those file shares with more space. They can use Azure file Storage to do that. And the second very common use case is lift-and-shift. Lift and shift means that you already have existing applications and you don't want to redesign those applications to take advantage of Blob Storage. But you still want to extend or move files to Azure, in this case you use Azure File Storage to mount it as a local drive you point your application to the local drive. They use native functionalities but in the end this share is in Azure. So automatically your files are saved to Azure. This gives you ability to take advantage of Azure features without any need to read these in your existing applications. This is the major difference between the File Storage. You use File Storage if you need that share drive protocol if not you design your applications and use Blob Storage.

Key Characteristics:

- Storage for files accessed via shared drive protocols
- Designed to extend On-Premise file shares or implement lift-and-shift scenarios

# Azure Storage Account

All the services that we learned before, such as: Blob Storage, Table Storage, Queue Storage, File Storage are part of bigger service --> called Azure Storage Account

Storage Account is simply a collection of services including those 4 that we just learned. They are designed to allow customers store files, messages and semi-structured data in Azure very easily, very effectively and at high scale. And that high scale is quite high, we are talking up to petabytes of data. But not only it scales very high, it also has high durability. We are talking about 11 nines. So if you pick the lowest replication on Azure storage Account which is locally redundant storage by default it provides you 11 nines of durability. The chance you lose your data is astronomically low or we can say it is impossible. But we all know nothing is impossible. If you want you can pick even better replication settings going up to 60 nines of durability and by default it is the cheapest per gigabyte storage in Azure. If you take advantage of Blob storage tiers you can get very low price for very large amounts of data.

Key Characteristics:

- Group of services which include
  - Blob Storage
  - Queue Storage
  - Table Storage
  - File Storage
- Used to store
  - files
  - messages and
  - semi-structured data
- Highly scalable (up to petabytesof data)
- Highly durable (99.999999999% - 11 nines, up to 16 nines)
- Cheapest per GB storage

### How to use Azure Storage Account

- Create resource
- put --> Storage account
- fill the form:
  - Subscription
  - Resource group
  - Name
  - Location
  - Account kind (size of computer)
  - Replication
  - Access tier --> Cool or Hot (it is storage tiers)

After creating Storage Account --> go to this just created resource. (pic 67) By default in first screen in the Essentials Section you will see 4 Services that we just learned. Containers - which is the Blob storage. File shares - which is File storage. Tables - which is a Table storage. Queues - Queue Storage.

Click on Container for example and create new container. it will be a bucket for our files. Than we can open just created container and press --> Upload btn (to upload any files to this container) --> and your file is in the Cloud
