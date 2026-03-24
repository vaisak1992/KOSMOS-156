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

# Block public access (security best practice)
resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
