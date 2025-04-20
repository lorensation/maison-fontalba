import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-neutral-800">
                Elegant Design <span className="text-primary-400">Solutions</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
                Maison Fontalba creates minimalist, sophisticated designs that elevate your brand and space. Our
                attention to detail and commitment to elegance define our approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors text-center"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/request-quote"
                  className="px-6 py-3 border border-primary-300 text-neutral-800 hover:bg-primary-100 transition-colors text-center"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/serene-living-space.png"
                alt="Maison Fontalba Design"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-primary-100 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-8">
              <h3 className="text-xl font-serif mb-4">Interior Design</h3>
              <p className="text-neutral-600 mb-4">
                Transforming spaces with our signature minimalist aesthetic, creating environments that are both
                functional and beautiful.
              </p>
              <Link href="/portfolio?category=interior" className="text-primary-400 hover:underline">
                View Projects →
              </Link>
            </div>
            <div className="bg-primary-50 p-8">
              <h3 className="text-xl font-serif mb-4">Brand Identity</h3>
              <p className="text-neutral-600 mb-4">
                Crafting distinctive visual identities that communicate your brand's essence with elegance and clarity.
              </p>
              <Link href="/portfolio?category=branding" className="text-primary-400 hover:underline">
                View Projects →
              </Link>
            </div>
            <div className="bg-primary-50 p-8">
              <h3 className="text-xl font-serif mb-4">Digital Design</h3>
              <p className="text-neutral-600 mb-4">
                Creating sophisticated digital experiences that elevate your online presence with our minimalist
                approach.
              </p>
              <Link href="/portfolio?category=digital" className="text-primary-400 hover:underline">
                View Projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group">
              <div className="relative h-[300px] mb-4 overflow-hidden">
                <Image
                  src="/styles/minimalist.jpg"
                  alt="Project 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">Serene Living Space</h3>
              <p className="text-neutral-600 mb-3">Interior Design</p>
              <Link href="/portfolio/project-1" className="text-primary-400 hover:underline">
                View Project →
              </Link>
            </div>

            {/* Project 2 */}
            <div className="group">
              <div className="relative h-[300px] mb-4 overflow-hidden">
                <Image
                  src="/refined-monogram-stationery.png"
                  alt="Project 2"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">Artisan Brand Identity</h3>
              <p className="text-neutral-600 mb-3">Brand Design</p>
              <Link href="/portfolio/project-2" className="text-primary-400 hover:underline">
                View Project →
              </Link>
            </div>

            {/* Project 3 */}
            <div className="group">
              <div className="relative h-[300px] mb-4 overflow-hidden">
                <Image
                  src="/clean-portfolio-layout.png"
                  alt="Project 3"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">Luxury E-commerce</h3>
              <p className="text-neutral-600 mb-3">Digital Design</p>
              <Link href="/portfolio/project-3" className="text-primary-400 hover:underline">
                View Project →
              </Link>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="px-6 py-3 border border-primary-300 text-neutral-800 hover:bg-primary-100 transition-colors inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-primary-200 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Client Testimonials</h2>
          <blockquote className="text-xl md:text-2xl font-serif text-neutral-700 mb-8 italic">
            "Maison Fontalba transformed our space with their elegant, minimalist approach. Their attention to detail
            and understanding of our needs exceeded our expectations."
          </blockquote>
          <p className="text-neutral-600">— Claire Laurent, Residential Client</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how Maison Fontalba can bring your vision to life with our signature elegant,
            minimalist approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/request-quote"
              className="px-6 py-3 border border-primary-300 text-neutral-800 hover:bg-primary-100 transition-colors text-center"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
