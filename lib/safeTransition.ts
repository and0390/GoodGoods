import toggleThumbsUp from "@/features/products/actions/toggleThumbsUp";

type SafeActionResult<ServerError, Schema, ShapedErrors, Data> =
  | { data?: undefined; serverError?: undefined; validationErrors?: undefined }
  | { data: Data; serverError?: undefined; validationErrors?: undefined }
  | {
      data?: undefined;
      serverError: ServerError;
      validationErrors?: undefined;
    }
  | {
      data?: undefined;
      serverError?: undefined;
      validationErrors: ShapedErrors;
    };

export default async function safeAction<
  ServerError,
  Schema,
  ShapedErrors,
  Data,
  ActionResult extends Promise<
    SafeActionResult<ServerError, Schema, ShapedErrors, Data>
  >,
>(actionResult: ActionResult) {
  try {
    return await actionResult;
  } catch (err) {
    console.warn(err);
    return {
      data: undefined,
      validationErrors: undefined,
      serverError:
        "Something went wrong, Please check your internet connection and try again later",
    };
  }
}

class ValidationError<T = unknown> extends Error {
  constructor(public errors: T) {
    super("Validation error");

    this.name = "ValidationError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class ServerError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "ServerError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export async function executeSafeAction<
  Schema,
  ShapedErrors,
  Data,
  ActionResult extends Promise<
    SafeActionResult<string, Schema, ShapedErrors, Data>
  >,
>(actionResult: ActionResult) {
  const result = await actionResult;

  if (result.serverError) {
    throw new ServerError(result.serverError);
  }

  if (result.validationErrors) {
    throw new ValidationError(result.validationErrors);
  }

  return result.data as NonNullable<Awaited<ActionResult>["data"]>;
}
