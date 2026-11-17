# How to work with EC2 Instance

1. create EC2 Instance on Ubuntu
2. than connect to your instance through EC2 Instance Connect or SSH
3. Setup EC2 Instance:

```JS
//put in EC2 instance terminal
// to update and upgrade all packages on the EC2 to make sure you use the latest versions, including security paches

sudo apt update
sudo apt upgrade

//then install node on EC2 Instance if you are planning to run Node.js application and use that to run JavaScript code
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
//or
sudo apt install nodejs -y

//to check that Node.js was installed -> node --version
//to use node.js in terminal, type -> node, then you can console.log("Hello World")
```

Now it is complete Linux machine, you can install whatever you need for your Application

3. then you need to copy source code to EC2 instance in the cloud:

- Easiest way to clone from GitHub: Clone from GitHub (BEST & most common option)

```JS
//put in EC2 instance terminal

sudo apt install git -y   //Install git on EC2 Instance

git clone https://github.com/your-username/your-repo.git  //clone your Repo

cd your-repo  //Go into project, correct folder - bank-api

sudo apt install npm -y //install npm package

npm install  //Install dependencies

npm run build //create dist folder(TypeScript convert to JavaScript)
//before "build" -> for F-End add in EC2 terminal-> export NEXT_PUBLIC_BACK_END_URL=..... or/and any other process.env values that you use in your app
//my B-End uses AWS Systems Manager/Parameter Store (store my secrets there)

sudo npm install -g pm2 //install PM2 globally

//in Production use this one
//This command allow to pass any environment variables when you start running your server,
pm2 start ecosystem.config.js
//ecosystem.config.js file contains and can have other variables that application needs for running:
// env: {
//   NODE_ENV: "production",
//   USE_AWS_PARAMETER_STORE: "true",
//   PORT: 3005,
// }

//Then when pm2 start the server it sees -> process.env.USE_AWS_PARAMETER_STORE === "true"

//Imagine your app needs 15 variables, with ecosystem.config.js file you can easily define them, and make them available from server start running

-----------------------------------------

//localy run app-> Development environment
cd bank-api
npm run start:dev

cd bankapp
npm run dev

----------------------------------------

    //Here is another option that also works to start your server ->
    //you can use it if you don't need to pass any environment variables to your App
    // but it runs your app without environment injection rules (defined environment variables)
    // -> AWS Parameter Store never loads, DB_HOST = undefined, JWT_SECRET = undefined

    //NestJS cannot run TypeScript directly in production
    // cd dist/src //go to dist/src folder where is main.js file

    // npx pm2 start main.js --name bank-api (start server)
    // //or sudo npm install -g pm2 -> pm2 start main.js --name bank-api

    //this option does not automatically know that you want:
    // NODE_ENV=production
    // USE_AWS_PARAMETER_STORE=true
    // PORT=3005

    //Therefore- Bank/bank-api/src/main.ts
    // const useAWS = false; //<-always false
    //await loadParameters(); //<--never runs in Production


    ✔️//you can run command -> run pm2 start main.js --name bank-api
    //If you don't need to pass any environment variables-> In ecosystem.config.js file
    //if you have only Production environment version and no Development environment logic in your app -> you can start your server by pm2 start dist/src/main.js --name bank-api
    //then you don't need to use if statement in -> main.ts file:
    //if (useAWS) {await loadParameters()} --> just use await loadParameters() //<-- in this case secrets will be loaded only from AWS Parameter Store and will not be loaded from local .env in Development environment


    //or another option is to add environment variables in Bash (but it is NOT Good PRACTICE, in refresh will delete all variables from memory)-> add these to Bash->
    //USE_AWS_PARAMETER_STORE=true \
    // NODE_ENV=production \
    // PORT=3005 \
    // pm2 start dist/src/main.js --name bank-api
------------------------------------------

pm2 save  //Save PM2 process

pm2 list

pm2 logs bank-api


---------------------------------
⚙️ //Everytime you change something in your code in VSCode
- push to GitHub //new code
- cd your-repo
- git pull origin main
- npm install
- pm2 delete all //stop all pm2 from previous processes
- npm run build //build new dist folder with files
- pm2 start ecosystem.config.js  //From main Bank folder. use this to run the server with defined environment variables inside the ecosystem.config.js
---------------------------------
❗ //can use this option as well to run the server, but in my case my application depends on environment variables that were only defined in ecosystem.config.js
// - pm2 start dist/src/main.js --name bank-api //start main.js file using pm2 -> give name bank-api

//this option does not automatically know that you want:
// NODE_ENV=production
// USE_AWS_PARAMETER_STORE=true
// PORT=3005

//Therefore- Bank/bank-api/src/main.ts
// const useAWS = false; //<-always false
//await loadParameters(); //<--never runs in Production
----------------------------------
- pm2 logs //see logs, that server is working
- pm2 logs bank-api --lines 100  //give last 100 logs of bank-api/ fresh logs

//⚠️ When you create EC2 for Next.js choose t3.small (2GB RAM) or t3.medium (4GB RAM)
//A small EC2 instance (for example t2.micro / t3.micro with 1GB RAM) often cannot build Next.js projects.
//Also, F-End EC2 EBS Volumes need to take at least 20GB, standard - 8GB is not enough

//If your app uses PORT=3005, don't forget to add this PORT into -> Security Group in AWS for this EC2 -> (PORT 3005, and TCP)

✨ //then manage your Secrets:
- add secrets from .env to -> Systems Manager (left side menu you will find) -> Parameter Store
- create IAM Role in EC2 for Parameter Store (to get access to secrets)
//IAM Role + Parameter Store does NOT automatically inject values into process.env. It only gives your EC2 permission to read secrets. Your NestJS app still must fetch or load them explicitly.

//Then:
1. Use AWS SDK only in ConfigModule:
- Install the AWS SDK (in bank-api)
npm install @aws-sdk/client-ssm

2. create a file -> bank-api/src/config/aws-parametr-store.ts

3. in main.ts file call function from file ->  bank-api/src/config/aws-parametr-store.ts

4. in app.module.ts file
ConfigModule.forRoot({
      isGlobal: true,
    }),

5. change all -> process.env.JWT_SECRET (in bank-api)
to->

constructor(private configService: ConfigService) {}

const secret = this.configService.get<string>('JWT_SECRET');
For development environment - keep process.env.JWT_SECRET

-----------------------------
//Also:
- change your main folder -> ecosystem.config.js file for Production
- add in .env -> USE_AWS_PARAMETER_STORE=false

```

/////////////////////////////////////////////////////////////////////////

# Other settings for AWS

- Create a Security Group for the current app:
- Port: 3000 (for example if you B-End uses Port = 3000 use the same Port here)

```JS
//Your NestJS application should have:

@Get('health')
health() {
  return { status: 'ok' };
}
```

A security group is a set of rules that you attach to an EC2 instance, and each rule says "allow this traffic on this port from this source". So the goal is one security group per server, with the right inbound rules.

```JS
//Back-end EC2 (NestJS, port 3005)

// Create a security group, e.g. backend-sg, with these inbound rules:

Type        |     Port       |        Source                           |            Why
            |                |                                         |
Custom TCP  |     3005       |  frontend-sg (the security group ID)    |     Only the Next.js server can reach the API
SSH         |      22        |  Your IP only (My IP)                   |     Admin access

//Referencing the front-end's security group as the source (rather than an IP address) means the rule keeps working even if the front-end's IP changes, and nothing else on the internet can hit port 3005.
```

```JS
//Front-end EC2 (Next.js, port 3000)
//Create frontend-sg with:

Type          |    Port     |  Source       |   Why
              |             |               |
Custom TCP    |    3000     | 0.0.0.0/0     |  Public access to your site
SSH           |      22     | Your IP only  |  Admin access

//Outbound rules can stay at the default (allow all), so the front-end can call the back-end.
```

**Important caveats**

1. **Who makes the request matters.** If Next.js only calls NestJS from server-side code (getServerSideProps, Server Components, Route Handlers), the calls come from the front-end EC2, and the setup above works. If your React code calls the API from the **browser** (client-side fetch/axios), the request comes from the user's machine, so port 3005 would need to be open to 0.0.0.0/0. That's usually undesirable, so proxy those calls through Next.js (route handlers or rewrites in next.config.js) instead.
2. **Use the back-end's private IP.** If both instances are in the same VPC, point Next.js at the back-end's private IP (e.g. http://10.0.1.25:3005) rather than the public IP. It's faster, free of data-transfer charges, and doesn't require exposing the API publicly.
3. **Ports 80/443 in production.** Users shouldn't have to visit yourdomain.com:3000. Typically you'd put an Application Load Balancer (or Nginx on the instance) in front, listening on 80/443 and forwarding to port 3000, and then open 3000 only to the load balancer's security group. You'd get HTTPS via ACM certificates at the ALB.
4. **Same instance vs. separate.** You mentioned they're on different EC2 servers, so the above applies. If they were ever on the same instance, no security group rule is needed between them, since traffic over localhost never leaves the machine

# If you need Database in the the EC2

If your node application expects to connect to a Database in the sane EC2 (PSQL, MySQL), - if you have database connection string and you use it in your app. And your code is set up to connect to a PSQL or MySQL Database but you don't have that database set up in the cloud in your EC2 instance.

4. stop your application from running and install PSQL or MySQL on your EC2 Instance, so that my application can actually connect to a database.

```JS
//put in EC2 terminal
//for MySQL database

sudo apt install mysql-server  //install mySQL

sudo systemctl start mysql
sudo systemctl enable mysql

sudo mysql -u root  //access the MySQL databse

//and then create new Database
CREATE DATABASE my_app;  //create Database with name - my_app
CREATE USER 'my_app_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyNewPass1!';  //with The username - 'my_app_user', can connect only from the same server (your EC2 instance) - localhost
GRANT ALL PRIVILEGES ON my_app.* TO 'my_app_user'@'localhost';   //Gives this user full control over the my_app database
```

```JS
//put in EC2 terminal
//for PSQL database

sudo apt install postgresql postgresql-contrib

sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -i -u postgres

CREATE DATABASE my_app;
CREATE ROLE my_app_role WITH LOGIN PASSWORD 'some_password';
GRANT ALL PRIVILEGES ON DATABASE "my_app" TO my_app_role;
```

5. Create all tables and insert all data from .sql file

- enter to mySQL console

```JS
sudo mysql -u root

//then put in MySQL console
//MySQLConnection.session.sql; - file wire you add all needed tables and insert the data into it
SOURCE /full/path/to/MySQLConnection.session.sql;

//to check full path use, not in MySQL console, in EC2 terminal / Bash command
pwd
```

6. connect your Application and MySQL

```JS
//Using mysql2

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'my_app_user',
  password: 'MyNewPass1!',
  database: 'my_app'
});
```
