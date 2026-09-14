"use client";

import { useState, FormEvent } from "react";

type Props = {
    variant?: "footer" | "section";
};

export default function NewsletterForm({ variant = "section" }: Props) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email.trim()) {
            setStatus("error");
            setErrorMsg("Enter your email address.");
            return;
        }
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) {
            setStatus("error");
            setErrorMsg("Enter a valid email address.");
            return;
        }
        // Integration point: connect to a real email service (e.g. Mailchimp, Resend) here.
        setStatus("success");
        setErrorMsg("");
    }

    const isFooter = variant === "footer";

    if (status === "success") {
        return (
            <p className={`text-sm ${isFooter ? "text-ivory/80" : "text-charcoal/80"}`}>
                You're subscribed. Watch for offers and events in your inbox.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
            <label
                htmlFor="newsletter-email"
                className={`text-sm ${isFooter ? "text-ivory/70" : "text-charcoal/70"}`}
            >
                Get offers and event updates. No spam.
            </label>
            <div className="flex gap-2">
                <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                    className={`flex-1 min-w-0 px-3 py-2 rounded-md text-sm border ${isFooter
                        ? "bg-transparent border-ivory/30 text-ivory placeholder:text-ivory/40"
                        : "bg-white border-gray-soft text-charcoal placeholder:text-charcoal/40"
                        }`}
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-terracotta text-white hover:bg-[#c14f2e] transition-colors whitespace-nowrap"
                >
                    Subscribe
                </button>
            </div>
            {status === "error" && (
                <p id="newsletter-error" role="alert" className="text-sm text-terracotta">
                    {errorMsg}
                </p>
            )}
        </form>
    );
}