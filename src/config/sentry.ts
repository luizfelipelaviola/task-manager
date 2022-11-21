import * as Sentry from "@sentry/node";

// Error import
import { AppError } from "@shared/errors/AppError";

// Args import
import { argv } from "@shared/infra/http";

// App info import
import AppInfo from "@/package.json";

const sentryConfig: Sentry.NodeOptions = {
  dsn: process.env.SENTRY_DSN,
  debug: false,
  environment: argv.env,
  release: AppInfo.version,
  tracesSampleRate: 1.0,
};

const sentryRequestHandlerConfig: Sentry.Handlers.RequestHandlerOptions = {
  ip: true,
};

const sentryErrorHandlerConfig: Parameters<
  typeof Sentry.Handlers.errorHandler
>[0] = {
  shouldHandleError(err) {
    return (
      !!err &&
      ((err.statusCode && err.statusCode >= 500) ||
        (err instanceof AppError && !!err.debug))
    );
  },
};

export { sentryConfig, sentryRequestHandlerConfig, sentryErrorHandlerConfig };
