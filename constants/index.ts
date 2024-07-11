import { ContactInfo, SocialIcon } from "@/components/TempHeader";
import { callsvg, clocksvg, emailsvg, facebooksvg, facebookwhitesvg, instagramwhitesvg, linkedinsvg, whatsappsvg, whatsappwhitesvg } from "@/public";

export const address =
  "307, Fortune Aura, Above Nexa Showroom, Near Apple Hospital, Bhawarkua, Indore, India 452001";

export const contactInfo: ContactInfo[] = [
  {
    icon: clocksvg,
    title: "Office Time:",
    content: "Monday to Friday 10:00am - 7:00pm",
  },
  { icon: callsvg, title: "Call Us:", content: "+917509530000" },
  { icon: emailsvg, title: "Email:", content: "info@starmarketing.co.in" },
];

export const socialIcons: SocialIcon[] = [
  {
    id: "facebook",
    title: "Facebook",
    icon: facebookwhitesvg,
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    icon: whatsappwhitesvg,
  },
  {
    id: "instagram",
    title: "LinkedIn",
    icon: instagramwhitesvg,
  },
];
