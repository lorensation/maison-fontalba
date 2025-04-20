/**
 * Footer
 * Description: Site footer with contact information and navigation links
 */
import React from 'react';
import Link from 'next/link';
import Container from '../../ui/container';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-gray-800">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-serif tracking-wider text-neutral mb-4">MAISON FONTALBA</h3>
              <p className="text-sm mt-2">
                Diseño minimalista y elegante para proyectos que destacan por su refinamiento y atención al detalle.
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Navegación</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm hover:text-neutral transition-colors">Inicio</Link></li>
                <li><Link href="/portfolio" className="text-sm hover:text-neutral transition-colors">Portafolio</Link></li>
                <li><Link href="/services" className="text-sm hover:text-neutral transition-colors">Servicios</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-neutral transition-colors">Contacto</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-sm hover:text-neutral transition-colors">Política de privacidad</Link></li>
                <li><Link href="/terms-of-service" className="text-sm hover:text-neutral transition-colors">Términos de servicio</Link></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <a href="mailto:contacto@maisonfontalba.com" className="text-sm hover:text-neutral transition-colors">
                    contacto@maisonfontalba.com
                  </a>
                </li>
                <li className="flex items-center">
                  <a href="tel:+34600000000" className="text-sm hover:text-neutral transition-colors">
                    +34 600 000 000
                  </a>
                </li>
                <li className="flex items-center">
                  <a 
                    href="https://www.linkedin.com/company/maisonfontalba" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm hover:text-neutral transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-300 mt-8 pt-8">
            <p className="text-sm text-center">
              © {currentYear} Maison Fontalba. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;