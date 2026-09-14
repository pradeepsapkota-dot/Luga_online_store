// components/layout/Footer.tsx
import Link from "next/link";
import { mallInfo } from "@/data/mall";
import NewsletterForm from "@/components/forms/NewsletterForm";

const footerNav = [
    { label: "Stores", href: "/stores" },
    { label: "Dining", href: "/dining" },
    { label: "Offers", href: "/offers" },
    { label: "Events", href: "/events" },
    { label: "Visit Luga", href: "/visit" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="bg-charcoal text-ivory mt-16">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <p className="font-display text-xl mb-3">{mallInfo.name}</p>
                    <p className="text-sm text-ivory/70">
                        {mallInfo.address.street}<br />
                        {mallInfo.address.city}, {mallInfo.address.postalCode}
                    </p>
                    <p className="text-sm text-ivory/70 mt-3">
                        {mallInfo.contact.phone}<br />
                        {mallInfo.contact.email}
                    </p>
                </div>

                <div>
                    <p className="text-sm font-medium mb-3 text-ivory/90">Explore</p>
                    <ul className="space-y-2">
                        {footerNav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-sm text-ivory/70 hover:text-terracotta">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="text-sm font-medium mb-3 text-ivory/90">Visit</p>
                    <ul className="space-y-2 text-sm text-ivory/70">
                        <li><Link href="/visit#hours" className="hover:text-terracotta">Opening hours</Link></li>
                        <li><Link href="/visit#directions" className="hover:text-terracotta">Directions</Link></li>
                        <li><Link href="/visit#parking" className="hover:text-terracotta">Parking</Link></li>
                        <li><Link href="/visit#accessibility" className="hover:text-terracotta">Accessibility</Link></li>
                    </ul>
                    <div className="flex gap-3 mt-4">
                        <a href="#" aria-label="Luga on Instagram" className="text-ivory/70 hover:text-terracotta">Instagram</a>
                        <a href="#" aria-label="Luga on Facebook" className="text-ivory/70 hover:text-terracotta">Facebook</a>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium mb-3 text-ivory/90">Stay in the loop</p>
                    <NewsletterForm variant="footer" />
                </div>
            </div>

            <div className="border-t border-ivory/10 px-6 py-4 flex flex-col md:flex-row justify-between gap-2 text-xs text-ivory/50 max-w-6xl mx-auto">
                <p>© {new Date().getFullYear()} {mallInfo.name}. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="/privacy" className="hover:text-ivory/80">Privacy</Link>
                    <Link href="/terms" className="hover:text-ivory/80">Terms</Link>
                </div>
            </div>
        </footer>
    );
}