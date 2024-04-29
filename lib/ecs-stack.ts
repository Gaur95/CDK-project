import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props , env: { region: 'ap-south-1'}});

    const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVpc', {
      vpcId: 'vpc-0230f45668682f34a', // Replace with your existing VPC ID
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'], // Add your existing VPC's availability zones
      publicSubnetIds:['subnet-0327e65b68de0edf0','subnet-0b94ee00d1b6e99b2','subnet-065c2af6c1ea5f9c1']
    });
    const cluster = new ecs.Cluster(this , 'myecscluster' , {
     vpc,
    });
    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: new ec2.InstanceType("t2.micro"),
      desiredCapacity: 3,
    });
  }
}
