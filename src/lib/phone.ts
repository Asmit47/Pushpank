/** Normalises an Indian mobile number to +91XXXXXXXXXX. Assumes the value passed schema validation. */
export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return `+91${digits.slice(-10)}`;
}
