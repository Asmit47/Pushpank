import type { Service } from "@/types";

/**
 * PLACEHOLDER SERVICES: rituals, packages, inclusions and indicative prices must
 * be confirmed by Pushpank. Booking is manual-confirmation (Option A in the blueprint).
 */
export const services: Service[] = [
  {
    slug: "griha-pravesh",
    name: "Griha Pravesh",
    tagline: "Housewarming puja for your new home.",
    description:
      "A traditional Griha Pravesh puja performed by a pandit, with the arrangements needed for a calm, well-organised ceremony.",
    image: { src: "/images/placeholder/s-griha-pravesh.jpg", alt: "Kalash, marigold toran and rangoli at a doorway" },
    duration: "About 2 to 3 hours (to be confirmed)",
    inclusions: ["Pandit for the ritual", "Guidance on the sequence of the puja", "Samagri list (or samagri kit if selected)"],
    exclusions: ["Fresh fruit and sweets for prasad (unless added)", "Food for guests", "Havan kund (unless selected)"],
    customerProvides: ["A clean, accessible space for the puja", "Water, a small table or chowki", "Family members present at the muhurat"],
    coverage: "Lucknow and nearby areas. Availability is confirmed after your request.",
    packages: [
      {
        id: "gp-basic",
        name: "Pandit only",
        description: "A pandit to conduct the ritual. You arrange samagri.",
        indicativePrice: 2100,
        includes: ["Pandit", "Samagri list"],
      },
      {
        id: "gp-complete",
        name: "Pandit with samagri",
        description: "Pandit plus a samagri kit delivered before the puja.",
        indicativePrice: 3500,
        includes: ["Pandit", "Samagri kit", "Flower garlands for the entrance"],
      },
    ],
    cancellationPolicy:
      "Policy to be confirmed. You can ask for a reschedule or cancellation at any time through your booking page or by contacting support.",
    faqs: [
      { question: "Can you suggest an auspicious date?", answer: "Our team can share options once you submit a request; the final muhurat is decided with the pandit." },
      { question: "Is my booking confirmed immediately?", answer: "No. A request is confirmed only after our team checks pandit availability and contacts you." },
    ],
  },
  {
    slug: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    tagline: "A traditional katha and puja at home.",
    description:
      "A pandit-led Satyanarayan Katha with puja, aarti and prasad guidance for family gatherings and auspicious occasions.",
    image: { src: "/images/placeholder/s-satyanarayan.jpg", alt: "Satyanarayan puja setup with fruit and brass lamps" },
    duration: "About 2 hours (to be confirmed)",
    inclusions: ["Pandit for the katha and puja", "Aarti", "Samagri list (or samagri kit if selected)"],
    exclusions: ["Prasad ingredients (unless added)", "Seating for guests"],
    customerProvides: ["A chowki or raised platform", "Banana leaves and fresh fruit (or add them)", "A quiet space for around 2 hours"],
    coverage: "Lucknow and nearby areas. Availability is confirmed after your request.",
    packages: [
      {
        id: "sk-basic",
        name: "Pandit only",
        description: "A pandit to conduct the katha. You arrange samagri.",
        indicativePrice: 1800,
        includes: ["Pandit", "Samagri list"],
      },
      {
        id: "sk-complete",
        name: "Pandit with puja kit",
        description: "Pandit plus our Satyanarayan Puja Kit and fresh flowers.",
        indicativePrice: 3200,
        includes: ["Pandit", "Satyanarayan Puja Kit", "Fresh flowers and garland"],
      },
    ],
    cancellationPolicy:
      "Policy to be confirmed. You can ask for a reschedule or cancellation through your booking page or by contacting support.",
    faqs: [
      { question: "Do I need to arrange prasad?", answer: "You can arrange it yourself or ask our team what can be added to your booking." },
      { question: "What if I need to move the date?", answer: "Request a reschedule from your booking page. The change is confirmed once the pandit is available." },
    ],
  },
  {
    slug: "havan",
    name: "Havan",
    tagline: "Havan with the right samagri and setup.",
    description:
      "A pandit-led havan for new beginnings, festivals and special occasions, with kund setup available as an add-on.",
    image: { src: "/images/placeholder/s-havan.jpg", alt: "Copper havan kund with samidha and samagri" },
    duration: "About 1.5 to 2 hours (to be confirmed)",
    inclusions: ["Pandit for the havan", "Mantra guidance", "Samagri list (or havan samagri kit if selected)"],
    exclusions: ["Havan kund (unless selected)", "Fire-safety arrangements at the venue", "Food for guests"],
    customerProvides: ["A safe, ventilated space", "Permission from the building or society if required", "Water for safety"],
    coverage: "Lucknow and nearby areas. Availability is confirmed after your request.",
    packages: [
      {
        id: "hv-basic",
        name: "Pandit only",
        description: "A pandit to conduct the havan. You arrange samagri and kund.",
        indicativePrice: 2100,
        includes: ["Pandit", "Samagri list"],
      },
      {
        id: "hv-complete",
        name: "Pandit with havan kit and kund",
        description: "Pandit with our Havan Samagri Kit and a havan kund.",
        indicativePrice: 3800,
        includes: ["Pandit", "Havan Samagri Kit", "Havan kund"],
      },
    ],
    cancellationPolicy:
      "Policy to be confirmed. You can ask for a reschedule or cancellation through your booking page or by contacting support.",
    faqs: [
      { question: "Can a havan be done in an apartment?", answer: "Often yes, with a small kund and good ventilation. Check your society rules and tell us in your request." },
    ],
  },
];
