terraform {
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "random" {}

resource "random_string" "demo" {
  length  = 8
  upper   = true
  lower   = true
  numeric = true
  special = false
}