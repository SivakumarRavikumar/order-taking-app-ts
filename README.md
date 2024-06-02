Order Taking App
Welcome to the Order Taking App! This application allows users to browse restaurants, view menus, add items to their cart, place orders, and track order status.

Features
User Authentication: Users can sign up and log in to access the app features.
Restaurant Browsing: Browse through a list of restaurants and view their menus.
Menu Exploration: View detailed menus with descriptions and prices.
Cart Management: Add items to the cart, adjust quantities, and remove items.
Order Placement: Place orders and receive confirmation with order details.
Order Tracking: Track the status of placed orders.
Technologies Used
Node.js: Backend JavaScript runtime environment.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database used for storing user data, menus, and orders.
Mongoose: MongoDB object modeling for Node.js.
JSON Web Tokens (JWT): Used for user authentication and authorization.
bcrypt.js: Library for hashing passwords.
Swagger UI: For API documentation.
Jest: Testing frameworks for unit and integration tests.

1. Clone the repository:
git clone https://github.com/yourusername/order-taking-app.git

2. Install dependencies:
cd order-taking-app-ts
npm install

3. Set up environment variables:
Create a .env file in the root directory and add the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the server:
npm start

5.API Documentation
API documentation is available using Swagger UI. Visit http://localhost:5000/api-docs after starting the server to view the documentation.

Testing
Run tests using the following command:
npm test


Deployment Strategy: Have work experience in creating all below infra's in AWS using terraform and cloudformation. 

1. Docker Image Creation and ECR Upload
Build Docker image locally using the Dockerfile.
Tag the image with the ECR repository URI.
Authenticate Docker to ECR registry using the AWS CLI.
Push the Docker image to ECR using the docker push command.
2. Secrets Management with Credstash
Install and configure Credstash CLI locally.
Encrypt sensitive data such as database credentials using Credstash.
Store the encrypted secrets in DynamoDB (used by Credstash).
Retrieve secrets during deployment using Credstash CLI or SDK and decrypt them at runtime.
3. ECS Cluster and Service Setup
Create an ECS cluster in the AWS Management Console.
Define ECS task definition with the container image from ECR and specify environment variables for secrets.
Configure the ECS service to run task definition, set up auto-scaling policies, and define the desired task count.
Associate the ECS service with an Application Load Balancer (ALB) for routing traffic to containers.
4. Deployment Automation
Set up a CI/CD pipeline (e.g., Bamboo) to automate the deployment process.
Configure the pipeline to trigger on code commits to your repository.
Use Bamboo plan to build Docker images and push them to ECR.
Deploy the updated task definition to ECS, triggering a rolling update of the service.
5. Monitoring and Logging
Enable CloudWatch Logs for ECS containers to capture application logs.
Set up CloudWatch Alarms to monitor ECS cluster metrics and trigger autoscaling actions.
Use CloudWatch Container Insights for deeper insights into container performance.
6. Security and Access Control
Configure IAM roles for ECS tasks to restrict access to AWS resources.
Use IAM roles for ECS service accounts (IAM roles for tasks) to grant permissions to interact with other AWS services.
Implement security best practices such as least privilege access and regularly rotate IAM credentials.
7. High Availability and Fault Tolerance
Enable multi-AZ deployment for ECS tasks to ensure high availability.
Configure health checks for ECS services to detect and recover from container failures.
Design application to be stateless and horizontally scalable for better fault tolerance.
8. Testing and Validation
Test our application deployment in a staging environment before promoting to production.

Use AWS CloudFormation or Terraform to define our infrastructure as code for reproducible deployments.
Conduct load testing to ensure that your application can handle expected traffic levels.

Note: Incorporating Apigee API Gateway for API management adds another layer of control, security, and analytics to our application's APIs (have work experience in apigee as well)