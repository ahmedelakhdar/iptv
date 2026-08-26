"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Root-level ErrorBoundary that catches React hydration crashes gracefully.
 * On Safari/WebKit, uncaught React errors cause a completely blank screen.
 * This boundary surfaces a minimal fallback instead.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[IPTV ErrorBoundary]", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              minHeight: "100dvh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#030308",
              color: "#f8fafc",
              fontFamily: "system-ui, -apple-system, sans-serif",
              gap: "16px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              Une erreur est survenue
            </p>
            <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
              Veuillez recharger la page pour continuer.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "8px",
                padding: "10px 24px",
                background: "#8b5cf6",
                color: "#fff",
                borderRadius: "9999px",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Recharger la page
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
