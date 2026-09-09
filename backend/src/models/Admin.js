import mongoose from "mongoose";

const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    // Last 3 previous password hashes, most recent first — checked on reset
    // so a user can't immediately reuse a recent password.
    passwordHistory: { type: [String], default: [] },
    // Set only while a reset link is outstanding. We store a SHA-256 hash of
    // the token (never the raw token) so a DB read alone can't be used to
    // reset the account.
    resetPasswordTokenHash: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);