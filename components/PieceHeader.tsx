  type Props = { title: string; subtitle: string; quote: string };
  export default function PieceHeader({ title, subtitle, quote }: Props) {
    return (
      <header className="px-6 pt-16 pb-10 text-center">
        <p className="display text-[10px] tracking-widest text-neutral-500">{title}</p>
        <h1 className="mt-2 text-2xl md:text-4xl">{subtitle}</h1>
        <blockquote className="mt-6 mx-auto prose-narrow text-neutral-700 italic">“{quote}”</blockquote>
      </header>
    );
  }
