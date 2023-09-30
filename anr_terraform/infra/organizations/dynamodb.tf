resource "aws_dynamodb_table" "organizations" {
  name     = "${var.environment}-organizations"
  hash_key = "id"
  # billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-organizations-name-gsi"
    projection_type = "ALL"
    hash_key        = "name"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }

  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
}
