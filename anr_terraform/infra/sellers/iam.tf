# ==============================================================
# create_sellers_iam_role
# ==============================================================
resource "aws_iam_role" "sellers_iam_role" {
  name               = "${var.environment}-create-sellers-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "sellers_iam_role" {
  name  = "${var.environment}-create-sellers-iam-role"
  type  = "String"
  value = aws_iam_role.sellers_iam_role.arn
}

# ==============================================================
# sellers_iam_policy
# ==============================================================
resource "aws_iam_policy" "sellers_iam_policy" {
  name = "${var.environment}-create-sellers-iam-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    sns_topic = ""
  })
}

# ==============================================================
# sellers_iam_policy_attachment
# ==============================================================
resource "aws_iam_policy_attachment" "sellers_iam_policy_attachment" {
  name       = "${var.environment}-create-sellers-iam-policy-attachment"
  roles      = [aws_iam_role.sellers_iam_role.name]
  policy_arn = aws_iam_policy.sellers_iam_policy.arn
}
