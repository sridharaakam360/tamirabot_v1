"use client";

import { useState } from "react";
import { createContactLead } from "@/lib/contactService";

const EMPTY = { name: "", email: "", company: "", phone: "", message: "" };

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-[#F04F54] transition-colors border-[#E5E7EB] text-[#24125F] disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wider mb-2 text-[#24125F]";

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update =
    (field: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await createContactLead({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7F7] p-10 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center bg-[#F04F54]/10 text-[#F04F54]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#24125F] mb-2">Thank you, {form.name || "there"}!</h3>
        <p className="text-sm text-[#7D7D8C] max-w-sm mx-auto">
          Your enquiry has been received. Our engineering team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setForm(EMPTY);
            setSubmitted(false);
            setError("");
          }}
          className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm text-white bg-[#F04F54] hover:opacity-90 active:scale-95 transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            required
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={update("name")}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            required
            type="email"
            placeholder="john@company.com"
            value={form.email}
            onChange={update("email")}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Company</label>
          <input
            type="text"
            placeholder="Company Name"
            value={form.company}
            onChange={update("company")}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            placeholder="+91 81486 82557"
            value={form.phone}
            onChange={update("phone")}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your EV charging requirements..."
          value={form.message}
          onChange={update("message")}
          disabled={isSubmitting}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-sm text-[#F04F54] bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:opacity-90 active:scale-95 transition-all shadow-sm bg-[#F04F54] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>
    </form>
  );
}
