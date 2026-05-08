"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("ログインに失敗しました: " + error.message);
    } else {
      window.location.href = "/mypage";
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, university }
      }
    });
    if (error) {
      setMessage("登録に失敗しました: " + error.message);
    } else {
      setMessage("確認メールを送信しました。メールをご確認ください。");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-xl font-bold text-blue-300">UniConnect</a>
      </nav>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Tabs */}
          <div className="flex bg-white/5 rounded-full p-1 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full text-sm transition ${
                mode === "login"
                  ? "bg-blue-600 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              ログイン
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-full text-sm transition ${
                mode === "register"
                  ? "bg-blue-600 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              新規登録
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">

            <h1 className="text-2xl font-bold text-center">
              {mode === "login" ? "おかえりなさい" : "アカウントを作成"}
            </h1>

            {message && (
              <div className={`text-sm text-center px-4 py-3 rounded-xl ${
                message.includes("失敗")
                  ? "bg-red-500/20 text-red-300"
                  : "bg-green-500/20 text-green-300"
              }`}>
                {message}
              </div>
            )}

            {mode === "register" && (
              <div>
                <label className="text-xs text-white/40 block mb-1">お名前</label>
                <input
                  type="text"
                  placeholder="田中 葵"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            )}

            {mode === "register" && (
              <div>
                <label className="text-xs text-white/40 block mb-1">大学名</label>
                <input
                  type="text"
                  placeholder="東京大学"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-white/40 block mb-1">メールアドレス</label>
              <input
                type="email"
                placeholder="xxxx@xxx.ac.jp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 block mb-1">パスワード</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              onClick={mode === "login" ? handleLogin : handleRegister}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-full text-sm transition"
            >
              {loading ? "処理中..." : mode === "login" ? "ログインする" : "登録する"}
            </button>

            {mode === "login" && (
              <p className="text-center text-xs text-white/30">
                アカウントをお持ちでない方は{" "}
                <span
                  onClick={() => setMode("register")}
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  新規登録
                </span>
              </p>
            )}

          </div>
        </div>
      </div>

    </main>
  );
}