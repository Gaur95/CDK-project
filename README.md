# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## output
```
✅  CdkEksStack

✨  Deployment time: 684.23s

Outputs:
CdkEksStack.HelloEKSConfigCommand861347FC = aws eks update-kubeconfig --name cdkekscluster --region ap-south-1 --role-arn arn:aws:iam::accountID:role/CdkEksStack-EksAdminRole1C96C514-7SFgSt2nd69q
CdkEksStack.HelloEKSGetTokenCommandF486E67D = aws eks get-token --cluster-name cdkekscluster --region ap-south-1 --role-arn arn:aws:iam::accountID:role/CdkEksStack-EksAdminRole1C96C514-7SFgSt2nd69q
CdkEksStack.clusterName = cdkekscluster
CdkEksStack.clusterregion = ap-south-1
```
