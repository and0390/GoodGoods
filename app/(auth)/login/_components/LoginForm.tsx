"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { authClient } from "@/lib/authClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm, AuthFormRootProps } from "../../_components/AuthForm";
import { FormInputFieldListProps } from "../../_components/FormInputFieldList";
import { loginSchema, LoginSchema } from "../_schemas";
import { ComponentProps } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginForm({
  className,
  error,
  ...props
}: Omit<
  ComponentProps<typeof AuthForm>,
  "schema" | "defaultValues" | "onSubmit" | "children"
> & { error?: string }) {
  const router = useRouter();

  const formFields: FormInputFieldListProps<LoginSchema>["formFields"] = [
    { labelName: "Email", name: "email", type: "text" },
    {
      labelName: "Password",
      name: "password",
      type: "password",
    },
  ];

  const onSubmit: AuthFormRootProps<LoginSchema>["onSubmit"] = async (data) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        type: error.code,
        message: error.message,
      };
    } else {
      router.push("/");
    }
  };

  return (
    <AuthForm
      {...props}
      schema={loginSchema}
      className={className}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-2">
        <FieldGroup>
          {error === "invalid_reset_link" && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Link expired</AlertTitle>
              <AlertDescription>
                Your reset link is invalid or expired. Please request a new one.
              </AlertDescription>
            </Alert>
          )}
          <AuthForm.ErrorAlert title="Log In failed" />
          <AuthForm.Fields formFields={formFields} />
        </FieldGroup>
        <Button variant="link" asChild className="self-end">
          <Link href="/forgot-password">Forgot password</Link>
        </Button>
      </div>
      <FieldGroup>
        <Field>
          <AuthForm.SubmitButton>Log in</AuthForm.SubmitButton>
          <div className="gap mx-auto flex w-auto! gap-2">
            <span className="text-sm">Don&apos;t have an account?</span>
            <Button variant="link" asChild className="h-auto px-0">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </Field>
        <FieldSeparator>OR</FieldSeparator>
        <Field>
          <AuthForm.GoogleButton />
          <AuthForm.FaceBookButton />
        </Field>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </FieldGroup>
    </AuthForm>
  );
}
