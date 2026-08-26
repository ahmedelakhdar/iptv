"use client";

import React from "react";

interface BidiTextProps {
  text: string;
  className?: string;
}

/**
 * BidiText component automatically parses mixed Arabic/English text strings
 * and isolates embedded English/Latin brand names (like "IBO Player", "IPTV For Europe",
 * "Firestick", "Apple TV", "Samsung", "LG", "4K", etc.) inside HTML <bdi dir="ltr"> tags.
 * This guarantees pristine right-to-left layout without word flipping or period displacement.
 */
export function BidiText({ text, className = "" }: BidiTextProps) {
  if (!text) return null;

  // Split string around Latin character sequences (including brand names with spaces, numbers, and symbols)
  const regex = /([A-Za-z0-9][A-Za-z0-9\s&+\-/:.]{1,}[A-Za-z0-9]|[A-Za-z0-9]{2,})/g;
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        // If the chunk contains Latin letters (A-Z, a-z), wrap in isolated <bdi dir="ltr">
        if (/[A-Za-z]/.test(part)) {
          return (
            <bdi key={idx} dir="ltr" className="inline-block unicode-isolate font-sans px-0.5">
              {part}
            </bdi>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
}
