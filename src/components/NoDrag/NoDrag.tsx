"use client";

import { useEffect } from "react";

export default function NoDrag() {
  useEffect(() => {
    function prevent(e: DragEvent) { e.preventDefault(); }
    document.addEventListener("dragstart", prevent, true);
    return () => document.removeEventListener("dragstart", prevent, true);
  }, []);

  return null;
}
