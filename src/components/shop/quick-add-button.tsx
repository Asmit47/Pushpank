"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart-store";
import { PetalBurst } from "./petal-burst";

export function QuickAddButton({
  productId,
  variantId,
  productName,
  quantity = 1,
  className,
}: {
  productId: string;
  variantId: string;
  productName: string;
  quantity?: number;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);
  const [burst, setBurst] = useState(false);
  return (
    <Button
      size="sm"
      variant="secondary"
      className={cn("relative z-10 overflow-visible", className)}
      aria-label={`Add ${productName} to cart`}
      onClick={() => {
        add(productId, variantId, quantity);
        setBurst(true);
        window.setTimeout(() => setBurst(false), 700);
        openDrawer();
      }}
    >
      <PetalBurst show={burst} />
      <ShoppingBag className="size-4" strokeWidth={1.5} aria-hidden />
      Add to cart
    </Button>
  );
}
