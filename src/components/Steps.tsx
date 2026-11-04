import { FadeUp, MaskText } from "./Reveal";

/** Numbered editorial list, used for process steps and values. */
export function Steps({
  label,
  title,
  items,
  dark = false,
}: {
  label: string;
  title: string;
  items: { title: string; text: string }[];
  dark?: boolean;
}) {
  return (
    <section className={`px-4 py-[10vw] sm:px-6 ${dark ? "bg-accent text-white" : "bg-ivory text-ink"}`}>
      <div className="grid gap-10 md:grid-cols-[32%_1fr]">
        <div>
          <p className={`t-label mb-6 ${dark ? "text-white/60" : "text-ink/60"}`}>{label}</p>
          <MaskText text={title} className="t-h2" />
        </div>
        <ol className={`border-t ${dark ? "border-white/15" : "border-line"}`}>
          {items.map((it, i) => (
            <li key={it.title} className={`border-b ${dark ? "border-white/15" : "border-line"}`}>
              <FadeUp delay={i * 80} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-8 md:grid-cols-[80px_1fr_1.2fr]">
                <span className="t-row tabular-nums opacity-40">0{i + 1}</span>
                <h3 className="t-row">{it.title}</h3>
                <p className={`col-start-2 text-[15px] leading-relaxed md:col-start-3 ${dark ? "text-white/70" : "text-ink/70"}`}>
                  {it.text}
                </p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
