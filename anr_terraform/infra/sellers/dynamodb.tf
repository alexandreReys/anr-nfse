resource "aws_dynamodb_table" "sellers" {
  name     = "${var.environment}-sellers"
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

  attribute {
    name = "companyName"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-sellers-name-gsi"
    projection_type = "ALL"
    hash_key        = "name"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }

  global_secondary_index {
    name            = "${var.environment}-sellers-companyName-gsi"
    projection_type = "ALL"
    hash_key        = "companyName"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }

  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
}
