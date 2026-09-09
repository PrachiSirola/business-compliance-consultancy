import { useState } from "react";
import { BUSINESS } from "../../data/business";
import { apiPost } from "../../lib/api";

/**
 * Shared submit handler for the site's lead/feedback forms.
 * Ported from the `form[data-lead]` handling in the original initForms(),
 * now storing every submission in MongoDB via the backend so it shows up
 * in the Admin Dashboard:
 *  - validates [required] fields inline (field__err messages)
 *  - POSTs the payload to the backend (`window.SUITS_FORM_ENDPOINT` if set,
 *    otherwise the default `/api/enquiries`)
 *  - on failure (e.g. backend unreachable), falls back to a prefilled
 *    mailto: link, same as the original behavior
 *
 * `label` is the original form's data-lead value ("Enquiry" or "Feedback"),
 * stored as the enquiry's `source` and used as the [tag] in the mailto
 * fallback's subject line.
 */
export function useLeadForm(label) {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    let valid = true;
    const nextErrors = {};
    form.querySelectorAll("[required]").forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        nextErrors[field.name] = "This field is required.";
      } else {
        nextErrors[field.name] = "";
      }
    });
    setErrors(nextErrors);
    if (!valid) return;

    const endpoint =
      (typeof window !== "undefined" && window.SUITS_FORM_ENDPOINT) || "/api/enquiries";

    try {
      await apiPost(endpoint, { source: label, type: label, ...data });
    } catch (_err) {
      // Backend unreachable or returned an error — fall back to a
      // prefilled email, same as the original static-site behavior.
      const subject = encodeURIComponent(`[${label}] ${data.name || "Website enquiry"}`);
      const bodyLines = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("%0D%0A");
      window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${bodyLines}`;
    }

    form.reset();
    setSubmitted(true);
  }

  return { errors, submitted, handleSubmit };
}
