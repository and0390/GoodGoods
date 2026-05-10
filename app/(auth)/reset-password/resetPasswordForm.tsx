"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/authClient";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { AuthForm, AuthFormRootProps } from "../_components/AuthForm";
import { FormInputFieldListProps } from "../_components/FormInputField";
import { ResetPasswordSchema, resetPasswordSchema } from "../_schemas/auth";

export default function ResetPasswordForm({
  token,
  className,
  ...props
}: Omit<
  ComponentProps<typeof AuthForm>,
  "onSubmit" | "schema" | "defaultValues" | "children"
> & { token: string }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: AuthFormRootProps<ResetPasswordSchema>["onSubmit"] = async (
    payload
  ) => {
    const { error } = await authClient.resetPassword({
      newPassword: payload.confirmPassword,
      token: token,
    });

    if (error) {
      return {
        type: error.code,
        message: error.message,
      };
    } else {
      setIsSuccess(true);
    }
  };

  const formFields: FormInputFieldListProps<ResetPasswordSchema>["formFields"] =
    [
      { name: "password", labelName: "Password", type: "password" },
      {
        name: "confirmPassword",
        labelName: "Confirm password",
        type: "password",
      },
    ];

  if (isSuccess)
    return (
      <div className="flex flex-col items-center gap-4 self-center text-center">
        <CheckCircle className="size-12 text-primary" />
        <h1 className="text-2xl font-semibold">Password changed!</h1>
        <p className="text-sm text-muted-foreground">
          Your password has been updated. You can now Log In.
        </p>
        <Button asChild size="lg">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    );

  return (
    <AuthForm
      schema={resetPasswordSchema}
      defaultValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={onSubmit}
      className={className}
      {...props}
    >
      <FieldGroup>
        <AuthForm.Error title="Reset password failed" />
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Create a new secure password for your account.
          </p>
          <AuthForm.Fields formFields={formFields} />
        </div>
        <AuthForm.SubmitButton>Update Password</AuthForm.SubmitButton>
      </FieldGroup>
    </AuthForm>
  );
}
