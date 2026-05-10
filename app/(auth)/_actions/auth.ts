"use server";

import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import { z } from "zod";
import { loginSchema, signupSchema } from "../_schemas/auth";
import { redirect } from "next/navigation";

export type Response<T = undefined> = {
  success: boolean;
  code: string;
  message: string;
  body?: T;
};

export type ValidationBody = {
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
  code?: string;
  message?: string;
};

export async function SignUpAction(prevState: unknown, formData: FormData) {
  const rawData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = signupSchema.safeParse(rawData);

  if (!validated.success) {
    const response: Response<ValidationBody> = {
      success: false,
      code: "VALIDATION_ERROR",
      message: "signup was unsucessful",
      body: {
        errors: z.flattenError(validated.error).fieldErrors,
        values: rawData,
      },
    };
    return response;
  }

  const { username, ...rest } = rawData;

  console.error("hi");
  try {
    await auth.api.signUpEmail({
      body: {
        name: username,
        ...rest,
      },
      headers: await headers(),
    });

    console.error("hi");

    redirect("/");
  } catch (err) {
    if (isAPIError(err)) {
      return {
        success: false,
        code: "AUTH_ERROR",
        message: "signup was unsuccessful",
        body: {
          code: err.status,
          message: err.message,
        },
      } as Response<ValidationBody>;
    }
  }
}

export async function LogInAction(prevState: unknown, formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) {
    const response: Response<ValidationBody> = {
      success: false,
      code: "VALIDATION_ERROR",
      message: "login was unsuccessful",
      body: {
        errors: z.flattenError(validated.error).fieldErrors,
        values: rawData,
      },
    };
    return response;
  }

  const response: Response = {
    success: true,
    code: "SUCCESS",
    message: "login was successful",
  };
  return response;
}
