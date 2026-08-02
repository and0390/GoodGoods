type productDescriptionProps = {
  description: string;
};

export default function ProductDescription({
  description,
}: productDescriptionProps) {
  return (
    <div className="relative flex flex-col bg-card p-3 md:p-8">
      <h2 className="mb-3 text-sm font-bold text-card-foreground md:mb-7 md:text-lg">
        Description
      </h2>
      <p className="overflow-y-hidden text-sm font-normal text-muted-foreground transition-all duration-150">
        {description}
      </p>
    </div>
  );
}
