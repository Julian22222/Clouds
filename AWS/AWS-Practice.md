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

//use this one to run the server from - Bank folder, This is the Best option
//This command allow to pass any environment variables when you start running your server,
pm2 start ecosystem.config.js
//ecosystem.config.js file contains and can have other variables that application needs:
// env: {
//   NODE_ENV: "production",
//   USE_AWS_PARAMETER_STORE: "true",
//   PORT: 3005,
// }

//Then when pm2 start the server it sees -> process.env.USE_AWS_PARAMETER_STORE === "true"

//Imagine your app needs 15 variables, with ecosystem.config.js file you can easily define them, and make them available from server start running

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


//⚠️ When you create EC2 for Next.js choose t3.small (2GB RAM) or t3.medium (4GB RAM)
//A small EC2 instance (for example t2.micro / t3.micro with 1GB RAM) often cannot build Next.js projects.


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
