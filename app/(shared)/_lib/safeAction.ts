import {
  ActionResponseSuccess,
  ActionResponseFailed,
} from "../_types/actionResponse";

export const safeAction = <Args extends unknown[], TSuccessBody = null>(
  actionName: string,
  actionFn: (
    ...args: Args
  ) => Promise<ActionResponseSuccess<TSuccessBody> | ActionResponseFailed>,
  message?: string
) => {
  return async (
    ...args: Args
  ): Promise<ActionResponseSuccess<TSuccessBody> | ActionResponseFailed> => {
    try {
      return await actionFn(...args);
    } catch (err) {
      console.error(`[Action ${actionName}]:`, err);
      return {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: message ?? "Something went wrong, Please try again later",
      };
    }
  };
};
