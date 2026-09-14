import type { Metadata } from "next";
import Link from "next/link";
import { mallInfo } from "@/data/mall";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Luga customer service.",
};

export default function ContactPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Contact</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-medium mb-3">General contact</h2>
          <p className="text-sm text-charcoal/70 mb-1">
            {mallInfo.contact.phone}
          </p>
          <p className="text-sm text-charcoal/70 mb-6">
            {mallInfo.contact.email}
          </p>

          <h2 className="font-medium mb-3">Customer service</h2>
          <p className="text-sm text-charcoal/70 mb-1">
            {mallInfo.customerService.location}
          </p>
          <p className="text-sm text-charcoal/70 mb-6">
            {mallInfo.customerService.hours}
          </p>

          <Link
            href="/visit"
            className="text-terracotta font-medium hover:underline text-sm"
          >
            View full visit information
          </Link>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
