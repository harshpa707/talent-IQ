import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import emailRoutes from "./routes/emailRoutes.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRouter from "./routes/chatRouters.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors({ orign: ENV.CLIENT_URL, credentials: true }));
app.use("/api/inngest", serve({ client: inngest, functions }));

// Routes
app.use("/api", emailRoutes);
app.use("/api/chat", chatRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "API is up and running",
  });
});

// Production setup
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
