import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, env: {region: 'ap-south-1'}});
   
const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVpc', {
    vpcId: 'vpc-0230f45668682f34a', // Replace with your existing VPC ID
    availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'], // Add your existing VPC's availability zones
    publicSubnetIds:['subnet-0327e65b68de0edf0','subnet-0b94ee00d1b6e99b2','subnet-065c2af6c1ea5f9c1']
  });
  const keyName = 'mykey';
  const userData = ec2.UserData.forLinux({ shebang: '#!/bin/bash' });
    userData.addCommands('yum update', 'yum install httpd -y');
  const forec2 = new ec2.Instance(this, 'MyInstance', {
    instanceName: 'cdkinstance',
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
    vpc,
    machineImage: ec2.MachineImage.latestAmazonLinux2(),
    keyName, 
    vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    associatePublicIpAddress: true, // Assign public IP address
    securityGroup: ec2.SecurityGroup.fromSecurityGroupId(this, 'ExistingSecurityGroup', 'sg-04e781f606c492eb6'), // Replace with your existing security group ID
    userData: userData
  });
  new cdk.CfnOutput(this, 'PublicIpAddress', {
    value: forec2.instancePublicIp || 'N/A',
    description: 'Public IP Address of the EC2 instance'
  });

  new cdk.CfnOutput(this, 'PrivateIpAddress', {
    value: forec2.instancePrivateIp || 'N/A',
    description: 'Private IP Address of the EC2 instance'
  });
  }
}
