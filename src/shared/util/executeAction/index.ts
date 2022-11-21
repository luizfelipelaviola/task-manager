// Util import
import { sleep } from "@shared/util/sleep";

// Interfaces
interface IParams {
  actionName: string;
  action: () => Promise<any>;
  attempt?: number;
  maxAttempts?: number;
  retryDelay?: number;
}

const executeAction = async (params: IParams): Promise<any> => {
  const { actionName, action, attempt = 1, maxAttempts = 3 } = params;

  try {
    const result = await action();
    console.log(
      attempt > 1
        ? `🆗 ${actionName} success with attempt ${attempt} ❎. `
        : `🆗 ${actionName} success.`,
    );
    return result;
  } catch (err: any) {
    if (attempt > maxAttempts)
      throw new Error(
        `❌ ${actionName} failure after ${attempt - 1} retries. ${
          err?.message
        }`,
      );

    console.log(
      `❌ ${actionName} attempt ${attempt} failed. 🔄 Retrying... ${err.message} `,
    );
    await sleep(params.retryDelay || 5000);
    return executeAction({
      ...params,
      attempt: attempt + 1,
    });
  }
};

export { executeAction };
