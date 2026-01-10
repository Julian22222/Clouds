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

09 -ep101
