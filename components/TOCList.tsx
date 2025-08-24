  import Link from "next/link";
  import { pieces } from "@/lib/data/pieces";

  const mottos: Record<string,string> = {
    "behind-the-veil":"Where voice meets intention",
    "threads":"Craft, instinct, precision",
    "concrete-poetry":"Matter, memory, intention",
    "choreographing-intuition":"When design escapes the blueprint",
    "the-raw-draft":"Origins, obsessions & process"
  };

  export default function TOCList() {
    return (
      <section className="px-6 py-12 md:py-16">
        <h2 className="display text-xs mb-6">THE CONTENT</h2>
        <ul className="space-y-4">
          {pieces.sort((a,b)=>a.order-b.order).map(p => (
            <li key={p.slug} className="group">
              <Link href={`/pieces/${p.slug}`} className="flex items-baseline gap-3">
                <span className="text-sm">{p.title}</span>
                <span className="text-lg md:text-xl underline-offset-4 group-hover:underline">{p.subtitle}</span>
              </Link>
              <p className="text-xs text-neutral-600 ml-20">{mottos[p.slug]}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
