import ButtonPrimitive from "@/components/ui/ButtonPrimitive";
import {
  ClockCheck,
  LucideBanknote,
  LucideRotateCcw,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_FEATURES = [
  {
    Icon: ShieldCheck,
    label: "100% Original",
    description:
      "Every product is guaranteed authentic and sourced from trusted sellers.",
  },
  {
    Icon: LucideRotateCcw,
    label: "Easy Returns Guaranteed",
    description:
      "Not satisfied? Return eligible items quickly with our hassle-free return process.",
  },
  {
    Icon: LucideBanknote,
    label: "Cash On Delivery",
    description:
      "Pay only when your order arrives with secure cash on delivery.",
  },
  {
    Icon: ClockCheck,
    label: "Delivery On Time Guaranteed",
    description:
      "We work with reliable logistics partners to deliver your order on schedule.",
  },
  {
    Icon: ShieldBan,
    label: "Protection Guaranteed",
    description:
      "Your purchases are protected from checkout until your order is safely delivered.",
  },
];

function ShoppingGuaranteeMarquee({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex shrink-0 gap-4 px-2", className)} {...props}>
      {TRUST_FEATURES.map(({ label, Icon }, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-1 text-xs lg:text-sm"
          >
            <Icon className="size-4 text-primary lg:size-6" /> {label}
          </div>
        );
      })}
    </div>
  );
}

export default function ShoppingGuaranteeModal() {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <ButtonPrimitive className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap md:w-full md:animate-none md:justify-center">
            <ShoppingGuaranteeMarquee className="md:shrink md:flex-wrap md:justify-center" />
            <ShoppingGuaranteeMarquee className="md:hidden" />
          </div>
        </ButtonPrimitive>
      </CredenzaTrigger>
      <CredenzaContent className="gap-4 lg:gap-4">
        <CredenzaHeader className="border-b border-border lg:border-0">
          <CredenzaTitle>Shop without worry with GoodGoods</CredenzaTitle>
          <CredenzaDescription className="sr-only">
            Learn how GoodGoods protects your purchases, handles returns, and
            keeps your payments secure.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-4">
          {TRUST_FEATURES.map(({ Icon, description, label }, index) => {
            return (
              <section className="flex items-center gap-4" key={index}>
                <Icon className="size-7 flex-none text-primary" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium">{label}</h3>
                  <p className="text-xs font-normal text-muted-foreground">
                    {description}
                  </p>
                </div>
              </section>
            );
          })}
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button className="h-12 w-full">Continue Shopping</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
