export const sectionOrder = [
  "Hero",
  "AudienceTabs",
  "Opportunity",
  "ControlPanel",
  "RecurringIncome",
  "ComoFunciona",
  "Tools",
  "Ecosystem",
  "AppPreview",
  "Metrics",
  "Products",
  "StoreProof",
  "FinalCTA",
  "FAQ",
] as const;

export type SectionName = (typeof sectionOrder)[number];
