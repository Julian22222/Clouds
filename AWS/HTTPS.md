# How to CREATE HTTPS for your F-END?

1. You can use AWS CloudFront (it is CDN) (but you need to ask access to it from AWS team)
2. Load Balancer + ACM (AWS Certificate Manager -> create https)
3. Or you can use Nginx + Certbot (on EC2) + DuckDNS (Free subdomain)

### Nginx + Certbot (on EC2) + DuckDNS (Free subdomain)

1. Set up your Domain (Free, don't need to buy)

Go to ->

[https://duckdns.org](https://duckdns.org)

```JS
//free subdomain

duckdns.org

- Set up DuckDNS
- duckdns.org, sign in with Google
- Create a subdomain, e.g. bigbankapp → gives you mybankapp.duckdns.org
- Set the IP field to your EC2 instance's public IPv4 address (from the EC2 console) -> add your EC2 F-END IP Address here, to redirect this domain to your F-end url page. EC2 IP address can be found in AWS EC2 Dashboard
- Save

////////////////////////////////////

//OR you can use other free domain websites
//noip.com
//afraid.org
```

2. Set up your Certbot

Go to ->

[https://certbot.eff.org/](https://certbot.eff.org/)

Certbot won't issue a certificate for a bare IP address or your EC2's!!!! (auto-generated AWS hostname)

You need to make a domain

```JS
//https://certbot.eff.org/

//needs to add Https certificate

//on main page you go to ->
My HTTP website is running and choose -> Nginx on Linux(snap)

//it will giwe commands to add to your EC2 terminal to set up Free SSL Certificate (HTTPS)
```

3. Update your Nginx config

```JS
//Nginx config

server {
    listen 80;
    server_name bigbankapp.duckdns.org;  //<-- your new domain name

    location / {
        proxy_pass http://localhost:3000;   //<-- proxy_pass http://127.0.0.1:3000
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

# 👀 Use API Gateway or/and ALB (Application Load Balancer) services depending on what you need to get

- ALB is a traffic distributor. It takes incoming requests and spreads them across your servers.
- API Gateway is a front desk for an API. It checks who’s calling, how often, and whether the request looks valid, then passes it on.

### ⭐ API Gateway provides HTTPS for EC2 ()

- API Gateway is a serverless service and charges per use (usually cheaper at low or unpredictable load)
- Block bad requests before they reach your backend.
- You want one entry point that routes to several backends (Lambda, EC2, containers).
- You want built-in throttling, caching or Cognito login without writing code.
- Do you have a valid key? Are you sending too many requests (throttling)? Is this request valid?”

### ⭐ Load balancer provides HTTPS for EC2

- ALB itself costs roughly $16+ per month plus usage
- ALB also gives you health checks and the ability to spread traffic across several EC2 instances
- caching
- Traffic between the ALB and EC2 is plain HTTP by default, but it stays inside your VPC. You can use HTTPS there too if you need end-to-end encryption.

API Gateway is worth adding in front of your API when you need its extras: API keys and usage plans, throttling, JWT or Cognito authorizers, and request validation.

#### 👍 Rule of thumb

- Needs HTTPS in front of containers or EC2: ALB. (No API keys(rules who can use the api rotes) and usage plans, No Throttling / rate limiting, No Request body or schema validation)
- Needs API features in front of Lambda: API Gateway.
- Needs a database: put compute (Lambda, EC2 or a container) between the entry point and RDS.
