import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

// import user1 from "../../../assets/profile-pictures/user1.jpg";
// import user2 from "../../../assets/profile-pictures/user2.jpg";
// import user3 from "../../../assets/profile-pictures/user3.jpg";
// import user4 from "../../../assets/profile-pictures/user4.jpg";
// import user5 from "../../../assets/profile-pictures/user5.jpg";
// import user6 from "../../../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Clinics", href: "/all/clinics" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    // image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    // image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    // image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    // image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    // image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    // image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Effortless Patient Management",
    description:
      "Say goodbye to the hassle of clinic appointments and outdated offline ads. Manage patient records with ease.",
  },
  {
    icon: <Fingerprint />,
    text: "Streamlined Appointments",
    description:
      "Schedule and manage appointments seamlessly with our cutting-edge digital platform.",
  },
  {
    icon: <ShieldHalf />,
    text: "Advanced Security",
    description:
      "Ensure the confidentiality of patient information with top-tier security features.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Updates",
    description:
      "Keep track of patient interactions and appointment statuses with real-time updates.",
  },
  {
    icon: <PlugZap />,
    text: "Instant Data Access",
    description:
      "Access and share patient data instantly, reducing wait times and improving service delivery.",
  },
  {
    icon: <GlobeLock />,
    text: "Comprehensive Analytics",
    description:
      "Gain valuable insights into patient care and clinic performance with our analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Efficient Patient Record Management",
    description:
      "Manage and access patient records digitally to streamline clinic operations.",
  },
  {
    title: "Seamless Appointment Scheduling",
    description:
      "Schedule, modify, and manage patient appointments with ease.",
  },
  {
    title: "Enhanced Security Features",
    description:
      "Protect sensitive patient data with advanced security protocols.",
  },
  {
    title: "Instant Data Sharing",
    description:
      "Share patient information quickly to improve communication and care.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Basic record management",
      "Appointment scheduling",
      "Standard analytics",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Advanced record management",
      "Priority support",
      "Enhanced analytics",
      "Additional security features",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Full record management suite",
      "Dedicated support",
      "Custom analytics solutions",
      "Advanced security and compliance",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
