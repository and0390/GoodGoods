"use client";

import { PopularSearch, SearchQuery } from "@/app/(shared)/_types/search";
import StateComponent from "@/components/StateComponent";
import { ButtonPrimitive2 } from "@/components/ui/ButtonPrimitive";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithSkeleton2 } from "@/features/product-reviews/components/ImageWithSkeleton";
import useAutoCloseOnBreakpoint from "@/hooks/useAutoCloseOnBreakpoint";
import useIsDesktop from "@/hooks/useDesktop";
import { cn } from "@/lib/utils";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import useHeaderSearchQuery from "../hooks/useHeaderSearchQuery";

function PopularSearchesSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <Skeleton className="h-7 w-40" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="aspect-square w-full flex-1 rounded-sm"
            />
          );
        })}
      </div>
    </div>
  );
}

function PopularSearches({
  isError,
  isSuccess,
  popularSearchQuery,
}: {
  popularSearchQuery?: PopularSearch[];
  isSuccess: boolean;
  isError: boolean;
}) {
  const canBeDisplayed = isSuccess && !isError && popularSearchQuery;

  return (
    <div className="flex max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] flex-col gap-2 overflow-y-auto p-3">
      <h3 className="text-lg font-semibold">Popular Search</h3>
      {canBeDisplayed ? (
        <div className="grid w-full flex-none grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 lg:grid-cols-4">
          {popularSearchQuery.map(({ imageUrl, query }) => {
            return (
              <div
                className="flex w-full flex-col gap-2 [&>[data-slot=image-container]]:aspect-square [&>[data-slot=image-container]]:h-auto [&>[data-slot=image-container]]:w-full [&>[data-slot=image-container]]:flex-none"
                key={query}
              >
                <ImageWithSkeleton2
                  src={imageUrl}
                  alt={query}
                  fill
                  sizes="(min-width: 1024px) 120px, 100px"
                  className="rounded-sm object-cover"
                />
                <p className="line-clamp-2 text-center text-xs font-medium">
                  {query}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <StateComponent
          header="Couldn't load popular searches"
          message="Please try again later"
          variant="error"
          action={{
            label: "Try again",
          }}
        />
      )}
    </div>
  );
}

function SearchContentMobile({
  searchQuery,
}: {
  searchQuery: ReturnType<typeof useHeaderSearchQuery>;
}) {
  const { isSearching, searchItems, popularSearchQuery, ...props } =
    searchQuery;

  if (!isSearching) {
    if (popularSearchQuery.isPending || popularSearchQuery.isFetching) {
      return <PopularSearchesSkeleton />;
    }

    return (
      <PopularSearches
        isSuccess={popularSearchQuery.isSuccess}
        isError={popularSearchQuery.isError}
        popularSearchQuery={popularSearchQuery.data}
      />
    );
  }

  if (props.searchQuery.isPending) {
    return (
      <div className="items my-4 flex size-full justify-center">
        <Loader2
          className="size-10! animate-spin text-primary"
          strokeWidth={3}
        />
      </div>
    );
  }

  if (props.searchQuery.isError) {
    return (
      <StateComponent
        header="Couldn't search"
        message="Please try again later"
        variant="error"
        action={{
          label: "Try again",
        }}
      />
    );
  }

  return (
    <div className="flex flex-col p-1">
      {searchItems.map((item) => {
        return (
          <div key={item.value} className="flex flex-col">
            <h3 className="px-2 py-1.5 text-base text-muted-foreground">
              {item.value}
            </h3>
            <div>
              {item.items.map((item) => {
                return (
                  <ButtonPrimitive2
                    className="flex w-full items-center gap-3 rounded-md py-1.5 pr-8 pl-1.5 text-sm"
                    key={item.id}
                  >
                    <Search className="size-4 text-muted-foreground" />
                    {item.name}
                  </ButtonPrimitive2>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SearchMobile() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  useAutoCloseOnBreakpoint(open, setOpen, "desktop");
  const searchQuery = useHeaderSearchQuery({ open });

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          queryClient.removeQueries({ queryKey: ["search-query"] });
          searchQuery.setQuery("");
        }

        setOpen(open);
      }}
    >
      <DrawerTrigger asChild>
        <InputGroup className="h-9 p-1 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput placeholder="Search on GoodGoods" className="h-7" />
          <InputGroupAddon
            align="inline-end"
            className="p-0 has-[>button]:mr-0"
          >
            <InputGroupButton
              size="icon-sm"
              variant="default"
              className="size-7 rounded-full border-0"
            >
              <SearchIcon />
              <span className="sr-only">search</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </DrawerTrigger>
      <DrawerContent className="z-100 mt-0! h-dvh max-h-dvh!">
        <DrawerHeader className="flex flex-row gap-3">
          <DrawerTitle className="sr-only">Search</DrawerTitle>
          <DrawerDescription className="sr-only">
            Search drawer
          </DrawerDescription>
          <DrawerClose asChild>
            <ButtonPrimitive2>
              <IconArrowLeft className="size-9 text-muted-foreground" />
            </ButtonPrimitive2>
          </DrawerClose>

          <InputGroup className="h-9 p-1 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupInput
              value={searchQuery.query}
              onChange={(e) => searchQuery.setQuery(e.target.value)}
              placeholder="Search on GoodGoods"
              className="h-7"
            />
            <InputGroupAddon
              align="inline-end"
              className="p-0 has-[>button]:mr-0"
            >
              <InputGroupButton
                size="icon-sm"
                variant="default"
                className="size-7 rounded-full border-0"
              >
                <SearchIcon />
                <span className="sr-only">search</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </DrawerHeader>
        <SearchContentMobile searchQuery={searchQuery} />
      </DrawerContent>
    </Drawer>
  );
}

function SearchContentDesktop({
  searchHeaderQuery,
}: {
  searchHeaderQuery: ReturnType<typeof useHeaderSearchQuery>;
}) {
  const { isSearching, popularSearchQuery, query, searchQuery, searchItems } =
    searchHeaderQuery;
  const router = useRouter();

  if (!isSearching) {
    if (popularSearchQuery.isFetching || popularSearchQuery.isPending) {
      return <PopularSearchesSkeleton />;
    }

    return (
      <div className="flex max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] flex-col gap-2 overflow-y-auto p-3">
        <h3 className="text-lg font-semibold">Popular Search</h3>
        {popularSearchQuery.isSuccess ? (
          <div className="grid w-full flex-none grid-cols-4 gap-2">
            {popularSearchQuery.data.map(({ imageUrl, query }) => {
              return (
                <div
                  className="flex w-full flex-col gap-2 [&>[data-slot=image-container]]:aspect-square [&>[data-slot=image-container]]:h-auto [&>[data-slot=image-container]]:w-full [&>[data-slot=image-container]]:flex-none"
                  key={query}
                >
                  <ImageWithSkeleton2
                    src={imageUrl}
                    alt={query}
                    fill
                    sizes="(min-width: 1024px) 120px, 100px"
                    className="rounded-sm object-cover"
                  />
                  <p className="line-clamp-2 text-center text-xs font-medium">
                    {query}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <StateComponent
            header="Couldn't load popular searches"
            message="Please try again later"
            variant="error"
            action={{
              label: "Try again",
            }}
          />
        )}
      </div>
    );
  } else {
    if (searchQuery.isPending) {
      return (
        <div className="my-4 flex w-full justify-center">
          <Loader2
            className="size-10! animate-spin text-primary"
            strokeWidth={3}
          />
        </div>
      );
    }

    if (searchQuery.isError) {
      return (
        <StateComponent
          header="Couldn't search"
          message="Please try again later"
          variant="error"
          action={{
            label: "Try again",
          }}
        />
      );
    }

    return (
      <ComboboxList>
        {(group: (typeof searchItems)[number]) => {
          return (
            <ComboboxGroup
              key={group.value}
              items={group.items}
              className="flex flex-col"
            >
              <ComboboxLabel className="text-base">{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: (typeof searchItems)[number]["items"][number]) => (
                  <ComboboxItem
                    key={item.id}
                    value={item}
                    className="gap-3 py-1.5"
                    onClick={(e) => {
                      e.preventBaseUIHandler();
                      router.push(`/search?q=${encodeURIComponent(query)}`);
                    }}
                  >
                    <Search className="size-4 text-muted-foreground" />
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          );
        }}
      </ComboboxList>
    );
  }
}

function SearchDesktop() {
  const [open, setOpen] = React.useState(false);
  useAutoCloseOnBreakpoint(open, setOpen, "mobile");
  const queryClient = useQueryClient();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const searchHeaderQuery = useHeaderSearchQuery({ open });

  return (
    <>
      {open && <div className="fixed inset-0 top-34 z-10 bg-black/10" />}
      <div className="relative isolate z-50 me-9 w-full" ref={parentRef}>
        <Combobox
          open={open}
          inputValue={searchHeaderQuery.query}
          onInputValueChange={(query) => searchHeaderQuery.setQuery(query)}
          filter={null}
          onOpenChange={(open) => {
            if (!open) {
              queryClient.removeQueries({
                queryKey: ["search-query"],
              });
            }
            setOpen(open);
          }}
          items={searchHeaderQuery.searchItems}
        >
          <InputGroup
            className={cn(
              "relative me-9 h-10 w-full gap-1 border-[1px] p-1",
              open && "rounded-b-none border-b-popover"
            )}
          >
            <ComboboxPrimitive.Input
              render={
                <InputGroupInput
                  placeholder="Search on GoodGoods"
                  className="relative isolate z-100 h-full border-0 py-0 ps-1 pe-0!"
                />
              }
            />
            <InputGroupAddon
              align="inline-end"
              className="p-0 has-[>button]:mr-0"
            >
              <InputGroupButton
                size="icon-xs"
                variant="default"
                asChild
                data-slot="input-group-button"
                className="size-8 rounded-full border-0 group-has-data-[slot=combobox-clear]/input-group:hidden"
              >
                <ComboboxTrigger>
                  <Search />
                </ComboboxTrigger>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <ComboboxContent
            container={parentRef}
            align="start"
            side="bottom"
            sideOffset={0}
            alignOffset={-1}
            positionerClassName="z-50 transform-none! inset-x-0 top-10!" // Memaksa lebar presisi selebar InputGroup + border
            className={cn(
              "w-full max-w-none! rounded-t-none border border-input bg-popover shadow-none ring-0 outline-none",
              open && "border-t-transparent"
            )}
          >
            {<SearchContentDesktop searchHeaderQuery={searchHeaderQuery} />}
          </ComboboxContent>
        </Combobox>
      </div>
    </>
  );
}

export default function HeaderSearch({
  isDesktopDevice,
}: {
  isDesktopDevice: boolean;
}) {
  const isDesktop = useIsDesktop({ defaultValue: isDesktopDevice });

  return isDesktop ? <SearchDesktop /> : <SearchMobile />;
}
