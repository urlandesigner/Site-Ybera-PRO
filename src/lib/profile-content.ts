"use client";

import { useSearchParams } from "next/navigation";

import { profileTabFromSearchParam, type ProfileTabId } from "@/lib/profile-tabs";

export function useActiveProfile(): ProfileTabId {
  const searchParams = useSearchParams();
  return profileTabFromSearchParam(searchParams.get("perfil")) ?? "distribuidor";
}

