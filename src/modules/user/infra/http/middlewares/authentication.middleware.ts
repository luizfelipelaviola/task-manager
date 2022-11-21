import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

// Service import
import { CheckAuthenticatedService } from "@modules/user/services/checkAuthenticated.service";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { language, headers } = req;
  const { authorization: authHeader } = headers;

  if (authHeader) {
    const [, token] = authHeader.split(" ");

    if (token) {
      try {
        const checkAuthenticatedService = container.resolve(
          CheckAuthenticatedService,
        );

        const session = await checkAuthenticatedService.execute({
          token,
          language,
          agent_info: req.agent_info,
        });

        req.session = session;

        return next();
      } catch {}
    }
  }

  req.session = undefined as any;
  return next();
};

export { authenticationMiddleware };
