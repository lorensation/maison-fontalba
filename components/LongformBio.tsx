  type Props = { body: string };
  export default function LongformBio({ body }: Props) {
    return (
      <article className="px-6 pb-24 mx-auto prose-narrow leading-7 text-[15px] md:text-base text-neutral-900">
        {body.split("\n\n").map((para, i)=>(<p key={i} className="mb-4">{para}</p>))}
      </article>
    );
  }
