"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./getDictionary";
import frDict from "../dictionaries/fr.json";

const DictContext = createContext<Dictionary | null>(null);

export function DictProvider({
  dict,
  children,
}: {
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
}

export function useDict(): Dictionary {
  return useContext(DictContext) ?? (frDict as Dictionary);
}
