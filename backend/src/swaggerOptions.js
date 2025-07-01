import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI-Learning-Platform',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://ai-learning-platform-production-db30.up.railway.app',
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
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'string' },
            role: { type: 'string' },
            created_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        UserInput: {
          type: 'object',
          required: ['id', 'name', 'phone'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        UserHistory: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'string' },
            category_id: { type: 'integer' },
            sub_category_id: { type: 'integer' },
            prompt: { type: 'string' },
            response: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            user_name: { type: 'string' },
            user_phone: { type: 'string' },
            category_name: { type: 'string' },
            sub_category_name: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
