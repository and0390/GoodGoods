import { IconDatabaseOff } from "@tabler/icons-react";

export default function ProductTabEmpty() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-card md:h-72">
      <div className="rounded-full bg-primary p-3 md:p-4">
        <IconDatabaseOff className="size-[46px] flex-none rounded-full text-primary-foreground md:size-[64px]" />
      </div>
      <h3 className="mt-3 text-base font-medium md:text-lg">
        There are no products to show at the moment
      </h3>
    </div>
  );
}
