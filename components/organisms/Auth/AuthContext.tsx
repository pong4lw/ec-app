"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { loadAuth } from "@/lib/firebase";
import AuthModal from "@/components/organisms/Auth/AuthModal";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let unsubscribe: () => void;

    loadAuth().then((auth) => {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        認証情報を読み込み中…
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {/* ここにボタンを設置 */}
      {!user && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ログイン / 登録
          </button>
        </div>
      )}

      {/* モーダル表示 */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 子コンポーネント */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
