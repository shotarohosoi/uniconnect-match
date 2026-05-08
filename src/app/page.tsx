import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

const tagColors: { [key: string]: string } = {
  Networking: "bg-blue-500/20 text-blue-300",
  Workshop: "bg-teal-500/20 text-teal-300",
  Hackathon: "bg-amber-500/20 text-amber-300",
  Seminar: "bg-purple-500/20 text-purple-300",
};

export default async function Home() {
  const supabase = createClient();
  const { data: events } = await supabase.from("events").select("*");

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">

      {/* Navbar */}
<Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-20 md:py-32">
        <p className="text-blue-400 text-sm tracking-widest uppercase mb-4">複数大学 × 地域連携</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          大学を超えて、<br />
          <span className="text-blue-400">つながる。</span>
        </h1>
        <p className="text-white/50 text-base md:text-lg max-w-xl mb-10">
          UniConnectは、全国の大学生が学部・大学の壁を越えてつながり、共に成長するためのコミュニティプラットフォームです。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full transition">
            コミュニティに参加する
          </button>
          <button className="border border-white/20 hover:border-blue-400 text-white/80 px-8 py-3 rounded-full transition">
            イベントを見る
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 border-t border-b border-white/10">
        <div className="flex flex-col items-center py-8 border-r border-white/10">
          <span className="text-3xl md:text-4xl font-bold text-blue-300">12</span>
          <span className="text-white/40 text-xs md:text-sm mt-2">連携大学数</span>
        </div>
        <div className="flex flex-col items-center py-8 border-r border-white/10">
          <span className="text-3xl md:text-4xl font-bold text-blue-300">1,200+</span>
          <span className="text-white/40 text-xs md:text-sm mt-2">登録メンバー</span>
        </div>
        <div className="flex flex-col items-center py-8">
          <span className="text-3xl md:text-4xl font-bold text-blue-300">48</span>
          <span className="text-white/40 text-xs md:text-sm mt-2">開催イベント数</span>
        </div>
      </section>

      {/* Events */}
      <section className="px-6 py-16 md:py-20">
        <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold">近日開催のイベント</h2>
          <span className="text-blue-400 text-sm cursor-pointer hover:underline">すべて見る →</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {events?.map((event) => (
            <a key={event.id} href={`/event/${event.id}`} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition cursor-pointer block">
              <span className={`text-xs px-3 py-1 rounded-full ${tagColors[event.tag] || "bg-white/10 text-white/60"}`}>
                {event.tag}
              </span>
              <h3 className="font-semibold mt-3 mb-2">{event.title}</h3>
              <div className="flex flex-wrap gap-2 text-xs text-white/40">
                <span>{event.date}</span>
                <span>{event.location}</span>
                <span>定員 {event.capacity}名</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-blue-300 font-bold text-lg">UniConnect</span>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-white/30">
          <li className="hover:text-white/60 cursor-pointer">利用規約</li>
          <li className="hover:text-white/60 cursor-pointer">プライバシー</li>
          <li className="hover:text-white/60 cursor-pointer">お問い合わせ</li>
          <li className="hover:text-white/60 cursor-pointer">運営について</li>
        </ul>
        <span className="text-white/20 text-sm">© 2025 UniConnect</span>
      </footer>

    </main>
  );
}