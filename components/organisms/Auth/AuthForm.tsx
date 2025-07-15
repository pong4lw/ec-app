"use client";

import React, { useState } from "react";
import { signUp, signIn, logOut } from "@/lib/firebaseAuth";
import { useAuth } from "@/components/organisms/Auth/AuthContext";

export default function AuthForm() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null);
    try {
      await signUp(email, password);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("予期しないエラーが発生しました");
    }
  };

  const handleSignIn = async () => {
    setError(null);
    try {
      await signIn(email, password);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("予期しないエラーが発生しました");
    }
  };

  const handleLogOut = async () => {
    setError(null);
    try {
      await logOut();
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("ログアウトで予期しないエラーが発生しました");
    }
  };

  // ローディング中の表示
  if (loading) {
    return <p className="text-center text-gray-500">読み込み中...</p>;
  }

  // ログイン済みの表示（ログアウトボタンあり）
  if (user) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-center">
        <p className="mb-4 text-lg">
          ようこそ、<strong>{user.email || "ユーザー"}</strong> さん！
        </p>
        <button
          onClick={handleLogOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          ログアウト
        </button>
        {error && (
          <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
        )}
      </div>
    );
  }

  // 未ログイン時のログイン・新規登録フォーム
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6">
        ログインまたは新規登録
      </h2>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          パスワード
        </label>
        <input
          id="password"
          type="password"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      {error && (
        <p className="mb-4 text-red-500 text-sm font-medium">{error}</p>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          ログイン
        </button>
        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
        >
          新規登録
        </button>
      </div>
    </div>
  );
}
