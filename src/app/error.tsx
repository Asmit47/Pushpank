"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20">
      <EmptyState
        icon={<TriangleAlert className="size-10" aria-hidden />}
        title="Something went wrong"
        description="We could not load this page. Please try again, or contact us if it keeps happening."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => retry()}>Try again</Button>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        }
      />
    </Container>
  );
}
