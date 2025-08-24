  import Image from "next/image";
  export default function ProcessHighlight() {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-[21/9]">
            <Image src="/pieces/piece-5/01.jpg" alt="Designing Through Model Making" fill className="object-cover" />
          </div>
          <h3 className="mt-4 text-center text-sm tracking-wider uppercase">Designing Through Model Making</h3>
        </div>
      </section>
    );
  }
