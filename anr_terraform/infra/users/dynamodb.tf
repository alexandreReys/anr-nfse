resource "aws_dynamodb_table" "users" {
  name = "${var.environment}-users"
  # billing_mode = "PAY_PER_REQUEST"

  hash_key  = "organizationId"
  range_key = "id"

  attribute {
    name = "organizationId"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-users-email-gsi"
    projection_type = "ALL"
    hash_key        = "email"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }

  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
}

resource "aws_ssm_parameter" "dynamodb-user-stream" {
  name  = "${var.environment}-users-stream"
  type  = "String"
  value = aws_dynamodb_table.users.stream_arn
}
