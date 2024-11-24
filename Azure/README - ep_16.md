# Azure Artificial Intelligence (AI) Services | Machine Learning Studio & Machine Learning Service

Artificial Intelegence (AI) - is a branch of computer science where we use our software to simulate human intelligence and capabilities.

Machine Learning - is a subcategory of AI where we use that software and we teach it to draw some conclusions and make some predictions based on our data. And the process of teaching the software to do that is called - building a model. And a the key service to do that in Azure is -->

# Azure Machine Learning (pic 91)

Typically the process of building a machine learning model consist of training the model based on our data then packaging and validating that model. If we are happy with the results we can deploy those models as a Web Services then monitoring those services and retraining the model to get even better results.
Azure Machine Learning is here to help us with this entire process by providing us with set of tools:
-Tools like notebooks written in Pyton or R or
-a visual designer which allows us to build machine learning models using a simple drag and drop experience directly in our browsers.
-Additionally machine learning models allows us to manage all the compute resources where we train package validate and deploy those models. So we don't need to worry about Azure infrastructure and underlying resources ourselves.
-Additionally Azure machine learning comes with something caled - AUTO ML, this is automated process allows us to drop random algorithms at our data and see which one scores the best and deploy that as our designated Web service.
-And lastly there is also a feature of pipelines which allow us to build this entire process end-to-end.

Whether we are using those notebooks, designer or auto tools. This is complete end-to-end solution for building machine learning models.

## How to use Azure machine learning

In Azure Portal there is not a lot of things we can do, there are very few blades when it comes to management of machine learning workspace.

- Create resorce
- find Azure machine learning service
- then go to just created resource --> press Launch studio btn (pic 92) or hit the URL. It will allow to go to machine learning workspace
- Clicking on --> Launch studio btn /or URL will open Azure Machine Learning Studio.

Azure Machine Learning Studio (pic 93) - It is a Web-based visual interface for management of entire Azure Machine Learning Service.
For example on left side menu bar we have: (pic 94)
-Notebooks
-Automated ML
-Visual designer

- Let's go to the Notebook first. This is a workspace where you can create your own scripts or instead you can try out some samples provided by Microsoft. Navigate to any Notebook that you like, read the tutorial and execute the provided samples and you will build your machine learning model in no time.
- Or instead of writing scripts, try Automated ML which allows you to throw random algorithms at your data, making some small parameter corrections and see which model score the best and deploy that as a Web service.
- If this wasn't enough you also have Designer, It is a visual way of building machine learning models with a drag and drop features.

(pic 94) Machine Learning has also a lot of features around asset management (in Asset section, on the left side menu bar). Assets like Datasets, Experiments, Pipelines, Models that you have built and Endpoints that you deploy those models to. There is also plenty of other feature which allow you to manage your compute resources (pic 94, left side menu bar)
-Compute, where you train and deploy your models.
-Datastores, where you connect to your data sources in Azure. For example Azure Blob Storage and Azure File Share.
-Data Labeling

Let's go back to Designer. Where you can build your own machine learning model using a visual experience. Click on --> + (pic 95). Before we begin, we can create a compute target, so a simple Virtual Machine that will run our workflow.

- Then we click --> Select Compute target link
- Then, Press --> Create New and give it a name

Summary:
Azure Machine Learning isan end-to-end cloud-based platform for creating, managing and publishing of our machine learning models. This is a Platform as a service (PaaS). A top level resource in Azure machine learning service is called machine learning workspace. Workspace ties everything together, all compute resources, all the permissions, all the runs, pipelines, experiments, history, connection to external services like Azure Storage accounts, Container registry, deployments of your model literally everything is managed through Azure Machine Learning workspace. Machine Learning Studio is a Web portal that we are using for end-to-end management of the workspace.

A QUICK NOTE (pic 96)--> In the past there was another service called Machine Learning Studio. This is completely different from the one that we are talking about today. Because that service is no longer actively being developed and new customers are being encouraged to use new Machine Learning because it also has studio experience with some additional features. The key features that you get by using Azure Machine Learning service are Notebooks(written in Pyton or R), Automated ML - where you can throw a lot of algorithms and tweak some parameters to find best algorithm and to build the best model for your data. With Visual Designer you can build your machine learning pipelines without writing a single line of code. You can also manage your data and compute resources. So all the resources to manage and store your data as well as process those models and deploy them as a web services. And lastly everything is nicely tied into Azure Machine Learning pipelines which allow you orchestrate this model training deployment and all the management tasks.

Azure Machine Learning Key Characteristics:

- Cloud-based platform for creating, managing and publishing machine learning models
- Platform as a Service (PaaS)
- Machine Learning Workspace - top level resource
- Machine Learning Studio - web portal for end-to-end development
- Feature:
  - Notebooks - using Python and R
  - Automated ML - run multiple algorithms / parameters combinations, choose the best model
  - Designer - graphical interface for no-code development
  - Data & Compute - management of storage and compute resources
  - Pipelines - orchestrate model training, deployment and management tasks
