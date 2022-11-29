import { describe, it, beforeEach, expect } from "@jest/globals";

// Factory import
import { userFactory, password } from "@tests/factories/user.factory";

// Service import
import { SignInService } from "./signIn.service";

// Mock import
import { UserSessionRepositoryMock } from "../repositories/mocks/UserSession.repository.mock";
import { UserRepositoryMock } from "../repositories/mocks/User.repository.mock";

const userRepositoryMock = new UserRepositoryMock();
const userSessionRepositoryMock = new UserSessionRepositoryMock();

describe("SignInService", () => {
  beforeEach(() => {
    userRepositoryMock.users = [];
  });

  it("should be able to sign in", async () => {
    const user = userFactory();
    userRepositoryMock.users.push(user);

    const signInService = new SignInService(
      userRepositoryMock,
      userSessionRepositoryMock,
    );

    await expect(
      signInService.execute({
        email: user.email,
        password,
        language: "en",
      }),
    ).resolves.toMatchObject({
      user,
    });
  });

  it("should not be able to sign in if password is incorrect", async () => {
    const user = userFactory();
    userRepositoryMock.users.push(user);

    const signInService = new SignInService(
      userRepositoryMock,
      userSessionRepositoryMock,
    );

    await expect(
      signInService.execute({
        email: user.email,
        password: "incorrect_password",
        language: "en",
      }),
    ).rejects.toHaveProperty(
      "key",
      "@sign_in_service/EMAIL_OR_PASSWORD_INCORRECT",
    );
  });

  it("should not be able to sign in if user was not found", async () => {
    const user = userFactory();

    const signInService = new SignInService(
      userRepositoryMock,
      userSessionRepositoryMock,
    );

    await expect(
      signInService.execute({
        email: user.email,
        password,
        language: "en",
      }),
    ).rejects.toHaveProperty(
      "key",
      "@sign_in_service/EMAIL_OR_PASSWORD_INCORRECT",
    );
  });
});
