export default function DiscountBadge({ value }: { value: number }) {
  return (
    <div className="absolute top-0 right-0 isolate overflow-hidden rounded-tr-sm rounded-bl-sm md:top-2 md:right-auto md:-left-1.5 md:rounded-tl-sm">
      <div
        style={{
          background: "#f94d63",
        }}
        className="px-1 py-1 text-xs font-semibold text-white md:rounded-r-full md:px-2"
      >
        {Math.ceil(value)}%
      </div>
      <div className="hidden size-1.5 rounded-bl-full bg-[#b31d40] md:block" />
    </div>
  );
}
