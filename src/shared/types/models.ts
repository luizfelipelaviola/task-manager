import { Prisma } from "@prisma/client";

export type UserType = Prisma.UserGetPayload<{
  include: {
    tasks: true;
  };
}>;

export type TaskType = Prisma.TaskGetPayload<{
  include: {
    user: true;
  };
}>;

export type UserSessionType = Prisma.UserSessionGetPayload<{
  include: {
    user: true;
  };
}>;
