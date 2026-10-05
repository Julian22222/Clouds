- Each AWS resource that supports network traffic should have appropriate network access controls, but not every AWS resource uses a Security Group.

```JS
| AWS resource              | Security Group?  | Typical access control              |
| ------------------------- | ---------------  | ----------------------------------- |
| EC2                       | ✅ Yes           | Security Group                      |
| RDS                       | ✅ Yes           | Security Group                      |
| Application Load Balancer | ✅ Yes           | Security Group                      |
| ECS tasks/services        | ✅ Yes           | Security Group                      |
| Lambda                    | ➖ Optional      | Security Group if attached to a VPC |
| S3                        | ❌ No            | IAM + Bucket Policy                 |
| DynamoDB                  | ❌ No            | IAM + resource policies             |
| CloudFront                | ❌ No            | IAM/WAF/origin controls             |
| VPC                       | ❌ No            | NACLs, route tables, etc.           |
```

- Security Groups control network traffic to/from resources that are associated with them.
- Security Group- It's a stateful virtual firewall attached to network interfaces/resources. You configure inbound and outbound rules describing what traffic is permitted.

Every network-accessible AWS resource should have an appropriate network security strategy. For resources that support Security Groups, use Security Groups to control network access.

```JS
//Example of AWS RDS - PSQL

Name   |    Security group rule ID   |   IP version  |     Type      | Protocol  |  Port range  |        Source         |  Description

  –    |    sgr-0d8526146266f3bd8    |    IPv4       |   PostgreSQL  |  TCP      |     5432     |  195.237.217.417/32   |       –

//PSQL always has PORT 5432
//Source - your IP and AWS EC2 B-End IP
//So if your computer's current public IP is not 195.237.217.417, DBeaver will be blocked by the security group.
//Source = 0.0.0.0/0 <-- connect from everywhere/ avoid in Production env

//Even better production architecture
//put RDS in private subnets and no public access at all. EC2 → private network → RDS
//Internet -> ALB (has a public access) -> EC2 B-End (private subnet) -> RDS (private subnet)
//Or API Gateway → ALB → EC2(private subnet) → RDS (private subnet)
//"Private resource"  Located in private subnet then you can add Load balancer that is located in public subnet to connect the resources
//"Private resource" means no route to an Internet Gateway and no public IP. A load balancer in a public subnet has a public address and can reach your private instances over the VPC's internal network:



// resources that helps to connect Public Internet access to your private resources
Option                    |          Use for                         |                         Notes
                          |                                          |
ALB                       |     HTTP/HTTPS apps (NestJS, Next.js)    |     Most common. TLS termination, path routing, health checks, optional WAF.
NLB                       |     Raw TCP/UDP/TLS                      |     For non-HTTP protocols. Can be internet-facing, but see the database note below.
API Gateway               |     Managed API front door               |     Gives auth, throttling, API keys. To reach private resources it uses a VPC Link pointing at an internal ALB/NLB.
CloudFront + VPC origin   |     CDN in front of private ALB/EC2      |     Good for Next.js frontends. Origin stays private.
Lambda in VPC             |     Serverless backends                  |     Behind API Gateway, and it can reach private RDS directly.




//your laptop/DBeaver can reach the private RDS through SSM/VPN/bastion/tunnel, rather than opening PostgreSQL to the whole internet.
//For example, an SSM port-forwarding tunnel through an EC2 instance can let you use DBeaver against the private RDS without exposing PostgreSQL to the internet.
//you can connect to the private RDS through something like:
DBeaver
   │
   │ SSH / SSM / VPN
   ▼
Private network
   │
   ▼
RDS


//But be aware that your home/office IP address can change. If it changes, DBeaver will suddenly stop connecting and you'll need to update the rule.

////////
//To connect to your Private AWS RDS use in DBeaver app -> Use SSH Tunnel:

//Go to the SSH tab → tick Use SSH Tunnel:
// - Host/IP: EC2 public IP (or DNS)
// - Port: 22
// - User name: ec2-user / ubuntu (any name)
// - Authentication: Public Key → select your .pem / or DB password
// - Connect
```

If you want to connect your EC2 B-End to your Databse:

- Don’t use EC2 B-End IP address, Reference the EC2's security group ID as the source instead.

This is the standard pattern: it keeps working if the instance is stopped/started, replaced, or scaled out, and it works over private IPs inside the VPC. Reference the EC2's security group ID – means you don’t use IP address for connection, you use Security Group Id. "it allows traffic from any resource that has this other security group attached." AWS evaluates membership dynamically, so you never track individual IPs.

How it works:

- ec2-app-sg: attached to your EC2 instance (allows SSH/HTTP/HTTPS from wherever you need).
- rds-sg: attached to your RDS instance. Its inbound rule allows 5432 from ec2-app-sg.

Any instance with ec2-app-sg attached can now reach RDS on 5432. Nothing else in the VPC can (unless it also has that SG).

attach the same ec2-app-sg to every app server (or an Auto Scaling group's launch template) and they all get access without touching the RDS rules again.

Steps in the console:

1. Find your EC2's security group ID. EC2 → Instances → select your instance → Security tab → copy the group ID (looks like sg-0abc123...). If it's using the default SG, I'd recommend creating a dedicated one like ec2-app-sg and attaching it, so the reference is meaningful.
2. Open the RDS security group. EC2 → Security Groups → select the SG attached to your RDS instance (check RDS → your DB → Connectivity & security → VPC security groups).
3. Edit inbound rules → Add rule:

- Type: PostgreSQL (auto-fills TCP, port 5432)
- Source: choose Custom, then start typing sg- or the SG name. A dropdown will show matching groups. Select your EC2's SG.

4. Save rules.

```JS
//A private subnet does not mean "no internet access." It means resources in that subnet don't have a direct route to the public internet through an Internet Gateway
//private subnets allow resources comunicate within VPC
//private-subnet EC2 can potentially access the internet outbound through a NAT Gateway.

|                                | Public subnet              | Private subnet   |
| ------------------------------ | -------------------------- | ---------------- |
| Internet → resource directly   | Possible*                  | ❌               |
| Resource → internet            | Possible                   | Possible via NAT |
| Resource → other VPC resources | ✅                         | ✅               |
| Public IP normally required    | For direct internet access | ❌               |
| Internet Gateway route         | ✅                         | ❌               |

// Public subnet = has a route to an Internet Gateway.
// Private subnet = doesn't have a direct route to an Internet Gateway.
```

```JS
////Example of AWS EC2

Name   |    Security group rule ID   |   IP version  |     Type      | Protocol  |  Port range  |        Source         |  Description

  –    |    sgr-0d8526146266f3bd8    |    IPv4       |   Custom TCP  |  TCP      |     3005     |  195.237.217.417/32   |       –

//If your EC2 use PORT 3005 for connection
//Source = 0.0.0.0/0 <-- connect from everywhere/ avoid in Production env
```
