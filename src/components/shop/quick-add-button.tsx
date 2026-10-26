"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { PetalBurst } from "./petal-burst";

export function QuickAddButton({
  productId,
  variantId,
  productName,
}: {
  productId: string;
  variantId: string;
  productName: string;
}) {
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);
  const [burst, setBurst] = useState(false);
  return (
    <Button
      size="sm"
      variant="secondary"
      className="relative z-10 w-full overflow-visible"
      aria-label={`Add ${productName} to cart`}
      onClick={() => {
        add(productId, variantId, 1);
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
