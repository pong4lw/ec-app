import React from "react";
import AuthForm from "@/components/organisms/Auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4 min-h-[300px]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          ログイン / 新規登録
        </h1>
        <AuthForm />
      </div>
    </main>
  );
}
