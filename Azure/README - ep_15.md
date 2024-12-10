# Azure Big Data & Analytics Services | Synapse, HDInsight, Databricks

Big Data - is a filed of technology that helps us with solving typical challenges around extraction, processing and analysis of our data sets,information that is too large or complex to deal with traditional software. But typically in order to call something big data certain characteristics has to be met:

- First one is --> Velocity, it means how fast is our data arriving, how fast, how often do we need to process that data, are we processing that data in batches or maybe in real time.
- Second one is --> Volume, are we talking about megabytes, gigabytes, terabytes or even petabytes of data.
- Third one is --> Variety, it means how structured is our data, are we talking about tables or databases or maybe something very complex like Video or social media information.

Based on these 3 characteristics we can define whether this data is considered to be Big Data or Not. But as soon as we go high on one of those vectors, one of those characteristics traditional software will not be able to process this kind of data set. And this is how big data technologies came to be. They were specifically designed softwares to help us with those kind of challenges.

# Azure Synapse Analytics ![logo19](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo19.jpg)

![pic85](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic85.jpg)

In order to talk about Synapse Analytics and its benefits we need to talk about how typical process looks like when it comes to transforming an analysis of our data. Most data engineers will start their process by identifying where is their data, whether those are flat files, some web services or databases and from there a typical development process starts.
First developers need to ingest their data from their sources to the cloud then they need to transform those data sets and store them somewhere and after storing the data, expose this to other tools like reporting tools so that business users can take insights out of their data and make good business desicions. Azure Synapse Analytics help with all of those steps.
First of all by providing a feature called synapse pipelines - this tool helps developers to ingest and transform their data using visual workflows. Additionally Synapse Analytics comes with embeded apache spark - a leading technology for big data analytics and transformation. In addition their Synapse SQL - a massively parellel processing database clusters based on a popular SQL Server. This feature helps with transformation using typical SQL queries, string of your data but also serving it to your reporting clients. And all of that is baked into something called --> Synapse Studio. Synapse Studio which is a unified experience to manage all of those tools and features and perform all of your data transformation in a single place. All of that is nicely integrated with abother Azure service which is called --> Data Lake. So that ingestion transformation and storage of our data can be also done directly on the Data Lake.

Azure synapse analytics first of all and foremost is big data analytics platform. It is a paltform as a service (PaaS) offering in Azure.Allowing users, data engineers, data scientists to perform data analysis and data transformation over very large data sets and it has multiple tools baked in. Tools like apache spark or efficient big data transformations. Synapse SQL which allows us to use SQL server familiar tools with massively power processing design with dedicated or ad-hoc capasity. You also have synapse pipelines which allows you to visually build your ingestion and data transformation workflows. All of that is combined into a single studio experience, a unified experience for your data transformation needs.

Key Characteristics:

- Big data analytics platform (PaaS)
- Multiple components
  - Spark
  - Synapse SQL
    - SQL pools (dedicated-pay for provisioned performance)
    - SQL on-demand (ad-hoc-pay for TB processed)
  - Synapse Pipelines (Data Factory-ETL)
  - Studio (Unified experience)

# Azure HDInsight

![pic86](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic86.jpg)

As we were talking about the typical development process. HDInsight can also support pretty much every stage of that process by providing -> Big Data Clusters. And when it comes to HDInsight there are many clusters available. Clusters like -> Hadoop clusters, Spark, Kafka, HBase, Hive, Machine learning services or Apache Storm or many others. In general the idea of the service is to provide you with open source big data technologies from the market allow you to provision clusters so that Microsoft manages those clusters and you just grab the technology that you need to perform specific tasks that you need. All of these tools serve a different purpose but you can use them in combination to support end-to-end development lifecycle for your application.

Azure HDInsight is a flexible multi-purpose Big Data Platform in Azure. It is another platform as a service offering, allowing to choose from multiple open source technologies on the market whether this is Hadoop, Spark, Kafka or many of the other available technologies.

Key Characteristics:

- Flexible multi-purpose big data platform (PaaS)
- Multiple technologies supported ( Hadoop, Spark, Kafka, HBase, Hive, Storm, Machine Learning)

# Azure Databricks ![logo20](https://github.com/Julian22222/Clouds/blob/main/Azure/logo/logo20.jpg)

![pic87](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic87.jpg)

It is quite similar to HDInsight except the cluster that we create are based on Apache Spark and Apache Spark alone. The main purpose of this service is to help you with data transformation at large scale. Because Apache Spark is one of the leaders when it comes to performance and data transformations for big data. But besides the data transformation the creators of Databricks also wanted to provide this as a collaboration platform for data engineers and data analysts. So that they have a single place where they can manage their cluster and collaborate on their data solutions.

# How to use

![pic88](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic88.jpg)

- Go to Azure portal and create Azure Databricks service
- go to just created Databricks resource and press --> Launch Workspace btn (it will take you away from Azure Portal into separate portal, designed for collaboration on Azure Databricks solution, which is called Workspace )
- Then inside that new Workspace we press --> new cluster btn (create new cluster) (pic 88)
- By opening a new cluster panel we can specify a cluster (fill cluster form):
  - Name
  - Runtime Version
  - Autoscaling
  - etc.
- Then press --> Create Cluster (located in top center), it takes 4-5 minutes to create the cluster.
- Now we have a big data technology cluster based on Apache Spark. Running in the cloud and ready to be used.

Now we can create some scripts by going to Workspace.
![pic89](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic89.jpg)
Then you can have your personal workspace --> in Users section. Or in a Shared workspace section you can share and collaborate with other users.

-In personal workspace or Shared workspace you can create catalogs (by right click) --> and in catalog you can create --> Notebook.
-Notebook is a simple scripts in Azure Databricks, selecting the language which do you want to use in Azure Databricks.
-picture-->
![pic90](https://github.com/Julian22222/Clouds/blob/main/Azure/IMG/pic90.jpg)
Inside you just created Notebook you can write your scripts. This Script is connects to open datasets from Microsoft with some sample data. It takes just few lines of code, it is very simple and very straightforward.
-(pic 90)But when you pulling the Data you can use familiar SQL language in this case it is Spark SQL.
-Also from Notebook (bottom menu) you can download your Data as a CSV, change the chart type and do all sorts of data transformation and analysis based on your needs.

Summary:
Azure Databricks is a big data collaboration platform it is another offering from Azure in platform as a service category. But it is really about providing this unified workspace where users can manage their Notebooks, Clusters, Data and manage access to other users and collaborate with them. So that users can focus on their data solutions rather than on the management of their big data platforms. And it is based on Apache Spark- it is a leader when it comes to big data transformations on the market. It very well integrates with common Azure data services by having out of the box connectors so it is very easy to pull data out of Azure services and output data back after our transformations are done.

Key Characteristics:

- Big data collaboration platform (PaaS)
- Unified workspace for Notebook, cluster, data, access management and collaboration
- Based on Spark
- Integrates very well with common Azure data services

# Summary

- Azure Synapse Analytics - It is modern workspace for end-to-end approach for enterprise data warehousing & analytics over big data sets. (with a lot of integrated tools like Data Factory, Spark, SQL, etc.)
- Azure HDInsight - It is fully-managed open source analytics service with a lot of supported frameworks & tools like Hadoop, Spark, Kafka,Hive, etc. Tools that are currently marked as a leaders when it comes to processing of big data sets.
- Azure Databricks - It is Apache Spark based analytics platform for data transformation and collaboration analytics. Which very easily allows us to process big data sets by abstracting the difficult topics when it comes to big data platform management
