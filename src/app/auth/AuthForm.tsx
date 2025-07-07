"use client";

import React, { useState } from "react";
import { signUp, signIn, logOut } from "@/lib/firebaseAuth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null);
    try {
      const userCredential = await signUp(email, password);
      setUser(userCredential.user.email);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSignIn = async () => {
    setError(null);
    try {
      const userCredential = await signIn(email, password);
      setUser(userCredential.user.email);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>ログイン中: {user}</p>
          <button onClick={handleLogOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>新規登録</button>
          <button onClick={handleSignIn}>ログイン</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
