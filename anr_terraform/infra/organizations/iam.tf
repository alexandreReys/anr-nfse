# ==============================================================
# create_organizations_iam_role
# ==============================================================
resource "aws_iam_role" "organizations_iam_role" {
  name               = "${var.environment}-create-organizations-iam-role"
  assume_role_policy = templatefile("${path.module}/../templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "organizations_iam_role" {
  name  = "${var.environment}-create-organizations-iam-role"
  type  = "String"
  value = aws_iam_role.organizations_iam_role.arn
}

# ==============================================================
# organizations_iam_policy
# ==============================================================
resource "aws_iam_policy" "organizations_iam_policy" {
  name = "${var.environment}-create-organizations-iam-policy"
  policy = templatefile("${path.module}/../templates/dynamodb-policy.tpl", {
    sns_topic = ""
  })
}

# ==============================================================
# organizations_iam_policy_attachment
# ==============================================================
resource "aws_iam_policy_attachment" "organizations_iam_policy_attachment" {
  name       = "${var.environment}-create-organizations-iam-policy-attachment"
  roles      = [aws_iam_role.organizations_iam_role.name]
  policy_arn = aws_iam_policy.organizations_iam_policy.arn
}
