import StateComponent from "@/components/StateComponent";
import { TbShoppingCartSearch } from "react-icons/tb";

export default function CartEmptyState() {
  return (
    <StateComponent
      header="Oops, Your cart seems empty"
      className="h-fit! py-10 [&_.message-icon-container]:bg-transparent [&_.message-icon-container]:p-0 [&_.message-icon-header]:text-2xl! [&_.message-icon-header]:font-bold! [&_.message-icon-message]:leading-tight!"
      icon={<TbShoppingCartSearch className="size-30 text-primary" />}
      message="Let's fill your cart with items you like!"
      action={{
        label: "Start shopping",
        className: "font-semibold px-12 mt-2",
      }}
    />
  );
}
