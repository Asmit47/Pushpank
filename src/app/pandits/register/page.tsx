import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RegisterForm } from "@/components/pandits/register-form";

export const metadata: Metadata = {
  title: "Join as a pandit",
  description: "Register to conduct home pujas with Pushpank in Lucknow.",
};

const steps = [
  "We read your application and call the number you gave.",
  "If the details match, the status moves to under review.",
  "Approved pandits are added to the directory by the Pushpank team.",
];

export default function RegisterPage() {
  return (
    <Container className="grid gap-10 py-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p lang="hi" className="mantra text-gold">पंडित</p>
        <h1 className="mt-2 text-4xl leading-[1.1] text-gold-soft sm:text-5xl">Join as a pandit</h1>
        <p className="mt-4 text-parchment/80">
          Tell us the rituals you perform, the languages you speak, and where in Lucknow you can travel.
        </p>
        <ol className="mt-6 space-y-3 text-sm text-parchment/80">
          {steps.map((s) => (
            <li key={s} className="rounded-card border border-line bg-sanctum p-4">{s}</li>
          ))}
        </ol>
      </div>
      <RegisterForm />
    </Container>
  );
}
