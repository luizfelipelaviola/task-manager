import { describe, it, beforeEach, expect } from "@jest/globals";

// Factory import
import { userFactory, password } from "@tests/factories/user.factory";

// Service import
import { SignUpService } from "./signUp.service";

// Mock import
import { UserSessionRepositoryMock } from "../repositories/mocks/UserSession.repository.mock";
import { UserRepositoryMock } from "../repositories/mocks/User.repository.mock";

const userRepositoryMock = new UserRepositoryMock();
const userSessionRepositoryMock = new UserSessionRepositoryMock();

describe("SignUpService", () => {
  beforeEach(() => {
    userRepositoryMock.users = [];
  });

  it("should be able to sign up", async () => {
    const user = userFactory();

    const signUpService = new SignUpService(
      userRepositoryMock,
      userSessionRepositoryMock,
    );

    await expect(
      signUpService.execute({
        email: user.email,
        name: user.name,
        password,
        language: "en",
      }),
    ).resolves.toMatchObject({
      user: {
        email: user.email,
      },
    });
  });

  it("should not be able to sign up if email is already in use", async () => {
    const user = userFactory();
    userRepositoryMock.users.push(user);

    const signUpService = new SignUpService(
      userRepositoryMock,
      userSessionRepositoryMock,
    );

    await expect(
      signUpService.execute({
        email: user.email,
        name: user.name,
        password,
        language: "en",
      }),
    ).rejects.toHaveProperty("key", "@sign_up_service/EMAIL_ALREADY_IN_USE");
  });
});
