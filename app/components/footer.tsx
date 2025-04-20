import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="Maison Fontalba" width={40} height={40} className="mr-2" />
              <span className="text-xl font-serif text-primary-400">Maison Fontalba</span>
            </Link>
            <p className="text-neutral-700 mb-4">Elegant, minimalist design solutions for discerning clients.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif text-neutral-800 mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/portfolio" className="text-neutral-700 hover:text-primary-400 transition-colors">
                Portfolio
              </Link>
              <Link href="/contact" className="text-neutral-700 hover:text-primary-400 transition-colors">
                Contact
              </Link>
              <Link href="/request-quote" className="text-neutral-700 hover:text-primary-400 transition-colors">
                Request Quote
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-serif text-neutral-800 mb-4">Contact Us</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:contact@maisonfontalba.com"
                className="flex items-center text-neutral-700 hover:text-primary-400 transition-colors"
              >
                <Mail size={18} className="mr-2" />
                contact@maisonfontalba.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center text-neutral-700 hover:text-primary-400 transition-colors"
              >
                <Phone size={18} className="mr-2" />
                +1 (234) 567-890
              </a>
              <a
                href="https://linkedin.com/company/maisonfontalba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-neutral-700 hover:text-primary-400 transition-colors"
              >
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-200 mt-8 pt-8 text-center text-neutral-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Maison Fontalba. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
