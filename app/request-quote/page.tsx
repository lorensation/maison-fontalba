import type { Metadata } from "next"
import QuoteRequestForm from "./quote-request-form"

export const metadata: Metadata = {
  title: "Request a Quote | Maison Fontalba",
  description: "Request a personalized quote for your design project from Maison Fontalba",
}

export default function RequestQuotePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Request a Quote</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Information */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Let's Discuss Your Project</h2>
            <p className="text-neutral-600 mb-8">
              We're excited to learn about your project. Please fill out the form with as much detail as possible, and
              we'll get back to you with a personalized quote tailored to your specific needs.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif mb-2">Our Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-neutral-700">
                  <li>Submit your project details through this form</li>
                  <li>We'll review your requirements and contact you within 48 hours</li>
                  <li>We'll schedule a consultation to discuss your project in detail</li>
                  <li>You'll receive a detailed proposal and quote</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-serif mb-2">Services We Offer</h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-700">
                  <li>Interior Design</li>
                  <li>Brand Identity</li>
                  <li>Digital Design</li>
                  <li>Custom Projects</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quote Request Form */}
          <div className="bg-primary-100 p-8">
            <h2 className="text-2xl font-serif mb-6">Your Project Details</h2>
            <QuoteRequestForm />
          </div>
        </div>
      </div>
    </div>
  )
}
