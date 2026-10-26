import type { Pandit } from "@/types";

/**
 * PLACEHOLDER PROFILES. These are sample pandits for the directory layout.
 * Replace with verified people, photographs and areas before launch.
 */
export const pandits: Pandit[] = [
  {
    slug: "pt-raghunath-shukla",
    name: "Pt. Raghunath Shukla",
    title: "Vedic priest",
    image: { src: "/images/generated/pandit-1.jpg", alt: "Placeholder portrait of Pt. Raghunath Shukla" },
    years: 22,
    languages: ["Hindi", "Sanskrit", "Awadhi"],
    areas: ["Gomti Nagar", "Hazratganj"],
    specialities: ["satyanarayan-katha", "griha-pravesh"],
    bio: "Conducts home kathas and griha pravesh with a calm, unhurried pace. Families in Gomti Nagar book him for evening muhurats.",
    placeholder: true,
  },
  {
    slug: "pt-vijay-tripathi",
    name: "Pt. Vijay Tripathi",
    title: "Havan specialist",
    image: { src: "/images/placeholder/s-havan.jpg", alt: "Placeholder portrait of Pt. Vijay Tripathi" },
    years: 18,
    languages: ["Hindi", "Sanskrit"],
    areas: ["Aliganj", "Indira Nagar"],
    specialities: ["havan", "griha-pravesh"],
    bio: "Leads small and medium home havans, and explains each offering so the family can follow without a printed script.",
    placeholder: true,
  },
  {
    slug: "pt-sushil-mishra",
    name: "Pt. Sushil Mishra",
    title: "Griha pravesh priest",
    image: { src: "/images/placeholder/s-griha-pravesh.jpg", alt: "Placeholder portrait of Pt. Sushil Mishra" },
    years: 15,
    languages: ["Hindi", "English"],
    areas: ["Jankipuram", "Alambagh"],
    specialities: ["griha-pravesh", "satyanarayan-katha"],
    bio: "Often requested by families who want the ritual in Hindi with short English explanations for guests.",
    placeholder: true,
  },
  {
    slug: "pt-devendra-pandey",
    name: "Pt. Devendra Pandey",
    title: "Festival priest",
    image: { src: "/images/placeholder/cat-festival.jpg", alt: "Placeholder portrait of Pt. Devendra Pandey" },
    years: 27,
    languages: ["Hindi", "Sanskrit"],
    areas: ["Chowk", "Aminabad"],
    specialities: ["satyanarayan-katha", "havan"],
    bio: "A festival-season priest for Satyanarayan katha and Lakshmi puja. He prefers morning muhurats.",
    placeholder: true,
  },
  {
    slug: "pt-anand-tiwari",
    name: "Pt. Anand Tiwari",
    title: "Home puja priest",
    image: { src: "/images/placeholder/p-puja-thali.jpg", alt: "Placeholder portrait of Pt. Anand Tiwari" },
    years: 11,
    languages: ["Hindi", "Awadhi"],
    areas: ["Rajajipuram", "Talkatora"],
    specialities: ["havan", "satyanarayan-katha"],
    bio: "Brings his own samagri when asked, and keeps the setup compact for apartments.",
    placeholder: true,
  },
];

export function getPandit(slug: string) {
  return pandits.find((p) => p.slug === slug);
}
