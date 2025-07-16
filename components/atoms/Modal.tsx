"use client";

import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // 初期フォーカス
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // モーダルが開いていなければ描画しない
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          ref={closeButtonRef}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="モーダルを閉じる"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
