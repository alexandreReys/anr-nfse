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

module "sellers" {
  source         = "../../infra/sellers"
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
