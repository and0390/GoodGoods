"use client";

import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/authClient";
import { AuthForm, AuthFormRootProps } from "../_components/AuthForm";
import { FormInputFieldListProps } from "../_components/FormInputField";
import { useCountdown } from "../_hooks/useCountdown";
import { ForgotPasswordSchema, forgotPasswordSchema } from "../_schemas/auth";
import { formatSecondsToMMSS } from "../_utils";

export default function ForgotPasswordPage() {
  {
    /* 120 = 2 minutes in second */
  }
  const { secondsLeft, startCountdown, isRunning } = useCountdown(120);

  const onSubmit: AuthFormRootProps<ForgotPasswordSchema>["onSubmit"] = async (
    data
  ) => {
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      return {
        type: error.code,
        message: error.message,
      };
    } else {
      startCountdown();
    }
  };

  const formFields: FormInputFieldListProps<ForgotPasswordSchema>["formFields"] =
    [{ name: "email", type: "email", labelName: "Email" }];

  return (
    <div className="flex flex-1 justify-center">
      <AuthForm
        schema={forgotPasswordSchema}
        defaultValues={{
          email: "",
        }}
        onSubmit={onSubmit}
        className="max-w-md justify-stretch gap-4"
      >
        <FieldGroup>
          <AuthForm.Error title="Reset password request failed" />
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-2xl leading-snug font-semibold">
              Forgot Password
            </h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ll send you a reset link to your email.
            </p>
            <AuthForm.Fields formFields={formFields} />
          </div>
          {isRunning && (
            <p className="text- mx-auto text-sm text-foreground">
              Didn&apos;t receive an email? Try again in{" "}
              <span className="text-primary">
                {formatSecondsToMMSS(secondsLeft)}
              </span>
            </p>
          )}
          <AuthForm.SubmitButton disabled={isRunning}>
            Send Link
          </AuthForm.SubmitButton>
        </FieldGroup>
      </AuthForm>
    </div>
  );
}
