# MMA Design — AWS Hosting & Lead Capture

This directory contains everything needed to deploy the MMA Design platform
to AWS: static hosting (S3 + CloudFront), a serverless lead-capture backend
(Lambda + API Gateway + SES), and a DynamoDB table for CRM-ready lead storage.

## Prerequisites

1. **AWS CLI** installed and configured (`aws configure` with access keys
   that can create S3, CloudFront, Lambda, API Gateway, DynamoDB, and IAM).
2. **ACM Certificate** (for HTTPS): request a certificate in **us-east-1**
   for `mmadesign.in` and `www.mmadesign.in` via the AWS Console. Note the ARN.
   SES must also be in production mode (request in SES console).
3. **Route53** hosted zone for `mmadesign.in` (optional but recommended for
   automatic DNS — the template creates CloudFront; you add the CNAME/Alias).

## Deploy

```powershell
# Full deploy (infra + site sync)
.\infra\deploy.ps1 -DomainName mmadesign.in -CertArn arn:aws:acm:us-east-1:... -NotifyEmail enquiries@mmadesign.in

# Sync site files only (infra already up)
.\infra\deploy.ps1 -SyncOnly
```

After the first deploy:

1. The script prints the **API endpoint** URL. Put it into
   `data/site-config.js` as `API_ENDPOINT`.
2. Re-sync: `.\infra\deploy.ps1 -SyncOnly`
3. In Route53, create an Alias (A) record pointing `mmadesign.in` and
   `www.mmadesign.in` to the CloudFront distribution domain (printed by
   the deploy script).
4. In SES, verify the `enquiries@mmadesign.in` identity (check inbox for
   the verification email). Until verified, SES sends in sandbox mode only.

## What gets created

| Resource              | Purpose                                      |
|-----------------------|----------------------------------------------|
| S3 bucket             | Static site content (HTML, CSS, JS, images)  |
| CloudFront            | Global CDN with HTTPS, caching, compression  |
| Lambda function       | Lead capture handler (validation + SES email)|
| API Gateway           | REST POST endpoint for the enquiry form      |
| DynamoDB table        | Lead storage (CRM-ready, pay-per-request)    |
| IAM role              | Lambda execution + SES + DynamoDB permissions|

## Cost estimate

- S3 + CloudFront for a low-traffic premium brand site: ~$1–3/month
- Lambda + API Gateway (low volume): <$1/month
- DynamoDB (pay-per-request, <100 leads/month): <$1/month
- SES: $0.10 per 1,000 emails (first 62,000/month free via EC2)
- **Total: ~$3–5/month** for typical traffic

## Removing the stack

```powershell
# Empty the S3 bucket first (CloudFront must be disabled before bucket delete)
aws s3 rm s3://mma-design-site --recursive
aws cloudformation delete-stack --stack-name mma-design --region ap-south-1
```
