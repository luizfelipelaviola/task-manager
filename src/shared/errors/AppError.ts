import { v4 as uuid } from "uuid";
import * as Sentry from "@sentry/node";

interface IAppError {
  key: string;
  message: string;
  statusCode?: number;
  debug?: {
    [key: string]: any;
  };
}

class AppError extends Error {
  public readonly key: string;

  public readonly message: string;

  public readonly statusCode: number;

  public readonly debug:
    | {
        [key: string]: any;
      }
    | undefined;

  public readonly errorCode: string;

  public readonly action: Promise<void>;

  constructor(params: IAppError) {
    super(params.message);
    Object.setPrototypeOf(this, AppError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.key = params.key;
    this.message = params.message;
    this.statusCode = params.statusCode
      ? params.statusCode
      : params.debug
      ? 500
      : 400;
    this.errorCode = uuid();
    this.debug = params.debug
      ? {
          ...params.debug,
          error_code: this.errorCode,
        }
      : undefined;
    this.name = params.key;
    this.action = this.register();
  }

  private async register() {
    if (this.debug) {
      // Sentry error tracking
      Sentry.addBreadcrumb({
        category: "data",
        message: this.message,
        data: this.debug,
        type: "error",
        level: "debug",
      });
      Sentry.captureException(this);
    }
  }
}

export { AppError };
