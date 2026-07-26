"use client";

import React from "react";

export default function useQuantityInputGroup({
  min,
  max,
  onChangeValue,
}: {
  min: number;
  max: number;
  onChangeValue?: (value: number, isOverMax: boolean) => void;
}) {
  const [inputValue, setInputValue] = React.useState<string>(min.toString());
  const currentQuantity = Number(inputValue);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const isMinReached = currentQuantity <= min;
  const isMaxReached = currentQuantity >= max;

  const triggerChange = (value: number) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setInputValue(clampedValue.toString());
    onChangeValue?.(clampedValue, value > max);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ""); /// delete the non-digit pattern (e.g: "abc-452" will become "452" after this operation)
    setInputValue(numericValue);
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

  return {
    inputValue,
    inputRef,
    isMinReached,
    isMaxReached,
    handleOnBlur,
    handleOnChange,
    handleIncrement,
    handleDecrement,
    handleKeyDown,
  };
}
