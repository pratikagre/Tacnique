import { DEPARTMENTS } from './constants';

export function parseUserName(fullName = "") {
  if (!fullName) return { firstName: "", lastName: "" };

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

export function assignDepartment(user) {
  if (user.department) return user.department;

  const companyName = user.company?.name || "";
  if (companyName.toLowerCase().includes("group") || companyName.toLowerCase().includes("tech")) {
    return "Engineering";
  }
  if (companyName.toLowerCase().includes("llc") || companyName.toLowerCase().includes("inc")) {
    return "Sales";
  }

  const idNum = Number(user.id) || 0;
  return DEPARTMENTS[idNum % DEPARTMENTS.length];
}
