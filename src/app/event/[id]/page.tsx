import { createClient } from "@/lib/supabase";

const tagColors: { [key: string]: string } = {
  Networking: "bg-blue-500/20 text-blue-300",
  Workshop: "bg-teal-500/20 text-teal-300",
  Hackathon: "bg-amber-500/20 text-amber-300",
  Seminar: "bg-purple-500/20 text-purple-300",
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (!event) {
    return (
      <main className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <p className="text-white/40">イベントが見つかりませんでした</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">
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

      <div className="px-6 pt-8 max-w-4xl mx-auto">
        <a href="/" className="text-white/40 hover:text-white text-sm transition">
          ← イベント一覧に戻る
        </a>
      </div>

      <section className="px-6 py-10 max-w-4xl mx-auto">
        <span className={`text-xs px-3 py-1 rounded-full ${tagColors[event.tag] || "bg-white/10 text-white/60"}`}>
          {event.tag}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">{event.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white/40">
          <span>{event.date}</span>
          <span>{event.location}</span>
          <span>定員 {event.capacity}名</span>
        </div>
      </section>

      <section className="px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-bold mb-3">イベント概要</h2>
            <p className="text-white/60 leading-relaxed text-sm">{event.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <div>
              <div className="text-xs text-white/30 mb-1">日時</div>
              <div className="text-sm">{event.date}</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-1">場所</div>
              <div className="text-sm">{event.location}</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-1">定員</div>
              <div className="text-sm">{event.capacity}名</div>
            </div>
            <div>
              <div className="text-xs text-white/30 mb-1">参加費</div>
              <div className="text-sm">無料</div>
            </div>
            <a href="/auth">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-full text-sm transition mt-2">
                参加申し込みをする
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}