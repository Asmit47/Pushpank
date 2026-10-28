import { Container } from "@/components/ui/container";

/** Skeleton shown while the shop listing streams in on cross-route navigation. */
export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="border-b border-line/70 bg-sanctum/50">
        <Container className="py-4 lg:py-5">
          <div className="h-3 w-40 animate-pulse rounded bg-line" />
          <div className="mt-3 h-7 w-56 animate-pulse rounded bg-line" />
          <div className="mt-2 h-4 w-28 animate-pulse rounded bg-line" />
        </Container>
      </div>
      <Container className="py-4 lg:py-5">
        <div className="h-10 w-full max-w-sm animate-pulse rounded-xl bg-line" />
        <div className="mt-4 h-14 animate-pulse rounded-xl bg-line" />
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i} className="h-80 animate-pulse rounded-card bg-line" aria-hidden />
          ))}
        </ul>
      </Container>
    </div>
  );
}
