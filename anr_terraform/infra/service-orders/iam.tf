# ==============================================================
# create_service_orders_iam_role
# ==============================================================
resource "aws_iam_role" "service_orders_iam_role" {
  name               = "${var.environment}-create-service-orders-iam-role"
  assume_role_policy = templatefile("${path.module}/../templates/lambda-base-policy.tpl", {})
}

# resource "aws_ssm_parameter" "service_orders_iam_role" {
#   name  = "${var.environment}-create-service-orders-iam-role"
#   type  = "String"
#   value = aws_iam_role.service_orders_iam_role.arn
# }

# ==============================================================
# service_orders_iam_policy
# ==============================================================
resource "aws_iam_policy" "service_orders_iam_policy" {
  name = "${var.environment}-create-service-orders-iam-policy"
  policy = templatefile("${path.module}/../templates/dynamodb-policy.tpl", {
    sns_topic = ""
  })
}

# ==============================================================
# service_orders_iam_policy_attachment
# ==============================================================
resource "aws_iam_policy_attachment" "service_orders_iam_policy_attachment" {
  name       = "${var.environment}-create-service-orders-iam-policy-attachment"
  roles      = [aws_iam_role.service_orders_iam_role.name]
  policy_arn = aws_iam_policy.service_orders_iam_policy.arn
}
