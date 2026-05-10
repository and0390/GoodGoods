"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { cva } from "class-variance-authority";
import { AlertCircle, Loader2 } from "lucide-react";
import { ComponentProps, createContext, useContext } from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { ZodType } from "zod";
import {
  FormInputFieldList,
  FormInputFieldListProps,
} from "../_components/FormInputField";
import { cn } from "@/lib/utils";

type AuthFormContextValue<T extends FieldValues> = {
  form: UseFormReturn<T, unknown, T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthFormContext = createContext<AuthFormContextValue<any> | null>(null);

const useAuthFormContext = <T extends FieldValues>() => {
  const context = useContext(AuthFormContext);

  if (!context) {
    throw new Error("AuthForm components must be used within <AuthForm.Root>");
  }

  return context as AuthFormContextValue<T>;
};

export type AuthFormRootProps<T extends FieldValues> = {
  schema: ZodType<T, T>;
  defaultValues: DefaultValues<T>;
  variant?: "spread" | "tight";
  onSubmit: (data: T) => Promise<{ type?: string; message?: string } | void>;
} & Omit<ComponentProps<"form">, "onSubmit">;

function AuthFormRoot<T extends FieldValues>({
  schema,
  defaultValues,
  children,
  className,
  onSubmit,
  ...props
}: AuthFormRootProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmitInternal: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result) {
      const { type, message } = result;
      form.setError("root", {
        type,
        message,
      });
    }
  };

  return (
    <AuthFormContext.Provider value={{ form }}>
      <form
        {...props}
        className={cn("flex flex-1 flex-col justify-between py-4", className)}
        onSubmit={form.handleSubmit(onSubmitInternal)}
      >
        {children}
      </form>
    </AuthFormContext.Provider>
  );
}

function AuthFormFields<T extends FieldValues>({
  formFields,
}: Omit<FormInputFieldListProps<T>, "control">) {
  const { form } = useAuthFormContext<T>();
  return <FormInputFieldList control={form.control} formFields={formFields} />;
}

export type AuthFormSubmitButtonProps = {
  loadingText?: string;
} & Omit<ComponentProps<typeof Button>, "size" | "type">;

function AuthFormSubmitButton<T extends FieldValues>({
  loadingText,
  disabled,
  children,
}: AuthFormSubmitButtonProps) {
  const {
    form: { formState },
  } = useAuthFormContext<T>();

  const isSubmitting = formState["isSubmitting"];
  return (
    <Button size="lg" type="submit" disabled={isSubmitting || disabled}>
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

function AuthFormGoogleButton({
  children = "Google",
  ...props
}: Omit<ComponentProps<typeof Button>, "variant" | "type" | "size">) {
  return (
    <Button {...props} variant="secondary" type="button" size="lg">
      <FaGoogle />
      {children}
    </Button>
  );
}

function AuthFormFacebookButton({
  children = "Facebook",
  ...props
}: Omit<ComponentProps<typeof Button>, "variant" | "type" | "size">) {
  return (
    <Button {...props} variant="secondary" type="button" size="lg">
      <FaFacebook />
      {children}
    </Button>
  );
}

export type AuthFormErrorProps = {
  title: string;
} & Omit<ComponentProps<typeof Alert>, "variant" | "children">;

function AuthFormError({ title, ...props }: AuthFormErrorProps) {
  const { form } = useAuthFormContext();
  return (
    form.formState.errors.root && (
      <Alert {...props} variant="destructive">
        <AlertCircle />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {form.formState.errors.root?.message}
        </AlertDescription>
      </Alert>
    )
  );
}

export type AuthFormLinkButtonProps = {
  href: string;
} & Omit<ComponentProps<typeof Button>, "variant" | "asChild">;

export const AuthForm = Object.assign(AuthFormRoot, {
  Root: AuthFormRoot,
  Fields: AuthFormFields,
  SubmitButton: AuthFormSubmitButton,
  Error: AuthFormError,
  GoogleButton: AuthFormGoogleButton,
  FaceBookButton: AuthFormFacebookButton,
});
