import { Button } from "@/components/atoms/Button";
import AuthForm from "@/components/organisms/Auth/AuthForm";

export type User = { name: string | null };

export interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md py-4 px-6 rounded-md max-w-2xl mx-auto mt-10 border border-gray-200">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {user?.name
            ? `ようこそ、${user.name} さん`
            : "ゲストとしてログイン中"}
        </h1>
        {user ? (
          <button
            onClick={() => onLogout && onLogout()}
            disabled={!onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-md"
          >
            ログアウト
          </button>
        ) : (
          <div className="w-full">
            <AuthForm />
          </div>
        )}
      </div>
    </header>
  );
};
