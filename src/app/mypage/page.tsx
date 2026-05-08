"use client";
import { useState } from "react";

const tabs = ["プロフィール", "参加イベント", "マッチング"];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("プロフィール");

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-xl font-bold text-blue-300">UniConnect</a>
        <button className="text-sm text-white/40 hover:text-white transition">ログアウト</button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-300">
            田
          </div>
          <div>
            <h1 className="text-2xl font-bold">田中 葵</h1>
            <p className="text-white/40 text-sm mt-1">東京大学 3年・経済学部</p>
            <p className="text-white/40 text-sm">hosoi.shotaro@gmail.com</p>
          </div>
          <button className="ml-auto text-sm border border-white/20 hover:border-blue-400 text-white/60 hover:text-white px-4 py-2 rounded-full transition">
            編集
          </button>
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
                  将来は社会起業家を目指して勉強中。共通の夢を語り合える人と出会いたいです。
                </p>
              </div>
              <div>
                <div className="text-xs text-white/30 mb-2">興味・タグ</div>
                <div className="flex flex-wrap gap-2">
                  {["スタートアップ", "読書", "カフェ巡り"].map((tag) => (
                    <span key={tag} className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: 参加イベント */}
        {activeTab === "参加イベント" && (
          <div className="space-y-4">
            {[
              { title: "春のキャリア交流会 2025", date: "5月15日 (木)", tag: "Networking", color: "blue" },
              { title: "スタートアップ実践ワークショップ", date: "5月22日 (木)", tag: "Workshop", color: "teal" },
            ].map((event) => (
              <div key={event.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition cursor-pointer">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  event.color === "blue" ? "bg-blue-500/20 text-blue-300" : "bg-teal-500/20 text-teal-300"
                }`}>
                  {event.tag}
                </span>
                <h3 className="font-semibold mt-3 mb-1">{event.title}</h3>
                <p className="text-xs text-white/40">{event.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab: マッチング */}
        {activeTab === "マッチング" && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-white/40 text-center py-4">
                マッチング機能はイベント参加後に解放されます
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "鈴木 蓮", univ: "慶應義塾大学 2年", tags: ["プログラミング", "音楽"], initial: "蓮", color: "teal" },
                { name: "佐藤 陽菜", univ: "早稲田大学 4年", tags: ["旅行", "映画"], initial: "陽", color: "purple" },
              ].map((match) => (
                <div key={match.name} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                    match.color === "teal" ? "bg-teal-500/20 text-teal-300" : "bg-purple-500/20 text-purple-300"
                  }`}>
                    {match.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{match.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{match.univ}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {match.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}