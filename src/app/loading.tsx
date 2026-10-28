import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-12" aria-busy="true">
      <div role="status" aria-label="Loading" className="space-y-6">
        <div className="h-10 w-2/3 max-w-md animate-flicker rounded-lg bg-gold/15" />
        <div className="h-4 w-1/2 max-w-sm animate-flicker rounded bg-parchment/10" />
        <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-flicker rounded-card bg-sanctum"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
