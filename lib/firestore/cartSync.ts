import { useEffect } from "react";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { useCartStore } from "./cart";

/**
 * Firestoreのカートデータを1回だけ読み込む初期化フック
 * - ログイン済みなら読み込む
 * - ログアウト時は何もしない
 */
export const useInitCartSync = () => {
  const { user } = useAuth();
  const loadCartOnce = useCartStore((state) => state.loadCartOnce);

  useEffect(() => {
    if (user) {
      loadCartOnce();
    }
  }, [user, loadCartOnce]);
};
