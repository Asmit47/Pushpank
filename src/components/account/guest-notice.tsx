import { Button } from "@/components/ui/button";
import { ContentPage } from "@/components/ui/content-page";

export function GuestNotice({ title, what }: { title: string; what: string }) {
  return (
    <ContentPage title={title} intro={`Accounts are not part of this first version. You can ${what} as a guest.`}>
      <div className="rounded-2xl border border-line bg-sanctum p-6">
        <h2>Looking for an order or booking?</h2>
        <p className="mt-1 text-sm">
          Use your reference number and the phone number you gave us to see the latest status.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/track">Track an order or booking</Button>
          <Button href="/shop" variant="secondary">
            Continue shopping
          </Button>
        </div>
      </div>
    </ContentPage>
  );
}
