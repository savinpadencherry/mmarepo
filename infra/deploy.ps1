# MMA Design — AWS Deploy Script
# Requires: AWS CLI configured (aws configure) with credentials that can create
# S3, CloudFront, Lambda, API Gateway, DynamoDB, and IAM resources.
#
# Usage:
#   .\deploy.ps1                                    # deploy infra + sync site
#   .\deploy.ps1 -DomainName mmadesign.in           # custom domain
#   .\deploy.ps1 -DomainName mmadesign.in -CertArn arn:aws:acm:...  # with SSL
#   .\deploy.ps1 -SyncOnly                          # sync files only (infra already up)

param(
  [string]$StackName = "mma-design",
  [string]$DomainName = "mmadesign.in",
  [string]$CertArn = "",
  [string]$Region = "ap-south-1",
  [string]$NotifyEmail = "enquiries@mmadesign.in",
  [switch]$SyncOnly
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot

if (-not $SyncOnly) {
  Write-Host "==> Deploying CloudFormation stack: $StackName" -ForegroundColor Cyan
  aws cloudformation deploy `
    --stack-name $StackName `
    --template-file "$PSScriptRoot\cloudformation.yaml" `
    --capabilities CAPABILITY_IAM `
    --parameter-overrides `
      DomainName=$DomainName `
      NotifyEmail=$NotifyEmail `
      CertificateArn=$CertArn `
    --region $Region

  if ($LASTEXITCODE -ne 0) { throw "CloudFormation deploy failed." }

  Write-Host "==> Updating Lambda function code with the real handler..." -ForegroundColor Cyan
  $zipFile = "$env:TEMP\mma-lead-capture.zip"
  # Zip the Lambda handler
  if (Test-Path $zipFile) { Remove-Item $zipFile -Force }
  Compress-Archive -Path "$PSScriptRoot\lambda\lead-capture.js" -DestinationPath $zipFile -Force
  aws lambda update-function-code `
    --function-name "${StackName}-lead-capture" `
    --zip-file "fileb://$zipFile" `
    --region $Region

  Write-Host "==> Fetching stack outputs..." -ForegroundColor Cyan
  $outputs = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --query "Stacks[0].Outputs" `
    --region $Region | ConvertFrom-Json

  $apiEndpoint = ($outputs | Where-Object { $_.OutputKey -eq "ApiEndpoint" }).OutputValue
  $websiteUrl  = ($outputs | Where-Object { $_.OutputKey -eq "WebsiteURL" }).OutputValue
  $bucketName  = "${StackName}-site"

  Write-Host "`n  API Endpoint: $apiEndpoint" -ForegroundColor Yellow
  Write-Host "  Website URL:  $websiteUrl" -ForegroundColor Yellow
  Write-Host "  S3 Bucket:    $bucketName" -ForegroundColor Yellow
  Write-Host "`n  ==> Put the API endpoint into data/site-config.js as API_ENDPOINT" -ForegroundColor Yellow
} else {
  $bucketName = "${StackName}-site"
}

Write-Host "`n==> Syncing website files to S3 ($bucketName)..." -ForegroundColor Cyan
aws s3 sync $RepoRoot "s3://$bucketName" `
  --exclude ".git/*" `
  --exclude ".smoke/*" `
  --exclude ".claude/*" `
  --exclude ".commandcode/*" `
  --exclude ".github/*" `
  --exclude "infra/*" `
  --exclude "node_modules/*" `
  --exclude "*.mp4" `
  --exclude "mmadesign Sample (1).html" `
  --delete `
  --region $Region

Write-Host "`n==> Done! Site is live at the CloudFront URL above." -ForegroundColor Green
Write-Host "    CloudFront cache invalidation may take a few minutes." -ForegroundColor DarkGray
