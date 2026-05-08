"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const tagColors: { [key: string]: string } = {
  スタートアップ: "bg-blue-500/20 text-blue-300",
  読書: "bg-teal-500/20 text-teal-300",
  音楽: "bg-purple-500/20 text-purple-300",
  旅行: "bg-amber-500/20 text-amber-300",
  映画: "bg-pink-500/20 text-pink-300",
};

type Profile = {
  id: string;
  name: string;
  university: string;
  year: number;
  bio: string;
  tags: string[];
};

export default function MatchPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [current, setCurrent] = useState(0);
  const [matched, setMatched] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/auth";
        return;
      }
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id);

      setProfiles(data || []);
      setLoading(false);
    };
    init();
  }, []);

  const handleLike = async () => {
    if (!userId || current >= profiles.length) return;
    const target = profiles[current];

    await supabase.from("likes").insert({
      from_user_id: userId,
      to_user_id: target.id,
    });

    const { data: theyLiked } = await supabase
      .from("likes")
      .select("*")
      .eq("from_user_id", target.id)
      .eq("to_user_id", userId)
      .single();

    if (theyLiked) {
      setMatched(target);
    }

    setCurrent((prev) => prev + 1);
  };

  const handlePass = () => {
    setCurrent((prev) => prev + 1);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <p className="text-white/40">読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-xl font-bold text-blue-300">UniConnect</a>
        <a href="/mypage" className="text-sm text-white/40 hover:text-white transition">マイページ</a>
      </nav>

      <div className="max-w-md mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-center mb-2">マッチング</h1>
        <p className="text-white/40 text-sm text-center mb-10">気になる人にいいねしよう</p>

        {/* マッチ通知 */}
        {matched && (
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-6 text-center mb-8">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-bold text-lg">{matched.name}さんとマッチしました！</p>
            <p className="text-white/40 text-sm mt-1">メッセージを送ってみましょう</p>
            <button
              onClick={() => setMatched(null)}
              className="mt-4 bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-full text-sm transition"
            >
              続ける
            </button>
          </div>
        )}

        {/* プロフィールカード */}
        {current < profiles.length ? (
          <div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-300 mb-4">
                  {profiles[current].name?.[0] || "?"}
                </div>
                <h2 className="text-xl font-bold">{profiles[current].name}</h2>
                <p className="text-white/40 text-sm mt-1">
                  {profiles[current].university} {profiles[current].year && `${profiles[current].year}年`}
                </p>
                <p className="text-white/60 text-sm mt-4 leading-relaxed">
                  {profiles[current].bio || "自己紹介未設定"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {profiles[current].tags?.map((tag) => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full ${tagColors[tag] || "bg-white/10 text-white/60"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePass}
                className="flex-1 border border-white/20 hover:border-white/40 text-white/60 hover:text-white py-3 rounded-full text-sm transition"
              >
                パス
              </button>
              <button
                onClick={handleLike}
                className="flex-1 bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-full text-sm transition"
              >
                いいね ♡
              </button>
            </div>

            <p className="text-center text-white/20 text-xs mt-4">
              {profiles.length - current}人残り
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40">全員見ました！</p>
            <a href="/" className="text-blue-400 text-sm hover:underline mt-4 block">
              ホームに戻る
            </a>
          </div>
        )}
      </div>
    </main>
  );
}