/* eslint-disable prettier/prettier */

import { container } from "tsyringe";

// Providers import
import "./providers";

import {
  // Interface import
  IUserSessionRepository,
  IUserRepository,
  ITaskRepository,

  // Repository import
  UserSessionRepository,
  UserRepository,
  TaskRepository,
} from "@shared/container/repositories";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUserSessionRepository>("UserSessionRepository", UserSessionRepository);
container.registerSingleton<ITaskRepository>("TaskRepository", TaskRepository);
