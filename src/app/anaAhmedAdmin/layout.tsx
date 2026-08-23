import React from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AdminLayoutClient } from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let settings = null;
  try {
    settings = await prisma.globalSettings.findFirst();
  } catch (_error) {
    // Silently fall back during build step or unsynced DB
  }

  const hasAdminPassword = Boolean(settings?.adminPassword);
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAuthenticated = session === "authenticated";

  return (
    <AdminLayoutClient hasAdminPassword={hasAdminPassword} isAuthenticated={isAuthenticated}>
      {children}
    </AdminLayoutClient>
  );
}
