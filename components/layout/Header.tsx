// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { mallInfo, getTodayHours } from "@/data/mall";

const navLinks = [
    { href: "/stores", label: "Stores" },
    { href: "/dining", label: "Dining" },
    { href: "/offers", label: "Offers" },
    { href: "/events", label: "Events" },
    { href: "/visit", label: "Visit Luga" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const today = getTodayHours();

    return (
        <header className="sticky top-0 z-50 bg-[#F7F3EC]/95 backdrop-blur border-b border-[#E9E5DE]">
            {/* Utility bar: quick access info */}
            <div className="hidden md:flex justify-end gap-4 px-6 py-1.5 text-xs text-[#171717]/70 border-b border-[#E9E5DE]">
                <span>Today: {today.open}–{today.close}</span>
                <Link href="/visit#directions" className="hover:text-[#D95D39]">Directions</Link>
                <Link href="/visit#parking" className="hover:text-[#D95D39]">Parking</Link>
                <Link href="/visit#accessibility" className="hover:text-[#D95D39]">Accessibility</Link>
            </div>

            <div className="flex items-center justify-between px-6 py-3">
                <Link href="/" className="font-display text-2xl font-semibold text-[#171717]">
                    {mallInfo.name}
                </Link>

                <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[#171717] hover:text-[#D95D39] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/search"
                        aria-label="Search"
                        className="p-2 rounded-full hover:bg-[#E9E5DE] transition-colors"
                    >
                        <SearchIcon />
                    </Link>
                    <Link
                        href="/visit"
                        className="bg-[#D95D39] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#c14f2e] transition-colors"
                    >
                        Plan Your Visit
                    </Link>
                </div>

                <button
                    className="md:hidden p-2"
                    aria-label="Open menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(true)}
                >
                    <MenuIcon />
                </button>
            </div>

            {mobileOpen && (
                <MobileMenuOverlay onClose={() => setMobileOpen(false)} today={today} />
            )}
        </header>
    );
}

function MobileMenuOverlay({
    onClose,
    today,
}: {
    onClose: () => void;
    today: { open: string; close: string };
}) {
    return (
        <div className="fixed inset-0 z-50 bg-[#171717]/40 md:hidden" role="dialog" aria-modal="true">
            <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#F7F3EC] shadow-xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-xl font-semibold">Menu</span>
                    <button onClick={onClose} aria-label="Close menu" className="p-2">
                        <CloseIcon />
                    </button>
                </div>

                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="py-3 text-lg font-medium border-b border-[#E9E5DE] min-h-[44px] flex items-center"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-[#E9E5DE] text-sm space-y-2 text-[#171717]/80">
                    <p>Today: {today.open}–{today.close}</p>
                    <Link href="/visit#directions" onClick={onClose} className="block hover:text-[#D95D39]">Directions</Link>
                    <Link href="/visit#parking" onClick={onClose} className="block hover:text-[#D95D39]">Parking</Link>
                    <Link href="/visit#accessibility" onClick={onClose} className="block hover:text-[#D95D39]">Accessibility</Link>
                </div>

                <Link
                    href="/visit"
                    onClick={onClose}
                    className="mt-6 bg-[#D95D39] text-white text-center font-medium px-4 py-3 rounded-full"
                >
                    Plan Your Visit
                </Link>
            </div>
        </div>
    );
}

function SearchIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
        </svg>
    );
}
function MenuIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
    );
}
function CloseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}