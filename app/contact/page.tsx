/**
 * Contact Page
 * Description: Provides contact information and forms for general inquiries and quote requests
 */
import React from 'react';
import { Metadata } from 'next';
import Container from '@/components/ui/container';
import ContactForm from '@/components/features/forms/contact-form';
import QuoteRequestForm from '@/components/features/forms/quote-request-form';

export const metadata: Metadata = {
  title: 'Contacto | Maison Fontalba',
  description: 'Ponte en contacto con Maison Fontalba para consultas generales o para solicitar un presupuesto para tu próximo proyecto.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-accent py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Contacto</h1>
            <p className="text-lg text-gray-700">
              Estamos aquí para ayudarte con tu próximo proyecto. Ponte en contacto con nosotros para una consulta o solicita un presupuesto personalizado.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl mb-6">Información de Contacto</h2>
              <p className="text-gray-700 mb-8">
                Puedes ponerte en contacto con nosotros a través de los siguientes medios o utilizando los formularios de esta página. Estaremos encantados de atender tu consulta lo antes posible.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral">Correo Electrónico</h3>
                  <a 
                    href="mailto:contacto@maisonfontalba.com" 
                    className="text-gray-700 hover:text-neutral transition-colors"
                  >
                    contacto@maisonfontalba.com
                  </a>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-neutral">Teléfono</h3>
                  <a 
                    href="tel:+34600000000" 
                    className="text-gray-700 hover:text-neutral transition-colors"
                  >
                    +34 600 000 000
                  </a>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-neutral">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/company/maisonfontalba" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-neutral transition-colors"
                  >
                    linkedin.com/company/maisonfontalba
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral">Horario</h3>
                  <p className="text-gray-700">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Fines de semana: Cerrado
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl mb-6">Formulario de Contacto</h2>
              <p className="text-gray-700 mb-8">
                Usa este formulario para cualquier consulta general. Te responderemos a la mayor brevedad posible.
              </p>
              
              <ContactForm />
            </div>
          </div>
          
          <div className="bg-muted p-8 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl mb-6 text-center">Solicita un Presupuesto</h2>
              <p className="text-gray-700 mb-8 text-center">
                Si tienes un proyecto específico en mente, cuéntanos los detalles para prepararte un presupuesto personalizado.
              </p>
              
              <QuoteRequestForm />
            </div>
          </div>
        </Container>
      </section>
      
      {/* GDPR/Privacy Notice */}
      <section className="py-8 bg-gray-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm text-gray-500">
              Al enviar este formulario, aceptas nuestra <a href="/privacy-policy" className="text-neutral hover:underline">política de privacidad</a> y consientes el tratamiento de tus datos para responder a tu consulta. Tus datos no serán compartidos con terceros y puedes ejercer tus derechos de acceso, rectificación o eliminación en cualquier momento.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}