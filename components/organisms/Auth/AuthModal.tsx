// components/organisms/Auth/AuthModal.tsx
"use client";

import React from "react";
import Modal from "@/components/atoms/Modal";
import AuthForm from "./AuthForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AuthForm />
    </Modal>
  );
}
