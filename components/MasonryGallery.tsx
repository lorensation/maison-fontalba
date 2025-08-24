  import Image from "next/image";
  import type { MasonryBlock } from "@/lib/data/pieces";

  export default function MasonryGallery({ images }: MasonryBlock) {
    return (
      <section className="px-2 md:px-6 py-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-4 [column-fill:_balance]">
          {images.map((im,i)=>(
            <div key={i} className="mb-2 md:mb-4 break-inside-avoid">
              <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                <Image src={im.src} alt={im.alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
