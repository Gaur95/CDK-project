import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { env } from 'process';

export class CdkEksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props , env: { region: 'ap-south-1'}});
    const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVpc', {
      vpcId: 'vpc-0230f45668682f34a', // Replace with your existing VPC ID
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'], // Add your existing VPC's availability zones
      publicSubnetIds:['subnet-0327e65b68de0edf0','subnet-0b94ee00d1b6e99b2','subnet-065c2af6c1ea5f9c1']
    });
    const cluster = new eks.Cluster(this, 'HelloEKS', {
      vpc,
      version: eks.KubernetesVersion.V1_27,
      defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
      defaultCapacity: 2,
      clusterName: 'cdkekscluster',
      vpcSubnets: [{ subnetType: ec2.SubnetType.PUBLIC}],
      securityGroup:  ec2.SecurityGroup.fromSecurityGroupId(this, 'ExistingSecurityGroup', 'sg-04e781f606c492eb6'),
      endpointAccess: eks.EndpointAccess.PUBLIC
    });
    
    // cluster.addFargateProfile('MyProfile', {
    //   selectors: [ { namespace: 'default' } ],
    // });

    new cdk.CfnOutput(this, 'clusterName',{
      value: cluster.clusterName ,
      description: 'cluster name to connect cluster'
      
    });
    new cdk.CfnOutput(this, 'clusterregion',{
      value: cdk.Aws.REGION,
    });
   
  }
}
