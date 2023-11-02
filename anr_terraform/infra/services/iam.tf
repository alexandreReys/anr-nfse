# ==============================================================
# create_services_iam_role
# ==============================================================
resource "aws_iam_role" "services_iam_role" {
  name               = "${var.environment}-create-services-iam-role"
  assume_role_policy = templatefile("${path.module}/../templates/lambda-base-policy.tpl", {})
}

# resource "aws_ssm_parameter" "services_iam_role" {
#   name  = "${var.environment}-create-services-iam-role"
#   type  = "String"
#   value = aws_iam_role.services_iam_role.arn
# }

# ==============================================================
# services_iam_policy
# ==============================================================
resource "aws_iam_policy" "services_iam_policy" {
  name = "${var.environment}-create-services-iam-policy"
  policy = templatefile("${path.module}/../templates/dynamodb-policy.tpl", {
    sns_topic = ""
  })
}

# ==============================================================
# services_iam_policy_attachment
# ==============================================================
resource "aws_iam_policy_attachment" "services_iam_policy_attachment" {
  name       = "${var.environment}-create-services-iam-policy-attachment"
  roles      = [aws_iam_role.services_iam_role.name]
  policy_arn = aws_iam_policy.services_iam_policy.arn
}
