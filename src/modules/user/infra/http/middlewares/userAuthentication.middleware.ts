import { NextFunction, Request, Response } from "express";

// Error import
import { AppError } from "@shared/errors/AppError";

const userAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { t, session } = req;

  if (!session?.user)
    throw new AppError({
      key: "@user_auth_middleware/UNAUTHORIZED",
      message: t("@user_auth_middleware/UNAUTHORIZED", "Not authenticated"),
      statusCode: 401,
    });

  return next();
};

export { userAuthenticationMiddleware };
