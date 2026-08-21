import StateComponent from "@/components/StateComponent";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function ProductTabError() {
  return (
    <StateComponent
      icon={<IconExclamationCircle />}
      header="Failed to fetch data"
      variant="error"
      action={{
        label: "Try again",
      }}
    />
  );
}
