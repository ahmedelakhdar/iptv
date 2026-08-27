"use client";

/**
 * ServiceWorkerUnregister:
 * Neutralized to prevent WebKit Cache Storage API invalidation during active hydration.
 */
export function ServiceWorkerUnregister() {
  return null;
}
