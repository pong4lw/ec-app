"use client";

import React, { useState } from "react";
import AuthModal from "@/components/organisms/Auth/AuthModal";
import { useAuth } from "@/components/organisms/Auth/AuthContext";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
