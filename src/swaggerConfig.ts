import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Order Taking App API',
      version: '1.0.0',
      description: 'API documentation for the Order Taking App',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'],
  };

const swaggerDocs = swaggerJsdoc(options);
export default swaggerDocs;
