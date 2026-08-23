"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Phone } from "lucide-react";

export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
];

interface InternationalPhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  placeholder?: string;
}

export function InternationalPhoneInput({
  value,
  onChange,
  placeholder = "0612345678",
}: InternationalPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState("");

  // Parse initial value if present
  useEffect(() => {
    if (!value) return;
    const clean = value.replace(/\D/g, "");

    // Check matching country dialCode
    const matched = COUNTRIES.find((c) => clean.startsWith(c.dialCode.replace("+", "")));
    if (matched) {
      setSelectedCountry(matched);
      const codeDigits = matched.dialCode.replace("+", "");
      setLocalNumber(clean.slice(codeDigits.length));
    } else {
      setLocalNumber(clean);
    }
  }, [value]);

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
    setSelectedCountry(country);
    const cleanLocal = localNumber.replace(/^0/, "");
    onChange(`${country.dialCode}${cleanLocal}`);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setLocalNumber(input);
    const cleanLocal = input.replace(/\D/g, "").replace(/^0/, "");
    onChange(`${selectedCountry.dialCode}${cleanLocal}`);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Country Selector Dropdown */}
      <div className="relative flex-shrink-0">
        <select
          value={selectedCountry.code}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="appearance-none cursor-pointer rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 pl-3.5 pr-8 py-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white backdrop-blur-xl focus:border-cyan-500 focus:outline-none shadow-sm transition-colors duration-300 min-h-[48px]"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-white dark:bg-[#070714] text-slate-900 dark:text-white">
              {c.flag} {c.code} ({c.dialCode})
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-400" />
      </div>

      {/* Phone Number Input Field */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Phone className="h-4 w-4" />
        </div>
        <input
          type="tel"
          required
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 pl-11 pr-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300 min-h-[48px]"
        />
      </div>
    </div>
  );
}
