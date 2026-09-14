import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Luga, its community role, and what it offers.",
};

export default function AboutPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">About Luga</h1>

      <div className="space-y-8 text-charcoal/80">
        <section>
          <h2 className="font-display text-2xl mb-3 text-charcoal">
            What Luga is
          </h2>
          <p>
            Luga is a shopping mall bringing together stores, restaurants, and
            services in one place. We're built for the everyday visit — a coffee
            before work, a weekend outfit, a quick repair, a family afternoon
            out.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-3 text-charcoal">
            Our role in the community
          </h2>
          <p>
            Beyond shopping, Luga hosts local markets, seasonal events, and
            community gatherings throughout the year. We work with independent
            businesses alongside larger retailers to keep the mix varied and
            useful to the people who visit us regularly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-3 text-charcoal">
            Shopping, dining, and social space
          </h2>
          <p>
            With stores spanning fashion, electronics, home goods, and more,
            alongside a dining selection from quick bites to sit-down meals,
            Luga is designed to be a place people spend time in, not just pass
            through. Our seating areas, family services, and event spaces
            support longer visits, not just fast transactions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-3 text-charcoal">
            How we operate
          </h2>
          <p>
            We aim to keep practical information — hours, parking, accessibility
            — easy to find, because we know most visits start with a quick check
            before anyone leaves home. Our customer service desk and
            accessibility services are available during all opening hours to
            help with anything else.
          </p>
        </section>
      </div>
    </div>
  );
}
