  type Props = { title: string; items: string[] };
  export default function KeyList({ title, items }: Props) {
    return (
      <section className="px-6 py-6">
        <h3 className="text-sm tracking-wider uppercase text-neutral-500">{title}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 mt-4">
          {items.map((it,i)=> <li key={i} className="border-b border-neutral-200 py-2">{it}</li>)}
        </ul>
      </section>
    );
  }
