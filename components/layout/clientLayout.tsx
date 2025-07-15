// components/layout/ClientLayout.tsx
"use client";

import { AuthProvider } from "@/components/organisms/Auth/AuthContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
