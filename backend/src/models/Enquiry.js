import mongoose from "mongoose";

const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    text: { type: String, required: true, trim: true },
    author: { type: String, default: "" }, // admin name/email who wrote it
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ENQUIRY_STATUSES = ["new", "contacted", "in-progress", "converted", "closed"];
export const ENQUIRY_SOURCES = ["Enquiry", "Feedback", "Chatbot"];

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },

    // Which form/channel this came from.
    source: { type: String, enum: ENQUIRY_SOURCES, default: "Enquiry" },

    // Contact-page / home-page enquiry form fields.
    service: { type: String, default: "" },
    preferredTime: { type: String, default: "" },
    message: { type: String, default: "" },

    // Feedback-form-only field.
    rating: { type: String, default: "" },

    // Admin-managed workflow fields.
    status: { type: String, enum: ENQUIRY_STATUSES, default: "new" },
    assignedTo: { type: String, default: "" },
    notes: { type: [NoteSchema], default: [] },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

EnquirySchema.index({ name: "text", email: "text", phone: "text", message: "text" });

export default mongoose.model("Enquiry", EnquirySchema);
