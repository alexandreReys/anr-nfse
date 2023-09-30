{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:*",
        "dynamodb:Scan",
        "dynamodb:GetItem",
        "dynamodb:BatchGetItem",
        "dynamodb:Query",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:DescribeStream",
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:ListStreams",
        "sns:Publish",
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": [
          "s3:*",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
    %{ if sns_topic != ""}
    , {
      "Action": [
        "sns:Publish"
      ],
      "Effect": "Allow",
      "Resource": "${sns_topic}"
    }
    %{ endif }
  ]
} 