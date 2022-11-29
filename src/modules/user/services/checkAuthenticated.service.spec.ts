import { describe, it, beforeEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

// Factory import
import { sessionFactory } from "@tests/factories/session.factory";

// Mock import
import { UserSessionRepositoryMock } from "../repositories/mocks/UserSession.repository.mock";

// Service import
import { CheckAuthenticatedService } from "./checkAuthenticated.service";

const userSessionRepositoryMock = new UserSessionRepositoryMock();

describe("CheckAuthenticatedService", () => {
  beforeEach(() => {
    userSessionRepositoryMock.sessions = [];
  });

  it("should be able to check if the user is authenticated", async () => {
    const session = sessionFactory();
    userSessionRepositoryMock.sessions.push(session);

    const checkAuthenticatedService = new CheckAuthenticatedService(
      userSessionRepositoryMock,
    );

    await expect(
      checkAuthenticatedService.execute({
        token: session.token,
        language: "en",
      }),
    ).resolves.toEqual({
      user: session.user,
      session,
    });
  });

  it("should not be able to check if the user is authenticated if session is expired", async () => {
    const session = sessionFactory();
    session.expires_at = faker.date.past();
    userSessionRepositoryMock.sessions.push(session);

    const checkAuthenticatedService = new CheckAuthenticatedService(
      userSessionRepositoryMock,
    );

    await expect(
      checkAuthenticatedService.execute({
        token: session.token,
        language: "en",
      }),
    ).rejects.toHaveProperty(
      "key",
      "@check_authenticated_service/EXPIRED_TOKEN",
    );
  });

  it("should not be able to check if the user is authenticated if token is invalid", async () => {
    const session = sessionFactory();
    session.token = jwt.sign({}, "invalid_secret", {
      subject: session.user_id,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    userSessionRepositoryMock.sessions.push(session);

    const checkAuthenticatedService = new CheckAuthenticatedService(
      userSessionRepositoryMock,
    );

    await expect(
      checkAuthenticatedService.execute({
        token: session.token,
        language: "en",
      }),
    ).rejects.toHaveProperty(
      "key",
      "@check_authenticated_service/INVALID_TOKEN",
    );
  });

  it("should not be able to check if the user is authenticated if session was not found", async () => {
    const session = sessionFactory();

    const checkAuthenticatedService = new CheckAuthenticatedService(
      userSessionRepositoryMock,
    );

    await expect(
      checkAuthenticatedService.execute({
        token: session.token,
        language: "en",
      }),
    ).rejects.toHaveProperty(
      "key",
      "@check_authenticated_service/INVALID_SESSION",
    );
  });
});
