"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <a href="/" className="text-xl font-bold text-blue-300">UniConnect</a>
      <ul className="hidden md:flex gap-8 text-sm text-white/60">
        <li><a href="/" className="hover:text-white transition">イベント</a></li>
        <li><a href="/match" className="hover:text-white transition">マッチング</a></li>
        <li><a href="/mypage" className="hover:text-white transition">マイページ</a></li>
      </ul>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/mypage" className="text-sm text-white/60 hover:text-white transition">
              {user.email}
            </a>
            <button
              onClick={handleLogout}
              className="text-sm border border-white/20 hover:border-white/40 text-white/60 hover:text-white px-4 py-2 rounded-full transition"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <a href="/auth">
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-full transition">
              無料登録
            </button>
          </a>
        )}
      </div>
    </nav>
  );
}