"use client";

import { Header } from "@/components/organisms/Header";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { logOut } from "@/lib/firebaseAuth";

export default function HeaderClient() {
  const { user } = useAuth();

  const handleLogin = () => {
    console.log("ログイン画面へ遷移");
    // 例: router.push("/login");
  };

  const handleCreateAccount = () => {
    console.log("新規登録画面へ遷移");
    // 例: router.push("/signup");
  };

  return (
    <Header
      user={user ? { name: user.email || "User" } : undefined}
      onLogin={handleLogin}
      onLogout={logOut}
      onCreateAccount={handleCreateAccount}
    />
  );
}
