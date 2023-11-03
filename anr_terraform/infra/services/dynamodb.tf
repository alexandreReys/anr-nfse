resource "aws_dynamodb_table" "services" {
  name = "${var.environment}-services"
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
    name = "description"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-services-description-gsi"
    projection_type = "ALL"
    hash_key        = "description"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }

  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
}
