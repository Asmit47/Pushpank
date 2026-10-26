"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";

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
  return (
    <Button
      size="sm"
      variant="secondary"
      className="relative z-10 w-full"
      aria-label={`Add ${productName} to cart`}
      onClick={() => {
        add(productId, variantId, 1);
        openDrawer();
      }}
    >
      <ShoppingBag className="size-4" aria-hidden />
      Add to cart
    </Button>
  );
}
