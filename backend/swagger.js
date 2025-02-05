import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phoenix Gadget API",
      version: "1.0.0",
      description: "API for managing IMF gadgets.",
    },
    servers: [
      {
        url: "https://upraised-assignment.onrender.com", // Replace with your Render/Production URL after deployment
      },
    ],
  },
  apis: ["./src/route/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const setupSwaggerDocs = (app, port) => {
  // Check if the environment is production
  if (process.env.NODE_ENV === "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger Docs available at https://upraised-assignment.onrender.com/api-docs`);
  } else {
    console.log(`Swagger Docs are disabled in the development environment.`);
  }
};
