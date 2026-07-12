"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Minus, Plus } from "lucide-react";
import React from "react";
import useUpdateQuantity from "../_hooks/useUpdateQuantity";
import QuantityInputGroupBase from "@/shared/_components/QuantityInputGroup";

type QuantityInputGroupProps = {
  cartItemId: string;
  initialQuantity: number;
  max: number;
  onChangeValue?: (value: number) => void;
};

export const QuantityInputGroup = ({
  cartItemId,
  initialQuantity,
  max,
}: QuantityInputGroupProps) => {
  const { mutate } = useUpdateQuantity(cartItemId);

  return (
    <QuantityInputGroupBase
      initialQuantity={initialQuantity}
      max={max}
      onChangeValue={mutate}
    />
  );
};
