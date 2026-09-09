# Pilot Infra Demo

A small infrastructure-as-code demo built to understand the practical flow of deploying a simple web app with Terraform, AWS S3, and Spacelift-style orchestration.

This is not a production infrastructure platform. It is a focused learning/demo project showing that I can work through infrastructure concepts hands-on, connect code to deployment flow, and keep the setup understandable.

## What This Covers

- Terraform-based infrastructure setup
- AWS S3 static website hosting
- Git-based workflow
- Spacelift configuration
- Post-apply automation experiment
- Basic separation between app code and infrastructure code

## Repository Structure

```text
app/        Static demo app files
iac/        Terraform infrastructure configuration
.spacelift/ Spacelift configuration
notes.md    Working notes and observations
