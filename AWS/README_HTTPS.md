# How to CREATE HTTPS for your F-END?

1. You can use AWS CloudFront (it is CDN) (but you need to ask access to it from AWS team)
2. Load Balancer + ACM (AWS Certificate Manager -> create https)
3. Or you can use Nginx + Certbot (on EC2) + DuckDNS (Free subdomain)

### Nginx + Certbot (on EC2) + DuckDNS (Free subdomain)

1. Set up your Domain (Free, don't need to buy)

Go to ->

[duckdns.org](duckdns.org)

```JS
//free subdomain

duckdns.org

- Set up DuckDNS
- duckdns.org, sign in with Google
- Create a subdomain, e.g. bigbankapp → gives you mybankapp.duckdns.org
- Set the IP field to your EC2 instance's public IPv4 address (from the EC2 console) -> add your EC2 F-END IP Address here, to redirect to your F-end url page
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
