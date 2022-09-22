const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Config information
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation ALKEMY filmsDisneyApi",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express and documented with Swagger. This application manages two databases, one NoSQL with MongoDB and the other SQL with MySQL, managed with models made with mongoose and sequelize respectively.",
  },
  servers: [
    {
      url: "http://localhost:3000/filmsDisneyApi",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      authLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      authRegister: {
        type: "object",
        required: ["email", "password", "name"],
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      characters: {
        type: "object",
        required: ["Name", "Age", "Weight", "History", "Movie", "mediaId"],
        properties: {
          Name: {
            type: "string",
          },
          Age: {
            type: "number",
          },
          Weight: {
            type: "number",
          },
          History: {
            type: "string",
          },
          Movie: {
            type: "string",
          },
          mediaId: {
            type: "string",
          },
        },
      },
      gender: {
        type: "object",
        required: ["Name", "Movie", "mediaId"],
        properties: {
          Name: {
            type: "string",
          },
          Movie: {
            type: "string",
          },
          mediaId: {
            type: "string",
          },
        },
      },
      movies: {
        type: "object",
        required: [
          "Title",
          "Date",
          "Score",
          "associated_characters",
          "mediaId",
        ],
        properties: {
          Title: {
            type: "string",
          },
          Date: {
            type: "string",
          },
          Score: {
            type: "number",
          },
          associated_characters: {
            type: "array",
          },
          mediaId: {
            type: "string",
          },
        },
      },
      storage: {
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          filename: {
            type: "string",
          },
        },
      },
    },
  },
};

/**
 * Option
 */
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const openApiConfigration = swaggerJsdoc(options);

module.exports = openApiConfigration;
