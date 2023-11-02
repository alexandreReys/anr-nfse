# ==============================================================
# all_iam_role
# ==============================================================
resource "aws_iam_role" "all_iam_role" {
  name               = "${var.environment}-all-iam-role"
  assume_role_policy = templatefile("${path.module}/../templates/lambda-base-policy.tpl", {})
  # })
}

resource "aws_ssm_parameter" "all_iam_role" {
  name  = "${var.environment}-all-iam-role"
  type  = "String"
  value = aws_iam_role.all_iam_role.arn
}

# ==============================================================
# all_iam_policy
# ==============================================================
resource "aws_iam_policy" "all_iam_policy" {
  name = "${var.environment}-all-iam-policy"
  policy = templatefile("${path.module}/../templates/dynamodb-policy.tpl", {
    sns_topic = ""
  })
}

# ==============================================================
# all_iam_policy_attachment
# ==============================================================
resource "aws_iam_policy_attachment" "all_iam_policy_attachment" {
  name       = "${var.environment}-all-iam-policy-attachment"
  roles      = [aws_iam_role.all_iam_role.name]
  policy_arn = aws_iam_policy.all_iam_policy.arn
}
