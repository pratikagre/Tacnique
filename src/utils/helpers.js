import { DEPARTMENTS } from './constants';

/**
 * Splits a full name into firstName and lastName.
 * e.g., "Leanne Graham" => { firstName: "Leanne", lastName: "Graham" }
 * e.g., "Mrs. Dennis Schulist" => { firstName: "Dennis", lastName: "Schulist" }
 */
export function parseUserName(fullName = "") {
  if (!fullName) return { firstName: "", lastName: "" };

  // Remove common titles like Mr., Mrs., Dr. if present for cleaner display
  const cleanedName = fullName.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s+/i, "").trim();
  const nameParts = cleanedName.split(" ").filter(Boolean);

  if (nameParts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: "" };
  }

  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" ")
  };
}

/**
 * Assigns a deterministic department based on user properties or company name,
 * ensuring consistent mapping across re-renders.
 */
export function assignDepartment(user) {
  if (user.department) return user.department;

  // Derive from company name if available
  const companyName = user.company?.name || "";
  if (companyName.toLowerCase().includes("group") || companyName.toLowerCase().includes("tech")) {
    return "Engineering";
  }
  if (companyName.toLowerCase().includes("llc") || companyName.toLowerCase().includes("inc")) {
    return "Sales";
  }

  // Fallback to deterministic modulo selection based on user ID
  const idNum = Number(user.id) || 0;
  return DEPARTMENTS[idNum % DEPARTMENTS.length];
}
