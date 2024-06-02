# Order Taking App

## Overview
The Order Taking App is a web application designed for managing orders, users, and menu items. This repository contains the source code for the application.

## Features
- User registration and authentication
- Menu management
- Cart management
- Order placement and history tracking

## Technologies Used
- Node.js
- Express.js
- MongoDB
- TypeScript
## Technologies preferred for Deployment
- Docker 
- AWS (ECR, ECS, EC2, ALB)
- Apigee API Gateway

## Setup Instructions
To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/SivakumarRavikumar/order-taking-app-ts.git
    cd order-taking-app-ts
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables
    PORT=5000
    MONGO_URI=our_mongodb_connection_string
    JWT_SECRET=our_jwt_secret (To do can be fetched from credstash)
4. **Run the application:**
    ```bash
    npm start
    ```

## Deployment Strategy
The application is deployed using AWS and Docker. Below are the steps for deploying the application:

1. **Build the Docker image:**
    ```bash
    docker build -t order-taking-app-ts .
    ```
    1.1 ### MongoDB Setup with Docker

    Deploy MongoDB as a Docker container and integrate it with our application


2. **Upload to AWS ECR:**
    - Create an ECR repository in the AWS Management Console.
    - Tag and push the Docker image to ECR:
      ```bash
      $(aws ecr get-login --no-include-email --region our-region)
      docker tag order-taking-app-ts:latest our-account-id.dkr.ecr.our-region.amazonaws.com/order-taking-app-ts:latest
      docker push our-account-id.dkr.ecr.our-region.amazonaws.com/order-taking-app-ts:latest
      ```

3. **Set up AWS ECS:**
    - Create a new ECS cluster.
    - Define a task definition that uses the Docker image from ECR.
    - Set up an ECS service with the task definition and configure it to use an Application Load Balancer (ALB) for load balancing.

4. **Configure Auto Scaling:**
    - Set up auto scaling for our ECS service based on CPU and memory usage.

5. **Store Secrets in AWS Secrets Manager or Credstash:**
    - Store sensitive information such as database credentials and API keys securely.
    - Update the ECS task definition to use these secrets.

6. **API Management with Apigee:**
    - Set up an Apigee API Gateway for managing and securing our APIs.
    - Configure rate limiting, caching, and other API management features as needed.

## Testing
To run the tests, use the following command:
```bash
npm test


Use AWS CloudFormation or Terraform to define our infrastructure as code for reproducible deployments.
Conduct load testing to ensure that our application can handle expected traffic levels.

Note: Incorporating Apigee API Gateway for API management adds another layer of control, security, and analytics to our application's APIs
