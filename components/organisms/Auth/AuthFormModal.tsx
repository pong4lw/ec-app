"use client";
import React from "react";
import { useState } from "react";
import AuthForm from "@/components/organisms/Auth/AuthForm";

export default function AuthFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded shadow-lg"
      >
        ログイン / 登録
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              &times;
            </button>
            <AuthForm />
          </div>
        </div>
      )}
    </>
  );
}
