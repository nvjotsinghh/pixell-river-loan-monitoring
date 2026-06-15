import express from "express";
import { httpLogger, consoleLogger } from "./api/v1/middleware/requestLogger";
import healthRoutes from "./api/v1/routes/health.routes";
import loanRoutes from "./api/v1/routes/loan.routes";
import userRoutes from "./api/v1/routes/user.routes";
import adminRoutes from "./api/v1/routes/admin.routes";
import { errorHandler } from "./api/v1/middleware/errorHandler";
import { NotFoundError } from "./api/v1/errors/NotFoundError";

const app = express();

// Logging middleware (first)
app.use(httpLogger);
app.use(consoleLogger);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// 404 handler
app.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

// Global error handler (last)
app.use(errorHandler);

export default app;