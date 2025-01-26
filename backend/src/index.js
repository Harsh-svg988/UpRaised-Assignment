import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./lib/db.js";
import authRoute from "./route/auth.route.js";
import gadgetRoute from "./route/gadget.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setupSwaggerDocs } from "../swagger.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/auth", authRoute);
app.use("/gadgets", gadgetRoute);

// Set up Swagger documentation
setupSwaggerDocs(app, PORT);

app.listen(PORT, () => {
  initializeDatabase();
  console.log(`Server running on port ${PORT}`);
});
