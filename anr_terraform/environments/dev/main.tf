data "aws_caller_identity" "current" {}

# ===========================================================
# DYNAMODB
# ===========================================================

module "users" {
  source         = "../../infra/users"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
  jwt_secret     = var.jwt_secret
}

module "organizations" {
  source         = "../../infra/organizations"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

module "services" {
  source         = "../../infra/services"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

module "customers" {
  source         = "../../infra/customers"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

module "service_orders" {
  source         = "../../infra/service-orders"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

resource "aws_s3_bucket" "serverless_deployment_bucket" {
  bucket = "serverless.cms.dev.anr.com"

  tags = {
    Name        = "serverless.cms.dev.anr.com"
    Environment = "dev"
  }
}
