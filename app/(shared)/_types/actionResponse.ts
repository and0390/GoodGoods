export type ActionResponseSuccess<Tbody = null> = {
  success: true;
  message: string;
  body: Tbody;
};

export type ActionResponseFailed = {
  success: false;
  code?: string;
  message: string;
};

export type ActionResponseData<Tbody = null> =
  | ActionResponseSuccess<Tbody>
  | ActionResponseFailed;
