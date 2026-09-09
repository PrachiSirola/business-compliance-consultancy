// 8–18 characters, at least 1 lowercase, 1 uppercase, 1 number, 1 special char.
const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,18}$/;

export function isValidPassword(password) {
  return typeof password === "string" && PASSWORD_RULE.test(password);
}

export const PASSWORD_REQUIREMENTS_MESSAGE =
  "Password must be 8–18 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character.";