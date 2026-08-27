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
      className="hidden md:flex fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full items-center gap-2 px-5 py-3 shadow-lg transition-all hover:scale-105 pointer-events-auto cursor-pointer"
    >
      <MessageCircle className="h-5 w-5 fill-white text-green-500" />
      <span className="text-sm font-extrabold tracking-wide text-white">{t("whatsapp.trial")}</span>
    </a>
  );
}
