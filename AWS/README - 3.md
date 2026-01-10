# IAM service (Identity and Access Management - IAM)

IAM is a Global Services, has a Global Region

![pic21](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic21.jpg)

Users and Groups are needed to allow them to use your AWS Account and give them certain permissions for some services (see pic below)

![pic22](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic22.jpg)

On the left hand menu bar you have section to create Users, Groups, Roles, Policies, etc. (see pic below)

![pic23](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic23.jpg)

You use Root User for now (I have all permissions in my Account, I can do anything I want, therefore it is very dangerous account to use, by mistake you can delete soem DB, etc.). The better way to create new -> Admin User (new user Account), giving almost all the permissions. And we use Route Account only if we really need it. This is from security perspective best setup. And mostly work from Admin User Account.

fol 4 - ep15

# IAM Policies inheritance

- For example we have a group of Developers - Alice, Bob and Charles. And we attach a policy at the group level. In this case the policy will apply to every single member of the group. All the users - Alice, Bob and Charles, they all get access and inherit this policy, that was assigned to the Developers Group.
- Then we have a second group - Operations Group with different policy. David and Edward will have different policy than the Developers Group.
- If Fred is the user and he is not belongs to any of the groups, (there is possibility to not belong to Group), therefore we can make - inline policy. This policy only attach to a user. Inline policy allows to atach the policy to a specific user to for a group of users.
- Also, the same Users can be in different Groups and inherit those group policies. Charles and Devid have Audit Group with different policy.

![pic24](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic24.jpg)

# IAM Policies Structure

see below policy json form -->

![pic25](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic25.jpg)

On the left hand side menu - if you click Polices, Then Search for your policy then click on your policy. And you can read about it, what is allowed and what is denied for a specific policy. (see pic below)

Also, here you can create your own policy by adding manualy what is allowed and what is denied or create - policy json form. (see pic below)

![pic26](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic26.jpg)

# IAM - Password Policy

We need to protect our Users and Groups, so we can do it by 2 defence mechanisms:

1. Password Policy

![pic27](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic27.jpg)

2. Multi Factor Authentication - MFA

![pic28](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic28.jpg)

# MFA devices options in AWS

![pic29](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic29.jpg)

![pic30](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic30.jpg)

# How to setup Passward Policy of your Accounts

1. In IAM Console, on the left side menu bar, Go to Account settings. (step 1)

![pic31](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic31.jpg)

2. Here you can change passwords for your IAM users (step 2)

![pic32](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic32.jpg)

# How to setup MFA for our Root Account

it is very important to protect because it has full power of your account. That gives you higher security on your account. But you need to be carful to don't loose your MFA tokken or the phone or other device, otherwise you won't be able to login to your account!!!

1. From AWS any page - Click in the left top corner, to your Account button (step 1). And then click on the Security Credentials (step 2)

![pic33](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic33.jpg)

2. Then click assign my MFA device
3. Then choose what MFA device do you want to use - Virtual MFA, U2F security key, Other hardware MFA devices. To make MFA for your phone --> choose Virtual MFA device.

4. Then you will see a link of available mobile application to install on your phone to use for MFA, to generate passwords on your mobile phone and insert it in AWS when you login. (see pic below). Different application for Android and IPhone.

![pic34](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic34.jpg)

5. Then click in AWS -> show QR code and scan this QR code by your mobile phone installed app (by clicking + Add Account in the app), to link your phone to your AWS account
6. Then add codes from the phone to AWS to link

# How can users access AWS ?

- CLI - allow to access AWS from the terminal
- SDK - is used when you want to call APIs from AWS from within your application code
- If you generated your own Access keys, DO NOT SHARE IT !!!!
- Generated Access Keys will allow to access AWS API

![pic35](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic35.jpg)

![pic36](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic36.jpg)

![pic37](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic37.jpg)

![pic38](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic38.jpg)

- To install AWS CLI - you put in google --> AWS cli install linux (install CLI version 2 <-- it is the latest version)

[ --> Download Here <--](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

- it should be a link to install AWS CLI on your machine. Then you can use linux terminal to interact with AWS.
- Check if you installed AWS CLI by typink interminal -->

```JS
aws --version
```

# How to create AWS Access Keys?

- Access Keys can be used in many places.
- For example, If you want to work with your AWS CLI from terminal you need to connect your terminal and your AWS. Therefore you need AWS Access Keys.

- To create Access Keys:
  - If you need to create access key - DON'T USE your ROOT Account to create security credentials!!!! -> USE IAM USER ACCOUNT
  - From IAM Console you click --> My security credentials (step 1) or from any AWS page you click on the top right corner, on your Account button and then --> Security credentials
  - Then you you click --> create access key

![pic39](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic39.jpg)

Access key you can download on your computer, because you will see your access key only once when you just created the Access key. Then you won't see it anymore. (see pic below)

![pic40](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic40.jpg)

- Then we can use Access key ID and Secret access key in our terminal. To connect your AWS and AWS CLI we put in terminal-->

```JS
aws configure
```

- Default regionname --> choose that is close to you
- Defaul output format --> leave blank, by hitting enter button

And now you can use your terminal to interact with your AWS, for example by typing -> aws iam list-users

![pic41](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic41.jpg)

- It will list all the users in my account

![pic42](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic42.jpg)

# AWS CloudShell - terminal in your AWS Cloud

it is not available in every Region

![pic43](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic43.jpg)

- you can split the terminal on two columns for example, add new tab and etc. by clicking button -> Actions

```JS
pwd //<-- to know the full path to the file in terminal

// it is helpfull if you want to ssave some file or upoad a file to your AWS CloudShell

echo "test" > demo.txt   //<-- create a file with text inside in the CloudShell
cat demo.txt  //<-- read the file demo.txt

//If you added some files to CloudShell, it stay there. Untill you will delete them

//then you can download the file to your computer if needed --> by clicking
```

![pic44](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic44.jpg)

- If you want to download some file from AWS CloudShell, press Actions (pic above and Download file) and thed add the full path to the file, to download your file for example from AWS CloudShell-->

```JS
/home/cloudshell-user/demo.txt
```

# IAM Roles (is used for Services)

- permissions for AWS services to communicate with certain services only
- similar to User permisions but it is not used to by physical peopel/Users - it is used by AWS services

![pic45](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic45.jpg)

Example:

- we create EC2 service - and this service can perform some actions on AWS. But we need to give permissions to EC2 ti communicate only with PSQL service (for example, it can be any service). Therefore we need to create IAM Role. Then when EC2 trying to access some information from AWS then it will use IAM Role and if the permision is assigned to IAM Roel is correct --> the we EC2 will get the access.

# How to create IAM Role

IAM roles are a secure way to grant permissions to entities/services you trust

in IAM -> Roles --> Create role

![pic46](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic46.jpg)

- Then, you will see another window, where you can create a role for AWS services or a role for other options entities. (see pic below)

![pic47](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic47.jpg)

- There are a lot of AWS services (see pic above) that can use roles. But in most use cases are used EC2 and Lambda

For example if you want to use EC2 to give a role:

- Go to IAM --> Roles --> create role --> choose EC2 from the AWS services
- Then you click on EC2 instance/service and choose what your EC2 service will be able to do.
- Then you name your Role - (DemoRoleForEC2 <- as example) and give tags.
- And then - hit create role.
- New role will appear in Roles main console list --> (see pic below).

![pic48](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic48.jpg)

- Basically you create a template, create IAM Role which will have some policies (rules that is allowed to do for some Instance). And it will be added to all IAM Roles list, but letter you need to assign this IAM Role (with those policies that it has) to some Instance.
- To assign this IAM ROLE -> you go to your EC2 -> Instances -> click on some Instance that you have -> then you can attach this Role to your choosen Instance. (allowing to do only certain tasks that you mentioned in policies that are inside IAM Role) (see 3 pictures below)

![pic100](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic100.jpg)

![pic101](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic101.jpg)

![pic102](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic102.jpg)

The correct way to -> create your own Roles -> where you define only certain actions that the service/Instance can do. For example: you want that some certain service has read only Database policy access and no write access.

When you choose from AWS Roles - it has all common access, if you choose some policy. It will have all read, write, etc. but you need to make fine adjustments within the Role.

# IAM Security Tools

What kind of security tools we have in IAM?

We can create:

1. IAM Credentials Report at your account level or
2. IAM Access Advisor at the user-level

![pic49](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic49.jpg)

### IAM Credentials Report

- In IAM main dashboard, on the left menu bar click - Credential report --> then Download credential report (see pic below)

![pic50](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic50.jpg)

this downloaded file contain a lot of data (see pic below):

```JS
root account      |  when user was created  |  passward enabled  | passward last used  | passward last changed  |  when is password updated  |  MFA active  |  access key  | other data about this account
IAM user account  |  when user was created  |  passward enabled  | passward last used  | passward last changed  |  when is password updated  |  MFA active  |  access key  | other data about this account
```

![pic51](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic51.jpg)

Sometimes it is very helpful if you want to see when user last time changed his password or other stuff

### IAM Access Advisor

- In IAM main dashboard, on the left menu bar click - Users --> click on the user (see pic below)

![pic52](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic52.jpg)

- Then in the current user console -> click on Last Accessed (step 1). And you can see all the logs of this current user, what he used in AWS, all the activity of the user within AWS (step 2) (see pic below)

![pic53](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic53.jpg)

lower in the user activity or on next pages you can find - Not accessed in the tracking period, (so the user has not used those services). So we can remove those permissions (Not accessed in the tracking period) from this current user, because this user is not using these services. (see pic below). Usually many pages of user activity are taken by - Not accessed in the tracking period.

![pic54](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic54.jpg)

This is whole power of IAM Access Advisor, you can see what user is using but the rest remove from that user permissions.

# IAM Guidelines & Best Practices

![pic55](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic55.jpg)

- Don't use your root account except when you setup your AWS account. Use your own personal account - IAM user account

# Shared Responsibility of AWS and user

![pic56](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic56.jpg)

# Summary

![pic57](https://github.com/Julian22222/Clouds/blob/main/AWS/IMG/pic57.jpg)
