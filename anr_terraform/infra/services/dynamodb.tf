resource "aws_dynamodb_table" "services" {
  name     = "${var.environment}-services"
  hash_key = "id"
  # billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "id"
    type = "S"
  }

  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
}
