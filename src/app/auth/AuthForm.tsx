"use client";

import React, { useState } from "react";
import { signUp, signIn, logOut } from "@/lib/firebaseAuth";
import { useAuth } from "@/context/AuthContext";

export default function AuthForm() {
  const { user } = useAuth();
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
    await logOut();
  };

  if (user) {
    return (
      <div>
        <p>ログイン中: {user.email}</p>
        <button onClick={handleLogOut}>ログアウト</button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>新規登録</button>
      <button onClick={handleSignIn}>ログイン</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
