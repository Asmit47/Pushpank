import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <Container className="py-20">
      <EmptyState
        icon={<Compass className="size-10" aria-hidden />}
        title="We could not find that page"
        description="The link may be old, or the product or collection may no longer be available."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/shop">Browse all products</Button>
            <Button href="/puja-services" variant="secondary">
              Book a puja
            </Button>
          </div>
        }
      />
    </Container>
  );
}
