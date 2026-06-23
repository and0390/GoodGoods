export class HttpError extends Error {
  public statusCode: number;
  public code: string;
  constructor(statusCode: number, code: string, message?: string) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

type InputType = URL | RequestInfo | string;

type Fetcher = {
  <T>(input: InputType, init?: RequestInit): Promise<T>;

  get: typeof fetcherGet;
  post: typeof fetcherPost;
};

const fetcher = (async <T>(
  input: InputType,
  init?: RequestInit
): Promise<T> => {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new HttpError(res.status, json.code, json.message);
  }

  return json;
}) as Fetcher;

async function fetcherGet<T>(input: InputType, init?: RequestInit) {
  return await fetcher<T>(input, {
    ...init,
    method: "GET",
  });
}

async function fetcherPost<T>(input: InputType, init?: RequestInit) {
  return await fetcher<T>(input, {
    ...init,
    method: "POST",
  });
}

Object.assign(fetcher, {
  get: fetcherGet,
  post: fetcherPost,
});

export { fetcher };
