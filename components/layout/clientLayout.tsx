"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 min-h-[400px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
