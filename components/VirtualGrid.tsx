"use client";

import { cn } from "@/lib/utils";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React from "react";

type VirtualGridProps<T> = {
  items: T[];
  render: ({ data, index }: { data: T; index: number }) => React.ReactNode;
  minColumnWidth?: number;
  gap?: number;
  estimatedRowHeight: number;
  overscan?: number;
} & React.ComponentProps<"div">;

export default function VirtualGrid<T>({
  render,
  items,
  estimatedRowHeight,
  gap = 16,
  minColumnWidth = 160,
  overscan,
  className,

  ...props
}: VirtualGridProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [column, setColumn] = React.useState(1);
  const parentOffsetRef = React.useRef(0);
  const [scrollMargin, setScrollMargin] = React.useState(0);
  const [isVirtualized, setIsVirtualized] = React.useState(false);
  const itemsCount = items.length;

  React.useLayoutEffect(() => {
    if (!parentRef.current) return;

    const updateColumn = (width: number) => {
      const calculatedColumns = Math.floor(
        (width + gap) / (minColumnWidth + gap)
      );

      setColumn(Math.max(1, calculatedColumns));
    };

    updateColumn(parentRef.current.clientWidth);

    // setScrollMargin(parentRef.current.offsetTop);
    parentOffsetRef.current = parentRef.current.offsetTop;

    setIsVirtualized(true);

    const observer = new ResizeObserver(([entry]) => {
      updateColumn(entry.contentRect.width);
    });

    observer.observe(parentRef.current);

    return () => observer.disconnect();
  }, []);

  const rowCount = Math.ceil(itemsCount / column);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => estimatedRowHeight,
    scrollMargin: parentOffsetRef.current,
    overscan,
    gap: gap,
    useFlushSync: false,
  });

  React.useEffect(() => {
    rowVirtualizer.shouldAdjustScrollPositionOnItemSizeChange = () => false;
  }, [rowVirtualizer]);

  return (
    <div
      {...props}
      ref={parentRef}
      className={cn("w-full [overflow-anchor:none]", className)}
    >
      {!isVirtualized ? (
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {render({ data: item, index })}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div
          className="relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * column;
            const endIndex = Math.min(startIndex + column, itemsCount);
            const rowItems = items.slice(startIndex, endIndex);
            const startPos =
              virtualRow.start - rowVirtualizer.options.scrollMargin;

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                // ref={rowVirtualizer.measureElement}
                style={{
                  transform: `translateY(${startPos}px)`,
                  gridTemplateColumns: `repeat(${column}, minmax(${minColumnWidth}px, 1fr))`,
                  gap: `${gap}px`,
                }}
                className="absolute top-0 left-0 grid w-full last:pb-0!"
              >
                {rowItems.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {render({
                        data: item,
                        index: startIndex + index,
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
