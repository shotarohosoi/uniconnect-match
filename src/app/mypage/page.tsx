"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

const tabs = ["プロフィール", "参加イベント", "マッチング"];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("プロフィール");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/auth";
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    };
    init();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-300">
            {profile?.name?.[0] || user?.email?.[0] || "?"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.name || "名前未設定"}</h1>
            <p className="text-white/40 text-sm mt-1">{profile?.university || "大学未設定"}</p>
            <p className="text-white/40 text-sm">{user?.email}</p>
          </div>
          <a href="/match" className="ml-auto">
            <button className="text-sm border border-white/20 hover:border-blue-400 text-white/60 hover:text-white px-4 py-2 rounded-full transition">
              マッチングへ
            </button>
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-sm transition border-b-2 ${
                activeTab === tab
                  ? "border-blue-400 text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab: プロフィール */}
        {activeTab === "プロフィール" && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div>
                <div className="text-xs text-white/30 mb-1">自己紹介</div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {profile?.bio || "自己紹介未設定"}
                </p>
              </div>
              <div>
                <div className="text-xs text-white/30 mb-2">興味・タグ</div>
                <div className="flex flex-wrap gap-2">
                  {profile?.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  )) || <span className="text-xs text-white/30">タグ未設定</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: 参加イベント */}
        {activeTab === "参加イベント" && (
          <div className="text-center py-12">
            <p className="text-white/40 text-sm">参加イベントはまだありません</p>
            <a href="/" className="text-blue-400 text-sm hover:underline mt-4 block">
              イベントを探す
            </a>
          </div>
        )}

        {/* Tab: マッチング */}
        {activeTab === "マッチング" && (
          <div className="text-center py-12 space-y-4">
            <p className="text-white/40 text-sm">まだマッチングがありません</p>
            <a href="/match">
              <button className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-full text-sm transition">
                マッチングを始める
              </button>
            </a>
          </div>
        )}

      </div>
    </main>
  );
}