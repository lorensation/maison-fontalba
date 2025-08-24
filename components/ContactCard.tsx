  import { contact } from "@/lib/data/pieces";
  export default function ContactCard() {
    return (
      <section className="px-6 py-16 text-center">
        <blockquote className="italic text-neutral-700">“{contact.closingQuote}”</blockquote>
        <div className="mt-4 space-y-1 text-sm">
          {contact.emails.map((e,i)=>(<div key={i}><a className="underline" href={`mailto:${e}`}>{e}</a></div>))}
          <div><a className="underline" href={`tel:${contact.phone}`}>{contact.phone}</a></div>
        </div>
      </section>
    );
  }
