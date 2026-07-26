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
