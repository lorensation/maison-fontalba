import type { Metadata } from "next"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Maison Fontalba",
  description: "Get in touch with Maison Fontalba for your design needs",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Contact Us</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
            <p className="text-neutral-600 mb-8">
              We'd love to hear from you. Whether you have a question about our services, want to discuss a potential
              project, or just want to say hello, we're here to help.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif mb-2">Email</h3>
                <a href="mailto:contact@maisonfontalba.com" className="text-primary-400 hover:underline">
                  contact@maisonfontalba.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-serif mb-2">Phone</h3>
                <a href="tel:+1234567890" className="text-primary-400 hover:underline">
                  +1 (234) 567-890
                </a>
              </div>

              <div>
                <h3 className="text-lg font-serif mb-2">LinkedIn</h3>
                <a
                  href="https://linkedin.com/company/maisonfontalba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:underline"
                >
                  linkedin.com/company/maisonfontalba
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-primary-100 p-8">
            <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
