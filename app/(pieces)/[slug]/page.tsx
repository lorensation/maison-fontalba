import { notFound } from "next/navigation";
import PieceHeader from "@/components/PieceHeader";
import LongformBio from "@/components/LongformBio";
import KeyList from "@/components/KeyList";
import ImageSpread from "@/components/ImageSpread";
import MasonryGallery from "@/components/MasonryGallery";
import SubseriesHeader from "@/components/SubseriesHeader";
import ProcessHighlight from "@/components/ProcessHighlight";
import { pieces, lists, galleries, longformBio } from "@/lib/data/pieces";

export default function PiecePage({ params }: { params: { slug: string } }) {
  const piece = pieces.find(p => p.slug === params.slug);
  if (!piece) return notFound();

  return (
    <main>
      <PieceHeader title={piece.title} subtitle={piece.subtitle} quote={piece.quote} />
      {piece.slug === "behind-the-veil" && <LongformBio body={longformBio} />}

      {piece.slug === "threads" && (
        <section className="pb-16">
          <KeyList title="Tools" items={lists.tools} />
          <KeyList title="Skills" items={lists.skills} />
          <KeyList title="Languages" items={lists.languages} />
        </section>
      )}

      {piece.slug === "concrete-poetry" && (
        <section>
          {galleries["concrete-poetry"].map((b, i)=> b.type === "spread"
            ? <ImageSpread key={i} {...b} />
            : null
          )}
        </section>
      )}

      {piece.slug === "choreographing-intuition" && (
        <section className="pb-12">
          <SubseriesHeader title="Of Volume and Touch — Furniture Design" blurb="Objects that shape sitting, resting, gathering." />
          {galleries["choreographing-intuition"].slice(0,1).map((b,i)=> b.type==="spread" ? <ImageSpread key={i} {...b} /> : null)}
          <SubseriesHeader title="To Drape an Idea — Clothing" blurb="Lines that trace the body; stories stitched into fabric." />
          {galleries["choreographing-intuition"].slice(1).map((b,i)=> b.type==="spread" ? <ImageSpread key={i} {...b} /> : null)}
        </section>
      )}

      {piece.slug === "the-raw-draft" && (
        <section className="pb-12">
          {galleries["the-raw-draft"].map((b,i)=> b.type==="masonry" ? <MasonryGallery key={i} {...b}/> : null)}
          <ProcessHighlight />
        </section>
      )}
    </main>
  );
}
