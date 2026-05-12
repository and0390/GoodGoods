"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export type FormInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  labelName?: string;
  placeholder?: string;
  control: Control<T>;
  type: "text" | "password" | "email";
};

export const FormInputField = <T extends FieldValues>({
  labelName,
  name,
  placeholder,
  control,
  type,
}: FormInputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            {labelName && <FieldLabel htmlFor={name}>{labelName}</FieldLabel>}
            <InputGroup>
              <InputGroupInput
                {...field}
                id={name}
                placeholder={placeholder}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                name={name}
                aria-invalid={fieldState.invalid}
              />
              {type === "password" && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Copy"
                    title={showPassword ? "hide password" : "show password"}
                    size="icon-sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </InputGroupButton>
                </InputGroupAddon>
              )}
              {fieldState.invalid && (
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleAlert className="text-destructive" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <FieldError errors={[fieldState.error]} />
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>
        );
      }}
    />
  );
};

export type FormInputFieldListProps<T extends FieldValues> = {
  formFields: Array<Omit<FormInputFieldProps<T>, "control">>;
  control: Control<T>;
} & ComponentProps<typeof FieldGroup>;

export const FormInputFieldList = <T extends FieldValues>({
  formFields,
  control,
  ...props
}: FormInputFieldListProps<T>) => {
  return formFields.map((formField) => (
    <FieldGroup key={formField.name} {...props}>
      <FormInputField control={control} {...formField} />
    </FieldGroup>
  ));
};
