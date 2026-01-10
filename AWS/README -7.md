# S3

![pic184](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic184.jpg)

- "infinitely scaling" storage - means you can store as many objects as you want (with no limit) on Amazon S3
- Many AWS services uses Amazon S3, for example -> EBS Snapshot are stored in Amazon S3, we don't see it but it what is happenning under the hood.

# S3 Use cases

AWS S3 is very flexible and universal storage to store objects on it with many features.

![pic185](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic185.jpg)

![pic186](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic186.jpg)

![pic187](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic187.jpg)

![pic188](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic188.jpg)

# How to use S3

- Go to S3 service and press -> create bucket and fill the form (see pic below)

![pic189](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic189.jpg)

- then you will see S3 Dashboard with all yours S3 buckets, -> click on needed S3 bucket (see pic below)

![pic190](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic190.jpg)

now you will be able to add objects

![pic191](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic191.jpg)

# S3 Security

- Resource Based - Bucket Policies - it is a rule attached directly to S3 bucket to allow or deny requests coming from other accounts or public requests, etc.
- ACLs - you can define at object level, how can do what

![pic192](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic192.jpg)

# Different accesses to interact with S3 bucket

![pic193](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic193.jpg)

![pic194](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic194.jpg)

![pic195](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic195.jpg)

![pic196](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic196.jpg)

# S3 Bucket Policies

![pic197](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic197.jpg)

![pic198](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic198.jpg)

# Give Public access to your objects

- Go to your S3 Bucket and click on deeded S3 bucket
- Then click on -> "Permissions" section (see pic below) -> then disable/ turn it off (see diagramm on the pic above)

![pic191](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic191.jpg)

- in the same "Permissions" section -> you need to add the Bucket Policy

```JS
//Example, you just choose all this from drop down manu what you add

{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Effect": "Allow",   //<-- allow -> Action - s3:GetObject (Get object from S3)
			"Principal": "*",  //<-- allow everyone
			"Action": "s3:GetObject",  //<- in Actions dropdown menu find "GetObject"
			"Resource": "arn:aws:s3:::aws-s3-bucket-demo-test12344/*"   //<-- you need to get - arn of root S3 bucket in "Proporties section" (see pic below) and add + "/*" (that means all the objects in root folder can be Publicly accessed)
		}
	]
}
```

![pic199](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic199.jpg)

# S3 Websites

![pic200](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic200.jpg)

# How to host static website on S3 Bucket

- we upload -> for example: somefile.html -> to S3 Bucket
- then go to that Root S3 Bucket where you uploaded html file -> click on "Properties" section and scroll down to find -> "Static website hosting" section and select -> Enable, Host a static website
- then in the same "Static website hosting" section you need to specify the document name to use for static website -> somefile.html
- for "Error document" we can put error.html (but this file not existing, we don't have any error.html) this is to avoid any errors
- Also make S3 Bucket Policy Publicly readable as we did it before (see diagram on the pic below)

![pic198](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic198.jpg)

- then -> save the changes

Now our S3 bucket allow to access your static website hosting

- go to the same Root S3 Bucket where you uploaded html file -> click on "Properties" section (see pic below)

![pic199](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic199.jpg)

- then in "Properties" section scroll down to find -> "Static website hosting" section -> in "Bucket website endpoint" subsection you will get URL for your static website

- Also, if you have other pictures in the same Root S3 Bucket you can access them through URL -> using URL for your static website + filename(or path to the file from S3 Root folder)

# Amazon S3 - Versioning

🧠 What S3 Versioning is (in simple terms)

Without versioning:

    Upload photo.jpg → replaces the old one
    Delete photo.jpg → file is gone

With versioning enabled:

    Upload photo.jpg → S3 creates a new version
    Old versions are still stored
    Delete photo.jpg → S3 adds a delete marker, file is not actually removed

🧱 How it works internally

Each object gets:

    Object key (file name)
    Version ID (unique)

```JS
//Example:

photo.jpg

├── Version v1 (old image)

├── Version v2 (new image)

└── Delete Marker (if deleted)
```

🔁 Common operations with versioning

1️⃣ Uploading a file

    Same file name uploaded again
    S3 creates a new version
    Latest version is returned by default

2️⃣ Deleting a file (important!)

When you delete an object:

    S3 does NOT delete the data
    It creates a delete marker
    The object appears deleted in normal listings

You can:

    Remove the delete marker → object comes back
    Permanently delete a specific version → irreversible

3️⃣ Retrieving files

    Default GET → latest version
    Specify a version ID → retrieve that exact version

🔐 Permissions & versioning

To work with versions, IAM permissions may include:

    s3:GetObjectVersion
    s3:DeleteObjectVersion
    s3:ListBucketVersions

💾 Storage & cost impact

⚠ Important:

    Every version counts as stored data
    Deleting a file does not reduce storage cost
    Old versions cost money until deleted

Best practice:

    Combine versioning with Lifecycle Rules

🧹 Lifecycle rules (very common)

Example:

    Keep last 3 versions
    Move older versions to Glacier
    Permanently delete after 90 days

This controls cost while keeping safety.

🔒 Versioning + security features

Versioning is required or strongly recommended for:

    Object Lock (WORM compliance)
    Ransomware protection
    Accidental delete protection

⚙️ Enabling versioning

    Enabled at the bucket level
    Once enabled, it cannot be disabled (only suspended)
    Suspending stops new versions but keeps existing ones

🧠 When you SHOULD use versioning

✅ Important data
✅ User-generated content
✅ Backups
✅ Compliance & auditing

If want to replace, update the files and keep the previous versions of our website, files, images as well if possible -> so you can Enable Versioning for your files in S3

![pic201](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic201.jpg)

# How to use S3 Bucket Versioning

- to enable bucket versioning -> go to S3 bucket Console -> "Properties" section (see pic below) -> and click - Enable bucket versioning

![pic191](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic191.jpg)

OR

- to enable bucket versioning -> go to S3 bucket Console -> click on file that needs "bucket versioning"
- then in "Properties" section or "Versions" sections -> select enable.

Also, when you upload the file to S3 bucket you can enable "Bucket versioning" straight away.

After Enabling "Bucket Versioning" -> when you upload the file with the same name, -> the file will get version. S3 bucket will store all the files.

```JS
//Example of version: (it is mix of numbers and letters)
5ac9RS91LYVCbgQ1GD_cycPsEX.XeVzD
```

- To find all the versions of the file -> in your S3 bucket -> click on your file (file that you want to chec the bucket versioning) -> click on "Versions" section and the AWS use last verion by default

You can delete specific version of Uploaded file - if you have few versions of uploaded file and you Enable "bucket versioning".

# S3 Access Logs

How we can understand what activity is happening within S3 bucket?

![pic202](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic202.jpg)

See diagram on the pic above. When you enable the settings/ enable S3 Access Logs

- then Request will be made on your bucket and automatically your bucket thaks to the settings will be logging all the request into -> Logging Bucket, that we can analise later on.

# How to enable server Access loging - S3 Access Logs

- If you want to see all the activity of your certain S3 bucket - it is called source bucket (For example name of the bucket = "mainBucket")
- Create new bucket for logs - is called target bucket (For example name of the bucket = "LogsBucket")
- then go to your Root S3 bucket - source bucket ("mainBucket") -> "Properties" section (see pic below) -> and find -> "Server access logging" -> and press - Enable

![pic191](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic191.jpg)

- then you need to define -> the Target bucket, that you just created (The name and path of the bucket where all the Logs will be located)

```JS
//Example of Target bucket:
s3://LogsBucket/logs
```

- if you click on any S3 bucket object (within "mainBucket" - it is called source bucket), then open object URL, delete the object, etc. any actions within your S3 bucket
- all this activity will be in -> logs bucket ("LogsBucket" - it is called target bucket). The logs will not appear immediately in that new bucket it will appear after some time.
- you can click on target bucket ("LogsBucket") - bucket that you created for logs and you will see all the logs after some time, logs do not appear immediately
- then you can select specific log in the list -> click "Actions" (see pic above) -> and download ( to see the activity of that log)
- then the way how to read this file (go to "Server access logging documentation" in AWS - it will tell you how to read that downloaded file and analise it)

# S3 Replication

You can enable replication for your S3 buckets. It can be Cross Region Replication (CRR) or Same Region Replication (SRR)

![pic203](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic203.jpg)

# How to use S3 bucket Replication

- you have your main bucket- source bucket (with some content- objects to replicate to another bucket)
- for S3 bucket Replication -> create new bucket(target bucket), where you want to replicate the content from another bucket. (for example target bucket name(replication bucket): demo-julian-replication-2026)
- this replication bucket can have different Region or the same Region as your "main bucket"- source bucket (from where you want to copy the objects)
- IMPORTANT--> you need to Enable Versioning in source bucket and target bucket (replication bucket) for replication to happend and work

Now we have our main bucket- source bucket and replication bucket- target bucket. To setup replication from main bucket to the replication bucket.

- go to your main bucket(source bucket) -> and click on "Management" section (see pic below) and there find -> "Replication rules" -> press "create a Replication rule"

![pic191](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic191.jpg)

- when you press "create a Replication rule" - you need to fill the form (see pic below)

![pic204](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic204.jpg)

# Different S3 Storage Classes

![pic205](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic205.jpg)

Before we go to the classes lets define the concept of Durability and Availability

![pic206](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic206.jpg)

![pic207](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic207.jpg)

![pic208](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic208.jpg)

![pic209](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic209.jpg)

![pic210](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic210.jpg)

# S3 Storage comparison in one table

![pic211](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic211.jpg)

![pic212](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic212.jpg)

# How to use S3 Storage Classes

If you upload the file to your S3 bucket, by default it will have - "Standard" storage class.

If you want to check the object Storage class type you can do it in S3 console (see pic below)

![pic213](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic213.jpg)

- you can choose the S3 storage class when you upload the file to the S3 bucket
- When you upload the file to S3 bucket --> press "Properties" arrow and choose the S3 storage class from the list (see pic below)

![pic214](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic214.jpg)

also, you can change the S3 storage class -> click on the file that needs to change the storage -> "Properties" section -> Storage Class

### We can automate moving objects between different storage classes

- go to main bucket- source bucket -> "Management" section (see pic below)

![pic199](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic199.jpg)

- then press -> create a Lifecycle rule. It is a rule where you say after for example 30 days move your uploaded fle to different Storage class, and you specify after how many days and where to move the file, in what storage class ( see pic below )

![pic215](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic215.jpg)

![pic216](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic216.jpg)

# S3 Encryption

![pic217](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic217.jpg)

- No Encription -> Scenario: user wants to upload a file to AWS S3 bucket, user just send the file to S3 bucket and it is uploaded as it is. This is no encription type of scheme.
- Server-Side Encription -> Scenario: user wants to upload a file to AWS S3 bucket, user upload the file to S3 bucket but this time because it is Server-Side Encryption, the server is going to encrypt the file on the server side. Red lock on the diagram <- means that the server encrypts the file after receiving it. We do encryption to protect the file against unauthorised usage.
- Client-Side Encryption -> Scenario: user wants to upload a file to AWS S3 bucket, user will encrypt the file before uploading it. Encryption is happening on the client side and then it is uploaded to AWS S3 bucket.

# Shared Responsibility for S3

![pic218](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic218.jpg)

# AWS Snow Family

![pic219](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic219.jpg)

# Data Migrations with AWS Snow Family

![pic220](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic220.jpg)

![pic221](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic221.jpg)

# What Snow devices AWS has

![pic222](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic222.jpg)

![pic223](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic223.jpg)

![pic224](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic224.jpg)

![pic225](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic225.jpg)

![pic226](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic226.jpg)

The second use case for a Snow Family is ->

![pic227](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic227.jpg)

![pic228](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic228.jpg)

![pic229](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic229.jpg)

# How to use Snow Family

- Search for --> Snow Family service
- Then press -> Order an AWS Snow family device
- Then you choose, what is the purpose -> Import data /export data/ edge computing

# Hybrid Cloud for Storage

![pic230](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic230.jpg)

# Summary of Storage options in AWS

![pic231](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic231.jpg)

![pic232](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic232.jpg)

# AWS S3 Summary

![pic233](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic233.jpg)
