# Database Services | Cosmos DB, SQL Database, Db for MySQL & PostgreSQL, SQL Managed Instance

Services that allows us to put more structure to our data

Types of Data: (from ep_11)

1. Structured data
2. Semi-Structured data
3. Unstructured data

Here we will focus only on structured and semi-structured data types

# Azure Cosmos DB ![logo14](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo14.jpg)

(pic 65) In ep_11 we were talking about semi-structured data sets can be uploaded by either users or applications to a table entities hosted by Azure table storage service. In that sense Table Storage and Cosmos DB are very similar except for the table entities you have collections but instead of Table Storage you have Cosmos DB (pic 77). But the difference between two services lies somewhere else.
-One of the primary features of Azure Cosmos DB is ability to replicate geographically. This is because Azure Cosmos DB is available in many regions and Data replication across those regions is as simple as selecting check boxes. Once that checkbox is selected your data automatically get replicated across Azure regions of your choosing (pic 78). It is very simple.
-One of another feature of Cosmos DB is ability to not only read globally but also write globally. So you can write to the closest data center available to your application and to your users. Besides its geo-replication capabilities this database is also low latency database. That means if you are operating on a small objects it will return responses under 10 milliseconds. If you building real-time applications this might be the best choice for you of all of these services available in Azure.

Azure Cosmos DB is globally distributed NoSQL Database service in Azure. Allowing to store your semi-structured data sets. Because semi-structured data sets do not require to follow schema this is a schema-less database.
-Another feature of Cosmos DB is ability to use one of multiple available APIs. Standard one is core SQL API which allows you to query your data quite effectively. But if you are building application based on MongoDB, Cassandra, Gremlin, Table Storage you can very easily migrate to Cosmos DB and use those respective APIs. One of the cool things to note here is that Gremlin is for graph databases.

So Azure Cosmos DB is not only a document database to store JSON files, you can also store graph data and Table Storage API allows you very easily to migrate from Table Storage to Cosmos DB if you need that Geo-distribution or better performance. This database is designed to build either highly responsive or multi-regional applications or both. If you need that Cosmos DB might be the perfect option for you.

Key Characteristics:

- Globally distributed NoSQL (semi-structured data) Database service
- Schema-less
- Multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table Storage)
- Designed for
  - Highly responsive (real time) applications with super low latency responses <10ms
  - Multi-regional applications

# Azure SQL Database (pic 79) ![logo15](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo15.jpg)

It is our first service for storing structured data sets in Azure. This service allows both users and applications upload data to SQL database. Within SQL databse you define tables, each table entity will have a specific schema that each row within that table will have to follow. Of course within the database you can have more than one table with its own schema. Once the tables are defined you can also define relationship to represent business relationship between the entities.

Azure SQL database is your relational database service in the cloud. This is Platform as a Service but sometimes also called --> Database as a Service. Azure SQL is a structured data service because customers are using schemas and relationships to model their data to represent their business. Working with structured data has its benefits and one of those benefits is SQL (sequel query language or Structured Query Language) because databases like Azure SQL provides you with a rich Query Capabilities. Allowing you, your customers, your data engineers, data analysts to explore data in pretty much any way. So they can join multiple tables, they can reiew all the data and return and extract the data and provide reporting capabilities for your organization. But Azure SQL is not only the database itself, it is a platform and as a platform it provides customers with high performance, reliable, fully managed, secure database service. So customers can focus on building applications and very easily maintain security backups and monitoring for their SQL databases.

Key Characteristics:

- Relational database service in the cloud (PaaS)(DBaaS -Database as a Service)
- Structured data service defined using schema and relationship
- Rich Query Capabilities (SQL)
- High-performance, reliable, fully managed and secure database for building applications

(pic 80) If you have been working with the Microsoft BI technologies like SQL Server, you might already know the products available in SQL Server family like database, reporting, integration services and analysis services. If you move to Azure those products are represented as a separate services from the SQL Server family only Azure SQL database is a representation of SQL Server database and when it comes to other services they were either migrated as a similar service or recreated with a new design in mind.

# Azure SQL (pic 81)

It is a family of products with a similar capabilities and the one we learned just now was SQL database.

- SQL Database is based on a recent version, the most recent, stable version of SQL Server with a little bit less features designed for platform as a service offering.

- If you need full capabilities of SQL Server from On-Premis but in the cloud. Azure SQL also offers you a --> Managed Instance. This is much more pricey option but it gives you full capabilities. So if there are some features missing in SQL Database you can use Managed Instance.

- SQL Data Warehouse - this is version of the SQL server for massively parallel processing operations, for big data Data Warehousing and we will learn a bit more about this servis in future lessons.

- SQL VM - Azure SQL gives you ability to install SQL Server on a VM. This is an Infrastructure as a service option but it is also very close to Platform as a service. Because you get all the cool features of Azure SQL like backups, replication, security, monitoring and automated updates on operating system.

-But if you don't like SQL Server or you are migrating existing applications you might like an option with different database engine. And in Azure SQL those options are database for MySQL and database for PostgreSQL. Those are open source very widely, very commonly used database engines on the market. If you are migrating existing applications this might be the perfect scenario for you.

### How to use it

- Go to Azure portal and create SQL database
- fill form:
  - Subscription
  - Resource group
  - Database name
  - Server (creat server <-- giving admin login and password)
  - Want to use SQL elastic pool ? -> No
  - Compute + Storage (take basic size of the server)

Also, it allows you to add tables, column or make any queries using SQL in SQL database panel in Azure Portal. Go to SQL database and on the left side menu click --> Query editor. Then logIn to your database. Now you can write any queries and see all the tables in your database from Azure Portal SQL databse service.

Summary:
Cosmos DB which is globally distributed NoSQL Database in the cloud allowing customers to take advantage of low latency, multi-master which is perfect for building globally distributed applications and serversless applications. Azure SQL database is reliable relational database based on SQL Server. Azure Database for MySQL takes advantage of Azure SQL platform offering with MySQL database engine and similar case for PostgreSQL. Azure SQL delivers many great features but underneath it runs on a PostgreSQL database engine. Additionally if you need fully fledged SQL Server totally managed by Microsoft then you can take Azure SQL Managed Instance. This is more pricey option but with more features just like an On-Premise SQL Server and if some reason you need a total control over the Infrastructure then you can use SQL Server on a VM. Which is fully fledged SQL Server on Infrastructure as a Service. If you working with big data you might be interested in SQL Data Warehouse (SQL DW) it is part of Azure synapse analytics which is massively power processing version of the SQL Server, book big data and big data warehousing.

Azure Database Services Summary:

- Azure Cosmos DB - Globally distributed NoSQL database, low latency, multi-master, perfect for serverless.
- Azure SQL Databese - Reliable relational database based on SQL Server
- Azure Database for MySQL - Azure SQL version for MySQL database engine
- Azure Database for PostgreSQL - Azure SQL version for PostgreSQL database engine
- Azure SQL Managed Instance - Fully fledged SQL Server managed by cloud provider
- Azure SQL on VM - Fully fledged SQL Server on IaaS
- Azure SQL DW (Synapse) - Massively Parallel Processing (MPP) version of SQL Server
