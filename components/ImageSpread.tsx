  import Image from "next/image";
  import type { SpreadBlock } from "@/lib/data/pieces";

  export default function ImageSpread({ images, layout, caption }: SpreadBlock) {
    if (layout === "diptych") {
      return (
        <section className="px-2 md:px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          {images.map((im, i)=>(
            <div key={i} className="relative aspect-[4/3]">
              <Image src={im.src} alt={im.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
          {caption && <p className="col-span-full text-xs text-neutral-600 px-4">{caption}</p>}
        </section>
      );
    }
    return (
      <section className="w-full py-6">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" priority sizes="100vw" />
        </div>
        {caption && <p className="text-xs text-neutral-600 px-6 mt-2">{caption}</p>}
      </section>
    );
  }
