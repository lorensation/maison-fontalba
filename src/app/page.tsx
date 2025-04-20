import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/container';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function Home() {
  // This data would normally come from Supabase
  const featuredProjects = [
    {
      id: '1',
      title: 'Residencia Moderna',
      summary: 'Diseño interior minimalista para una casa unifamiliar en Madrid',
      featured_image: '/images/project-1.jpg',
      category: 'Diseño de Interiores'
    },
    {
      id: '2',
      title: 'Branding Corporativo',
      summary: 'Desarrollo de identidad visual para empresa de tecnología',
      featured_image: '/images/project-2.jpg',
      category: 'Branding'
    },
    {
      id: '3',
      title: 'Oficina Ejecutiva',
      summary: 'Rediseño de espacios de trabajo para productividad y bienestar',
      featured_image: '/images/project-3.jpg',
      category: 'Diseño de Interiores'
    }
  ];

  const services = [
    {
      title: 'Diseño de Interiores',
      description: 'Transformamos espacios con un enfoque minimalista y funcional, creando ambientes elegantes que reflejan la personalidad de cada cliente.',
      icon: '/file.svg'
    },
    {
      title: 'Branding y Diseño Gráfico',
      description: 'Creamos identidades visuales coherentes y memorables, desde logos hasta materiales promocionales, comunicando la esencia de cada marca.',
      icon: '/globe.svg'
    },
    {
      title: 'Consultoría de Diseño',
      description: 'Asesoramos en decisiones estéticas y funcionales, aportando nuestra visión experta para optimizar resultados en proyectos de cualquier escala.',
      icon: '/window.svg'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src="/images/hero.jpg" 
              alt="Maison Fontalba - Diseño minimalista y elegante" 
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        </div>
        
        <Container className="z-10 relative">
          <div className="max-w-3xl text-white">
            <h1 className="mb-4">
              Diseño minimalista con elegancia intemporal
            </h1>
            <p className="text-xl mb-8">
              Maison Fontalba crea espacios e identidades visuales que combinan simplicidad, 
              sofisticación y funcionalidad para resultados que perduran.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button<typeof Link>
                as={Link}
                href="/portfolio"
                variant="primary"
                size="lg"
                className="text-center sm:text-left"
              >
                Ver nuestro trabajo
              </Button>

              <Button<typeof Link>
                as={Link}
                href="/contact"
                variant="outline"
                size="lg"
                className="text-center sm:text-left"
              >
                Contactar
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Proyectos Destacados</h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              Explora una selección de nuestros trabajos recientes, donde el diseño minimalista 
              se encuentra con la funcionalidad y la elegancia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.summary}
                imageSrc={project.featured_image}
                imageAlt={project.title}
                className="h-full"
              >
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-neutral">{project.category}</span>
                  <Link 
                    href={`/portfolio/${project.id}`}
                    className="text-sm font-medium text-neutral hover:underline"
                  >
                    Ver proyecto →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button<typeof Link>
              as={Link}
              href="/portfolio" 
              variant="outline"
            >
              Ver todos los proyectos
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-accent">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Nuestros Servicios</h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              Ofrecemos soluciones de diseño personalizadas para cada cliente, con un enfoque minimalista y atención meticulosa al detalle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-md shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted mb-6">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={24} 
                    height={24} 
                  />
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button<typeof Link>
              as={Link}
              href="/services" 
              variant="primary"
            >
              Más sobre nuestros servicios
            </Button>
          </div>
        </Container>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20">
        <Container size="md">
          <div className="text-center">
            <h2 className="mb-4">¿Tienes un proyecto en mente?</h2>
            <p className="text-lg mb-8 text-gray-600">
              Contáctanos para discutir cómo podemos ayudarte a crear un diseño que refleje tu visión y necesidades.
            </p>
            <Button<typeof Link>
              as={Link}
              href="/contact" 
              variant="primary"
            >
              Solicitar presupuesto
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
