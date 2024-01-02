# ==============================================================
# create_customers_iam_role
# ==============================================================
resource "aws_iam_role" "customers_iam_role" {
  name               = "${var.environment}-create-customers-iam-role"
  assume_role_policy = templatefile("${path.module}/../templates/lambda-base-policy.tpl", {})
}

# resource "aws_ssm_parameter" "customers_iam_role" {
#   name  = "${var.environment}-create-customers-iam-role"
#   type  = "String"
#   value = aws_iam_role.customers_iam_role.arn
# }

# ==============================================================
# customers_iam_policy
# ==============================================================
resource "aws_iam_policy" "customers_iam_policy" {
  name = "${var.environment}-create-customers-iam-policy"
  policy = templatefile("${path.module}/../templates/dynamodb-policy.tpl", {
    sns_topic = ""
  })
}

# ==============================================================
# customers_iam_policy_attachment
# ==============================================================
resource "aws_iam_policy_attachment" "customers_iam_policy_attachment" {
  name       = "${var.environment}-create-customers-iam-policy-attachment"
  roles      = [aws_iam_role.customers_iam_role.name]
  policy_arn = aws_iam_policy.customers_iam_policy.arn
}
