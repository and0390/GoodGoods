"use client";

import React from "react";

type SelectedItemsContextType = {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  handleToggleItem: (itemId: string) => void;
};

const SelectedItemsContext =
  React.createContext<SelectedItemsContextType | null>(null);

export const useSelectedItemsContext = () => {
  const context = React.useContext(SelectedItemsContext);

  if (!context) {
    throw new Error(
      "useSelectedItemsContext must be used within a SelectedItemsProvider"
    );
  }

  return context;
};

const SelectedItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <SelectedItemsContext.Provider
      value={{ selectedItems, setSelectedItems, handleToggleItem }}
    >
      {children}
    </SelectedItemsContext.Provider>
  );
};

export default SelectedItemsProvider;
