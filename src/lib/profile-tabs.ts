export type ProfileTabId = "distribuidor" | "representante" | "profissional";

export const PROFILE_TAB_IDS: readonly ProfileTabId[] = ["distribuidor", "representante", "profissional"];

export function profileTabFromSearchParam(value: string | null): ProfileTabId | null {
  if (value === "distribuidor" || value === "representante" || value === "profissional") return value;
  return null;
}
