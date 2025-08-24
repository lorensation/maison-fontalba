  export default function SubseriesHeader({ title, blurb }: { title: string; blurb: string }) {
    return (
      <div className="px-6 py-4">
        <h3 className="text-sm tracking-wider uppercase">{title}</h3>
        <p className="text-sm text-neutral-600">{blurb}</p>
      </div>
    );
  }
