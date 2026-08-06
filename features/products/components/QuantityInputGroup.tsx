"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import useQuantityInputGroup from "../hooks/useQuantityInputGroup";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  Ref,
} from "react";

type QuantityInputGroupProps = {
  inputRef: Ref<HTMLInputElement>;
  inputValue: string;
  handleInputOnChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  handleInputOnBlur: FocusEventHandler<HTMLInputElement>;
  handleInputOnKeyDown: KeyboardEventHandler<HTMLInputElement>;
  handleDecrement: () => void;
  handleIncrement: () => void;
  isMaxReached: boolean;
  isMinReached: boolean;
  isOverMax: boolean;
  className?: string;
};

export default function QuantityInputGroup({
  handleDecrement,
  handleIncrement,
  handleInputOnBlur,
  handleInputOnChange,
  handleInputOnKeyDown,
  inputRef,
  inputValue,
  isMaxReached,
  isMinReached,
  isOverMax,
  className,
}: QuantityInputGroupProps) {
  return (
    <InputGroup
      className={cn(
        "size-auto overflow-hidden p-0 hover:border-input has-disabled:bg-transparent has-disabled:opacity-100 has-[[data-slot=input-group-control]:focus-visible]:border-input! has-[[data-slot=input-group-control]:focus-visible]:ring-0! dark:has-disabled:bg-input/30 dark:has-disabled:opacity-100",
        className
      )}
    >
      <InputGroupInput
        ref={inputRef}
        className="h-9 w-10 py-0 text-center"
        value={inputValue}
        id="quantityInput"
        onChange={handleInputOnChange}
        onBlur={handleInputOnBlur}
        onKeyDown={handleInputOnKeyDown}
        aria-invalid={isOverMax}
        aria-describedby={isOverMax ? "quantity-error" : undefined}
      />
      <InputGroupAddon align="inline-start" className="p-0 has-[>button]:ml-0">
        <InputGroupButton
          aria-label="decrease quantity"
          title="decrease"
          onClick={handleDecrement}
          className="m-0! size-9 rounded-none border-0 px-0"
          disabled={isMinReached}
        >
          <Minus />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="p-0 has-[>button]:mr-0">
        <InputGroupButton
          aria-label="increase quantity"
          title="increase"
          className="size-9 rounded-none border-0"
          onClick={handleIncrement}
          disabled={isMaxReached}
        >
          <Plus />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
