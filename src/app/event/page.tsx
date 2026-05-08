export default function EventPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-xl font-bold text-blue-300">UniConnect</a>
        <ul className="hidden md:flex gap-8 text-sm text-white/60">
          <li>イベント</li>
          <li>コミュニティ</li>
          <li>大学一覧</li>
        </ul>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-full transition">
          無料登録
        </button>
      </nav>

      {/* Back */}
      <div className="px-6 pt-8 max-w-4xl mx-auto">
        <a href="/" className="text-white/40 hover:text-white text-sm transition">← イベント一覧に戻る</a>
      </div>

      {/* Header */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <span className="text-xs bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full">Workshop</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">スタートアップ実践ワークショップ</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white/40">
          <span>5月22日 (木) 18:00〜21:00</span>
          <span>早稲田大学 西早稲田キャンパス</span>
          <span>参加者 60名</span>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">

        {/* Main */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-bold mb-3">イベント概要</h2>
            <p className="text-white/60 leading-relaxed text-sm">
              本ワークショップでは、スタートアップの立ち上げに必要なビジネスモデル設計・顧客検証・ピッチの基礎を実践的に学びます。グループワーク中心の構成で、異なる大学の学生と協力しながらアイデアを形にする体験ができます。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">タイムライン</h2>
            <div className="space-y-3">
              {[
                { time: "18:00", label: "開場・受付" },
                { time: "18:15", label: "アイスブレイク・チーム分け" },
                { time: "18:30", label: "講義：ビジネスモデル設計入門" },
                { time: "19:00", label: "グループワーク" },
                { time: "20:15", label: "チーム発表・フィードバック" },
                { time: "21:00", label: "懇親会・解散" },
              ].map((item) => (
                <div key={item.time} className="flex gap-4 text-sm">
                  <span className="text-blue-400 w-14 flex-shrink-0">{item.time}</span>
                  <span className="text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <div>
              <div className="text-xs text-white/30 mb-1">日時</div>
              <div className="text-sm">5月22日 (木) 18:00〜21:00</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-1">場所</div>
              <div className="text-sm">早稲田大学 西早稲田キャンパス</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-1">定員</div>
              <div className="text-sm">60名</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-1">参加費</div>
              <div className="text-sm">無料</div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-full text-sm transition">
              参加申し込みをする
            </button>
          </div>
        </div>

      </section>

    </main>
  )
}