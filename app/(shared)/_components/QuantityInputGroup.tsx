"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Minus, Plus } from "lucide-react";
import React from "react";

type QuantityInputGroupProps = {
  initialQuantity: number;
  min?: number;
  max: number;
  onChangeValue?: (value: number, isOverMax: boolean) => void;
};

export default function QuantityInputGroup({
  initialQuantity,
  min = 1,
  max,
  onChangeValue,
}: QuantityInputGroupProps) {
  const [quantityInput, setQuantityInput] = React.useState(
    initialQuantity.toString()
  );
  const currentQuantity = parseInt(quantityInput, 10);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const isMinReached = currentQuantity <= min;
  const isMaxReached = currentQuantity >= max;

  const triggerChange = (value: number) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantityInput(clampedValue.toString());
    onChangeValue?.(clampedValue, value > max);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ""); /// delete the non-digit pattern (e.g: "abc-452" will become "452" after this operation)
    setQuantityInput(numericValue);
  };

  const handleOnBlur = () => {
    triggerChange(currentQuantity);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const handleIncrement = () => {
    if (currentQuantity < max) triggerChange(currentQuantity + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > min) triggerChange(currentQuantity - 1);
  };

  return (
    <InputGroup className="w-fit hover:border-input has-disabled:bg-transparent has-disabled:opacity-100 dark:has-disabled:bg-input/30 dark:has-disabled:opacity-100">
      <InputGroupInput
        ref={inputRef}
        className="w-13 text-center"
        value={quantityInput}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
      />
      <InputGroupAddon align="inline-start">
        <InputGroupButton
          aria-label="decrease quantity"
          title="decrease"
          size="icon-sm"
          onClick={handleDecrement}
          disabled={isMinReached}
        >
          <Minus />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="increase quantity"
          title="increase"
          size="icon-sm"
          onClick={handleIncrement}
          disabled={isMaxReached}
        >
          <Plus />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
