export function mailtoLink(enquiry) {
  const subject = encodeURIComponent(`Re: your enquiry with Suits`);
  const body = encodeURIComponent(`Hi ${enquiry.name},\n\n`);
  return `mailto:${enquiry.email}?subject=${subject}&body=${body}`;
}

export function whatsappLink(enquiry) {
  const digits = (enquiry.phone || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(`Hi ${enquiry.name}, this is Suits following up on your enquiry.`);
  return `https://wa.me/${digits}?text=${text}`;
}

export function telLink(enquiry) {
  return `tel:${(enquiry.phone || "").replace(/[^\d+]/g, "")}`;
}
