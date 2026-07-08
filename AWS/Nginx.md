# Nginx

Nginx is an open-source web server and reverse proxy.

Nginx sits between the internet and your application.

#### Nginx is responsible for:

- Reverse Proxy. It means removing the port from the URL (add Nginx so you don’t need use PORT in URL) / For example -> https://yourdomain.com:3005
  will run -> https://yourdomain.com (With No PORT )
- Handle HTTPS. HTTPS / SSL Termination. HTTPS (SSL/TLS) -add HTTPS (Install a free SSL certificate with Certbot so your site uses HTTPS.)

❗ YOU CAN'T MAKE HTTPS WITHOUT YOUR OWN DOMAIN. If you only have the AWS EC2 Public DNS, you cannot get a normal trusted HTTPS certificate from Let's Encrypt (Certbot).

- Route traffic. Reverse proxying to the local application
- Improve performance. Compression & Performance. Optionally serving compression, caching, and security headers, improve speed, reduce bandwidth
- Domain Routing
- Serve files quickly. Static File Serving (Nginx is extremely fast at serving: images, CSS, JS, HTML)
- Load Balancing (Nginx can distribute traffic across multiple backend servers). Important for scaling.
- Increase security. Security Layer (hide internal ports, rate limit traffic, block malicious requests, restrict access, reduce attack surface)

#### Nginx is used with:

- Docker
- Kubernetes
- ECS
- microservices
- APIs
- load balancers

Because it is:

- stable
- fast
- lightweight
- battle-tested

# 👀 How to work with NGINX

1. install NGINX in your EC2 server

- you can run the installation commands from any directory (your home directory, /home/ubuntu, Bank, etc.). The current folder doesn't matter

```JS
//For Ubuntu EC2 server:
sudo apt update
sudo apt install nginx
```

2. Then verify NGINX is running

```JS
sudo systemctl status nginx
//or
sudo systemctl is-active nginx

//It should return:
active

//Check the default Nginx page
//or open your EC2 public IP or DNS in a browser --> http://... (NOT https://...)
You should see the "Welcome to nginx!" page.
```

3. Now you can use Nginx as a reverse proxy

- Create a reverse proxy. Instead of exposing PORT 3005 publicly (in URL), we'll make Nginx forward requests to your NestJS app

```JS
//Edit the default site:
//put in terminal
sudo nano /etc/nginx/sites-available/default
```

```JS
//Replace its contents with:

server {
    listen 80;  //Nginx listen for incoming HTTP requests on PORT 80
    server_name ec2-108-129-233-222.eu-west-1.compute.amazonaws.com;  //<--Public DNS of your server in AWS, This file can have any name; using your application name is common.
//Good Practice to keep /api/ prefix
    location /api/ {       //the new route will start with http://your-ec2-dns/api/...
    // /OR location / {
        proxy_pass http://127.0.0.1:3005/;   //<-- 3005 is PORT of my Back-End, THis line means ->Forward the request to the NestJS application running on port 3005
    }
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
}

--------------
//Save file
Press Ctrl + O (the letter O, not zero)

//Nano will show:
File Name to Write: /etc/nginx/sites-available/default

Press Enter to confirm.

//Exit nano (exit from nano console back to terminal)
Press Ctrl + X
```

4. Test the configuration

```JS
sudo nginx -t

//It should say:
//nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
//nginx: configuration file /etc/nginx/nginx.conf test is successful
```

5. Reload Nginx

```JS
sudo systemctl reload nginx
//or
sudo systemctl restart nginx
```

6. Test

- try your EC2 Public DNS

```JS
http://your-ec2-dns/ → Next.js
//You should see your Next.js application instead of the "Welcome to nginx!" page.

//then - check your other routes
http://your-ec2-dns/api/users



//If the website doesn't load
pm2 list //this should show your server online
```

```JS
//Think of Nginx Like a Traffic Controller

    Internet traffic
            ↓
          Nginx
      ↙           ↘
    Next.js      NestJS
    :3000         :3005

-------------------------

//Nginx converts:
    /api/accounts
        |
        v
    /accounts

    // and sends:
    // localhost:3005/accounts

------------------------
    Browser
   |
   | port 80
   |
 Nginx
   |
   ├── /api/accounts
           |
           v
      NestJS :3005/accounts
```

If you have Next.js and Nest.js in one EC2 server - you install one Nginx on that EC2 server

1. Serves websites fast

If your site has static files like:

- HTML
- CSS
- JavaScript
- images

Nginx can send those directly to users very efficiently.

Without Nginx:

- Your app (Node.js, Python, PHP, etc.) handles everything.

With Nginx:

- Nginx handles the simple/static work.
- Your app focuses on business logic.

Result:

Faster website
Lower server load 2. Reverse Proxy (most important beginner concept)

This is the main reason developers use Nginx.

Imagine:

- User visits myapp.com
- Your backend app actually runs on localhost:3000

Users should not access port 3000 directly.

```JS
Nginx sits in front:

Internet User
      ↓
   Nginx
      ↓
Your App (3000)

// Nginx receives requests and forwards them to your app safely.
// This is called a reverse proxy.
```

3. Handles many users efficiently

Backend apps can struggle with huge traffic.

Nginx is optimized for:

- thousands of connections
- concurrent users
- low memory usage

It acts like a traffic controller so your app does not get overwhelmed.

4. SSL / HTTPS management

Nginx commonly handles HTTPS certificates.

Example:
https://myapp.com

Nginx:

- encrypts traffic
- manages SSL certificates
- improves security

This is extremely common in production systems.

5. Load balancing

If your app grows, you may run multiple servers:

- Server A
- Server B
- Server C

Nginx can distribute users between them.

Example:

- User 1 → A
- User 2 → B
- User 3 → C

This improves: - performance - reliability - scalability

6. Security layer

Nginx can:

- block malicious traffic
- limit request rates
- hide backend details
- prevent direct access to app servers

So your actual application is less exposed.

# adding HTTPS with Let's Encrypt + Certbot.

Before installing Certbot, one important requirement:

- ❗ You need a domain name (not only EC2 Public DNS)

```JS
// Encrypt does not issue certificates for AWS EC2 public DNS names like:
ec2-108-129-233-222.eu-west-1.compute.amazonaws.com
```

- You need your own domain, for example: bankapp.com
- Then point DNS to your EC2 instance

bankapp.com ---> EC2 Public IPv4 address

Then:

1. Install Certbot

```JS
//On your EC2 Ubuntu server:
sudo apt update

//Install Certbot and the Nginx plugin:
sudo apt install certbot python3-certbot-nginx -y

//Check installation:
certbot --version
```

2. Make sure Nginx allows HTTP

```JS
//Your security group should have:

Port	  Source
80	     0.0.0.0/0
443	     0.0.0.0/0

//You already have 80. Add 443 if you haven't.


//AWS EC2:
Security Groups
   ↓
Inbound rules
   ↓
Add rule
   ↓
HTTPS
   Port 443
   Source 0.0.0.0/0
```

3. Update Nginx server_name

```JS
//Edit:
sudo nano /etc/nginx/sites-available/default

//Change:
server_name _;
//or your EC2 DNS
//to your real domain:
server_name bankapp.com www.bankapp.com;
```

```JS
//Example

server {
    listen 80;

    server_name bankapp.com www.bankapp.com;

    location /api/ {
        proxy_pass http://127.0.0.1:3005/;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}

----------------------------------

//Save:
CTRL + O
ENTER
CTRL + X

//Test:
sudo nginx -t

//Reload:
sudo systemctl reload nginx
```

4. Run Certbot

```JS
sudo certbot --nginx

//Certbot will ask:
Enter email address:

//Enter your email.
//Accept:
Terms of Service? (Y)

//Then select your domain:
1: bankapp.com
2: www.bankapp.com


//Certbot will automatically:
// ✅ Create SSL certificate
// ✅ Modify Nginx config
// ✅ Enable HTTPS
// ✅ Redirect HTTP → HTTPS
```

5. Test HTTPS

```JS
//Open:
https://bankapp.com

//You should see the lock icon 🔒.
```

6. Verify automatic renewal

Let's Encrypt certificates expire every 90 days.

```JS
//Check
sudo certbot renew --dry-run

//Expected:
Congratulations, all simulated renewals succeeded
```

```JS
//Your final production architecture will be:

                 HTTPS :443
                    |
                    |
                Nginx
                    |
        ------------------------
        |                      |
     /api/*                   /*
        |                      |
        v                      v
 NestJS :3005              Next.js :3000
        |
        |
      RDS PostgreSQL

```

One more recommendation for your banking app: after HTTPS works, change your NestJS CORS from:

```JS
origin: [
 'http://localhost:3000',
 'http://localhost:3001'
]

//to your real HTTPS frontend:

origin: [
 'https://bankapp.com'
]

//Otherwise your browser security settings may block production requests.
```
