terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  # todo
  # backend "s3" {
  #   bucket         = "tfstate-anr-aws"
  #   key            = "nfse.tf"
  #   region         = "us-east-2"
  #   profile        = "anr"
  #   dynamodb_table = "tfstate-anr-aws"
  # }
}

provider "aws" {
  region  = var.region
  profile = var.profile
}
