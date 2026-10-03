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


//But be aware that your home/office IP might change. If it changes, DBeaver will suddenly stop connecting and you'll need to update the rule.
```

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
