"use client";

import { useState } from "react";
import { FormField } from "@/lib/types";

// ---------------------------------------------------------------------------
// Shared style tokens
// ---------------------------------------------------------------------------

const labelClass =
  "block text-xs uppercase tracking-widest text-[#a0a0a0] mb-2";
const inputClass =
  "w-full bg-[#111111] border border-[#2a2a2a] text-[#f5f5f5] text-sm px-4 py-3 placeholder:text-[#505050] focus:outline-none focus:border-[#505050] transition-colors";
const helperClass = "mt-1.5 text-xs text-[#505050]";

// ---------------------------------------------------------------------------
// Individual field renderers
// ---------------------------------------------------------------------------

function TextField({ field }: { field: FormField }) {
  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}
        {field.required && <span className="text-[#f5f5f5] ml-1">*</span>}
      </label>
      <input
        id={field.id}
        name={field.id}
        type={
          field.type === "url"
            ? "url"
            : field.type === "email"
            ? "email"
            : "text"
        }
        placeholder={field.placeholder}
        required={field.required}
        className={inputClass}
      />
      {field.helperText && <p className={helperClass}>{field.helperText}</p>}
    </div>
  );
}

function TextareaField({ field }: { field: FormField }) {
  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}
        {field.required && <span className="text-[#f5f5f5] ml-1">*</span>}
      </label>
      <textarea
        id={field.id}
        name={field.id}
        placeholder={field.placeholder}
        required={field.required}
        rows={6}
        className={`${inputClass} resize-y`}
      />
      {field.helperText && <p className={helperClass}>{field.helperText}</p>}
    </div>
  );
}

function CheckboxGroupField({ field }: { field: FormField }) {
  const options = field.options ?? [];
  return (
    <div>
      <p className={labelClass}>
        {field.label}
        {field.required && <span className="text-[#f5f5f5] ml-1">*</span>}
      </p>
      <div className="flex flex-col gap-2.5 mt-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              name={`${field.id}--${option}`}
              value={option}
              className="w-4 h-4 border border-[#2a2a2a] bg-[#111111] accent-[#f5f5f5] cursor-pointer"
            />
            <span className="text-sm text-[#a0a0a0] group-hover:text-[#f5f5f5] transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
      {field.helperText && (
        <p className={`${helperClass} mt-2`}>{field.helperText}</p>
      )}
    </div>
  );
}

function FileField({ field }: { field: FormField }) {
  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}
        {field.required && <span className="text-[#f5f5f5] ml-1">*</span>}
      </label>
      <input
        id={field.id}
        name={field.id}
        type="file"
        accept=".pdf,.doc,.docx"
        required={field.required}
        className="w-full text-sm text-[#a0a0a0] file:mr-4 file:py-2 file:px-4 file:border file:border-[#2a2a2a] file:bg-[#111111] file:text-[#a0a0a0] file:text-xs file:uppercase file:tracking-widest file:cursor-pointer hover:file:text-[#f5f5f5] hover:file:border-[#505050] transition-colors cursor-pointer"
      />
      {field.helperText && <p className={helperClass}>{field.helperText}</p>}
    </div>
  );
}

function FormFieldRenderer({ field }: { field: FormField }) {
  if (field.type === "textarea") return <TextareaField field={field} />;
  if (field.type === "checkbox-group")
    return <CheckboxGroupField field={field} />;
  if (field.type === "file") return <FileField field={field} />;
  return <TextField field={field} />;
}

// ---------------------------------------------------------------------------
// Main form component
// ---------------------------------------------------------------------------

type FormStatus = "idle" | "pending" | "success" | "error";

interface ApplicationFormProps {
  fields: FormField[];
}

export default function ApplicationForm({ fields }: ApplicationFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    setErrorMessage("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Form submission is not configured. Please contact us directly.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", accessKey);
    formData.append("subject", "New Pandemonium Research Cohort Application");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          result.message ?? "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the submission service. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[#2a2a2a] bg-[#111111] p-8">
        <p
          className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Received
        </p>
        <p className="text-[#f5f5f5] text-sm">
          Application received. We&apos;ll be in touch before May 15.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {fields.map((field) => (
        <FormFieldRenderer key={field.id} field={field} />
      ))}

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="mt-2 inline-flex items-center gap-2 bg-[#f5f5f5] text-[#111111] text-sm font-medium px-6 py-3 hover:bg-[#d4d4d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {status === "pending" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
