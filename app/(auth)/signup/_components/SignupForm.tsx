"use client";

import { authClient } from "@/lib/authClient";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { AuthForm, AuthFormRootProps } from "../../_components/AuthForm";
import { type FormInputFieldListProps } from "../../_components/FormInputFieldList";
import { SignupSchema, signupSchema } from "../_schema";

export default function SignupForm({
  className,
  ...props
}: Omit<
  ComponentProps<typeof AuthForm>,
  "schema" | "defaultValues" | "onSubmit"
>) {
  const router = useRouter();

  const formFields: FormInputFieldListProps<SignupSchema>["formFields"] = [
    {
      labelName: "Username",
      type: "text",
      name: "username",
    },
    { labelName: "Email", type: "text", name: "email" },
    {
      labelName: "Password",
      type: "password",
      name: "password",
    },
  ];

  const onSubmit: AuthFormRootProps<SignupSchema>["onSubmit"] = async (
    data
  ) => {
    const { error } = await authClient.signUp.email({
      name: data.username,
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
      schema={signupSchema}
      defaultValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      className={className}
    >
      <FieldGroup>
        <AuthForm.ErrorAlert title="Sign Up failed" />
        <AuthForm.Fields formFields={formFields} />
      </FieldGroup>
      <FieldGroup>
        <Field>
          <AuthForm.SubmitButton>Sign Up</AuthForm.SubmitButton>
          <div className="gap mx-auto flex w-auto! gap-2">
            <span className="text-sm">Already have an account?</span>
            <Button variant="link" asChild className="h-auto px-0">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </Field>
        <FieldSeparator>OR</FieldSeparator>
        <Field>
          <AuthForm.GoogleButton />
          <AuthForm.FaceBookButton />
        </Field>
      </FieldGroup>
    </AuthForm>
  );
}
