"use client";

import { useEffect } from "react";

/**
 * ServiceWorkerUnregister:
 * Client component that unregisters any active or stale Service Workers
 * and clears legacy caches to prevent iOS Safari infinite loading hangs.
 */
export function ServiceWorkerUnregister() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        navigator.serviceWorker
          .getRegistrations()
          .then((registrations) => {
            for (const registration of registrations) {
              registration.unregister();
            }
          })
          .catch(() => {});
      }

      if (typeof window !== "undefined" && "caches" in window) {
        caches
          .keys()
          .then((keys) => {
            for (const key of keys) {
              caches.delete(key);
            }
          })
          .catch(() => {});
      }
    } catch (_err) {
      // Safe fallback for restricted iOS WebKit contexts
    }
  }, []);

  return null;
}
