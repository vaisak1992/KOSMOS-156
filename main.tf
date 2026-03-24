provider "aws" {
  region = "ap-south-1"
}

# Generate random suffix for uniqueness
resource "random_id" "suffix" {
  byte_length = 4
}

# Create S3 bucket
resource "aws_s3_bucket" "bucket" {
  bucket = "test-alpha-project-${random_id.suffix.hex}"

  tags = {
    Name        = "test-alpha-project"
    Environment = "dev"
  }
}

# Enable versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Ownership controls (recommended)
resource "aws_s3_bucket_ownership_controls" "ownership" {
  bucket = aws_s3_bucket.bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Disable public access block (to allow website access)
resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Enable static website hosting
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Bucket policy to allow public read
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.bucket.id

  depends_on = [aws_s3_bucket_public_access_block.block_public]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bucket.arn}/*"
      }
    ]
  })
}

# Output website URL
output "website_url" {
  value = "http://${aws_s3_bucket.bucket.bucket}.s3-website-ap-south-1.amazonaws.com"
}
