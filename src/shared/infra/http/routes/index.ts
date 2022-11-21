import { Router } from "express";

// Middleware import

// Router import
import { healthCheckRouter } from "@modules/healthcheck/infra/http/routes/healthCheck.routes";

// Router instance
const routes = Router();

routes.use("/health", healthCheckRouter);

export { routes };
