"use client";

import { useState, FormEvent } from "react";

const departments = [
  "General inquiry",
  "Customer service",
  "Leasing",
  "Events",
  "Lost & found",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!message.trim()) next.message = "Enter a message.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Integration point: send to a real backend or email service here.
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gray-soft rounded-card p-6 text-center">
        <p className="font-display text-xl mb-2">Message sent</p>
        <p className="text-charcoal/70 text-sm">
          Thanks for reaching out. We'll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium mb-1"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="w-full px-3 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
        {errors.name && (
          <p
            id="contact-name-error"
            role="alert"
            className="text-sm text-terracotta mt-1"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium mb-1"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="w-full px-3 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
        {errors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="text-sm text-terracotta mt-1"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-department"
          className="block text-sm font-medium mb-1"
        >
          Department
        </label>
        <select
          id="contact-department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium mb-1"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className="w-full px-3 py-2.5 rounded-md border border-gray-soft bg-white text-sm"
        />
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="text-sm text-terracotta mt-1"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-6 py-3 rounded-full bg-terracotta text-white font-medium"
      >
        Send message
      </button>
    </form>
  );
}
