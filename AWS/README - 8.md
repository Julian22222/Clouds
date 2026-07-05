# Databases

![pic234](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic234.jpg)

![pic235](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic235.jpg)

![pic236](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic236.jpg)

![pic237](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic237.jpg)

![pic238](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic238.jpg)

# AWS RDS

![pic239](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic239.jpg)

![pic240](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic240.jpg)

![pic241](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic241.jpg)

![pic242](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic242.jpg)

# How to use RDS

- Search for RDS service -> Aurora and RDS
- On the left side menu bar you have - Databases
- Press --> create a Database

![pic243](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic243.jpg)

By default DB name - postgres (if you use Postgres)

It takes few minutes to create a DB.

To see all the Databases withinf RDS -> click on Databases on the left side menu bar (see pic below)

![pic244](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic244.jpg)

- then you can click on your existing DB -> and you can see some summary of your DB, we can see what Region it was launched, you can see DB endpoint - if you want to connect to it, you can see DB_PORT, VPC security groups - inbound rules/Outbound rules. Here you can connect you DB to EC2 /Lambda, Manage IAM Roles etc. (see pic below)

![pic245](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic245.jpg)

Also you can -> "Take snapshot" of your Database - from DataBase Dashboard by selecting correct DB and press -> Actions. Or from the you DataBase page by clicking -> Actions (see pic below)

![pic246](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic246.jpg)

Snapshot will allow you for example to restore your Database to another Region, make a copy, etc.

- then you go to Snapshot Dashboard (on the left side menu bar and click on certain snapshot) -> then you will see snapshot console (see pic below)

![pic247](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic247.jpg)

- then you can press -> "Restore snapshot" (it will allow you to create a new DB from this snapshot)- (see pic above). Reason to do so -> if you want to create bigger DB, or create a Copy of DB, or create different settings for DB

- Also, you can "Copy snapshot". This allows to make a Copy of DB to different region - it is very helpful if you want to restore your DB in different Region for Disaster recovery.

- Also, you can "Share snapshot". It allows to share you snapshot with other accounts so they can restore their Database directly from your snapshots.

#### Snapshots and Databses cost you money, if you don't need them - just delete them

When you delete your Database from AWS. Select only last block in the form before deletion. (see pic below)

![pic248](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic248.jpg)

# Different RDS Deployments

When you deploy RDS DataBases you need to understand multiple architectural choises that you can make.

![pic249](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic249.jpg)

1. RDS Read Replicas (see step 1 on the pic above)

For example: Application reads from your main RDS Database. But lets say now you need to scale your "Read Loads". In case you have more and more applications and they need read more and more data from RDS DataBase.

- In this case you can create "Read Replicas". It means there is going to be some copies/ some Replicas of your RDS Database that is going to be created and it is going to allow your applications to read from these "Read Replicas" also. Therefore you are distributing the "reads" to many RDS DataBases. You can create up to 5 "Read Replicas". You can see an example on the diagram - we have 2 "Read Replicas" on top of your main RDS Database. And your application(s) can read from all of these RDSs (main RDS and "Read Replicas").

But when it comes to writing data, writing data is only done to the main RDS Databse. Applications can only write to then main RDS Databse.

"Read Replicas" -> used to scale "reads" from Database

2. Multi-AZ (see step 2 on the pic above)

This is helpful when you have failover in case of AZ outage. When availability zone crashes and this gives you high availability.

- In this example your application(s) can read and write to the main RDS Database but we are going to set up "Replication cross AZ" in another/ different availability zone. And this is going to be - "Failover DB". This is way it is called - "Multi-AZ" because it is in different AZ. Now in case main RDS Database crashes for whatever reason (because there is any issue with DB, any problems with RDS DB ). Then RDS will trigger a "Failover" and your application will failover to "Failover Databsae" in diffrent AZ. In this case data is only read and written to the main Database but "Faiover Database" is passive and is not accessible until there is an issue with the main Database. You can have only one other AZ as failover AZ.

3. Multi-Region (see step 3 on the pic below )

This is for Read Replicas but this time instead beeing in the same Region they are across different Regions. For example: we have eu-west-1 for RDS Database and we are going to create "Read Replica" DB in - us-east-2. And applications in us-east-2 can read locally from this "Read Replica" DB. But any time this application need to write data, the writes need to happen cross region, need to write the data to the -> main RDS DB - to eu-west-1. The same if you have another region in ap-southeast-2 (in Australia) - you have the same concept.

Why you need Multi-Region deployment?

- because if you want to set up a disaster recovery strategy in case of region issue. If eu-west-1 is having regional issue -> then you have a backup in ether us-east-2 or ap-southeast-2. This is it why it is a disaster recovery strategy.

Also, applications that are in different regions get better performance because they read from local Database. So they have less latency.

You need to understand, because you replicating the data across regions then there is going to be a replication cost associated with the network transfers of data between regions.

![pic250](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic250.jpg)

# Amazon ElastiCache

This is a second type of Database

![pic251](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic251.jpg)

ElastiCache - it is in-memory managed Database

![pic252](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic252.jpg)

# DynamoDB

![pic253](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic253.jpg)

![pic254](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic254.jpg)

![pic255](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic255.jpg)

# How to use DynamoDB

- Search for DynamoDB service
- click -> Create table
- fill the form (see pic below)

Here we are creating a Table without creating a Database. Database already exists, it is serverless. We don't need to provision service.

![pic256](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic256.jpg)

- then go to DynamoDB console and click on just created table

![pic257](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic257.jpg)

- then click on -> Explore table items (see pic below) to insert some data to our table

![pic258](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic258.jpg)

- then - create new items (add new row of data to your Table) (see pic below)

![pic259](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic259.jpg)

- then you add key - value pairs with the data type (see pic below)

![pic260](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic260.jpg)

- then you press -> Create Item and it will be added to your Table

📍 You don't need to specify any Database just your Table.

DynamoDB is NoSQL/ Non-Relational Database -> each item can have diferent data. It is very flexible type of Databse, can insert different keys and values - There is no schema like in Relational Databse/SQL DB.

### Difference between RDS and DynamoDB

- in DynamoDB all data is living in one/single table and there is no way to join/link your table with another table.

# DynamoDB - Global tables

For example: you create a DynamoDB Table in - us-east-1 region and setup this as a Global Table. Now users can read and write to this DynamoDB Table in N.Verginia (us-east-1). But it is possible for you to setup some replication for this (us-east-1) Global table. So we can create a new Global table in Paris (eu-west-3) and will say they are the same. So you have 2-way replication between these 2 tables. It means the same data is in "us-east-1" and "eu-west-3" but users that are close to Paris region can access this (Paris eu-west-3) Global Table with low latency in Paris. You can create 10 Global Tables in 10 different regions if you want. Global Tables allow to read and write to the table in any specific region and then it will replicate between other Global Tables that are connected in different regions. So user has read/write access to any Global Table. (see pic below)

![pic261](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic261.jpg)

# Redshift Overview

This is next Database that we have in AWS

![pic262](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic262.jpg)

RDS is good for OLTP

- Redshift is very good at analising data and making some computations. Also can build some kind of visualisations through dashboards on it.

# Amazon EMR

Another type of Database in AWS that works with Big data and analyse it.

EMR actually not really a database it helps to create Hadoop clusters (when you want to do Big Data on AWS). Hadoop clusters are used to analise and process vast amount of data. Hadoop is open source technology that allows multiple servers that work in a cluster to analise the data together.

![pic263](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic263.jpg)

# Amazon Athena

How the Athena works?

Users will load the data to Amazon S3 and then -> Amazon Athena will be used to query and analyze the data. And then -> if you want you can do some Reporting on the top of Athena, such as using Amazon QuickSight (see schema on the pic below)

![pic264](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic264.jpg)

![pic265](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic265.jpg)

# DocumentDB

The same way as AWS Aurora it is a AWS designed and improved version of PostgreSQL /MySQL for AWS only. DocumentDB is the same as mongoDB but in AWS. DocumentDB is based on top of the mongoDB technology. It is compatable with mongoDB

![pic266](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic266.jpg)

# Amazon Neptune

![pic267](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic267.jpg)

# Amazon QLDB

![pic268](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic268.jpg)

Difference between QLDB and Amazon Managed Blockchain that with QLDB there is no concept of decentralization, that means there is just central database owned by Amazon that allows you to write this journal. And this is inline with many financial regulation rules.

Difference between QLDB and Managed Blockchain that QLDB has s central authority components and it is a Ledger where as Managed Blockchain is going to have decentralization component.

# Amazon Managed Blockchain

![pic269](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic269.jpg)

# DMS - Database Migration Service

We have so many different Database technologies and the question is how do you migrate data from one Databse to another one? For this purpose we can use DMS.

So we have a source DB and we want to extract the data, so we will run EC2 instance that will be running DMS software. It will extract the data from source Database and DMS will insert the data into target Database that will be somewhere else (see diagram on the pic below)

![pic270](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic270.jpg)

# AWS Glue

ETL is very helpful when you have some data sets but they are not exactly in the right form or correct format to do analytics on them. So in this case you will use ETL service to prepare and transform the data.

How it works? (see diagram on the pic below) For example: we have Glue ETL and we want to extract the data from both - S3 Bucket and Amazon RDS databse. For this we use Glue ETL to extract the data from both resources and then once the data is extracted there is a Glue service and we will write a script to do a Transform part. Here Glue will help to transform the data and once it is transformed we need to analyse it - so we can load that data into for example into Amazon Redshift database where we can do analytics the right way. The Glue is very powerful tool - it can do any kind of data extraction, transformation and then can load it into many different places.

There is another service which is called - Glue data Catalog. This Glue data Catalog will have reference of everything - column name, field name, filed type, etc.

![pic271](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic271.jpg)

# Databases & Analytics Summary in AWS

![pic272](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic272.jpg)
