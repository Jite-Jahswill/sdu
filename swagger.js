// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Campus Assistant API",
      version: "1.0.0",
      description: "API documentation for your campus assistant app",
    },
    servers: [
      {
        url: "http://localhost:3000", // matches the dev URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Scan for Swagger comments in your routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
