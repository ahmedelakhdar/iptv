"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsappNumber } from "@/app/actions/adminActions";
import { formatWhatsAppNumber } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const [whatsappNumber, setWhatsappNumber] = useState("212600000000");

  useEffect(() => {
    let isMounted = true;
    getWhatsappNumber().then((num) => {
      if (isMounted && num) setWhatsappNumber(num);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const whatsappUrl = `https://wa.me/${formatWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(
    t("whatsapp.trial_msg") || "Bonjour IPTV For Europe, je souhaite demander un essai gratuit 24h."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Demander un Essai 24h sur WhatsApp"
      className="flex fixed bottom-4 right-4 sm:bottom-6 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 shadow-md transition-all active:scale-95 pointer-events-auto cursor-pointer"
    >
      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 fill-white text-emerald-600" />
      <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white">{t("whatsapp.trial")}</span>
    </a>
  );
}
