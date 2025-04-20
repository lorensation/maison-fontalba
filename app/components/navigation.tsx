"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-primary-50 border-b border-primary-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Maison Fontalba" width={40} height={40} className="mr-2" />
          <span className="text-xl font-serif text-primary-400">Maison Fontalba</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/portfolio" className="text-neutral-700 hover:text-primary-400 transition-colors">
            Portfolio
          </Link>
          <Link href="/contact" className="text-neutral-700 hover:text-primary-400 transition-colors">
            Contact
          </Link>
          <Link
            href="/request-quote"
            className="px-4 py-2 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors rounded-sm"
          >
            Request Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-50 py-4 px-4 border-t border-primary-100">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/portfolio"
              className="text-neutral-700 hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="text-neutral-700 hover:text-primary-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/request-quote"
              className="px-4 py-2 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors rounded-sm inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
