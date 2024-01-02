resource "aws_dynamodb_table" "customers" {
  name = "${var.environment}-customers"
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
    name = "name"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-customers-name-gsi"
    projection_type = "ALL"
    hash_key        = "name"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }

  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
}
