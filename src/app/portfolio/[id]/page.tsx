/**
 * Project Detail Page
 * Description: Displays detailed information about a single project with image gallery
 */
import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/container';
import Button from '@/components/ui/button';
import { createServerSupabaseClient } from '@/lib/supabase';
import ProjectGallery from '@/components/features/projects/project-gallery';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

// Dynamic metadata based on the project
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const supabase = await createServerSupabaseClient();
  
  const { data: project } = await supabase
    .from('projects')
    .select('title, summary')
    .eq('id', params.id)
    .single();
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado | Maison Fontalba',
      description: 'El proyecto solicitado no existe o ha sido eliminado.',
    };
  }
  
  return {
    title: `${project.title} | Maison Fontalba`,
    description: project.summary,
  };
}

// Generate static paths for all projects
export async function generateStaticParams() {
    const supabase = await createServerSupabaseClient();

    const { data: projects } = await supabase
        .from('projects')
        .select('id')
        .eq('is_published', true);
  
    interface ProjectRow {
        id: string;
    }

    return (projects as ProjectRow[] || []).map((project: ProjectRow) => ({
        id: project.id,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const supabase = await createServerSupabaseClient();
  
  const { data: project } = await supabase
    .from('projects')
    .select('*, categories(name)')
    .eq('id', params.id)
    .eq('is_published', true)
    .single();
  
  // If project doesn't exist or is not published, return 404
  if (!project) {
    notFound();
  }
  
  return (
    <>
      {/* Project hero section with featured image */}
      <section className="relative h-80 md:h-96 lg:h-[500px]">
        <Image 
          src={project.featured_image} 
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <Container className="relative h-full flex flex-col justify-end pb-12 z-10">
          <div className="text-white max-w-3xl">
            <h1 className="mb-2">{project.title}</h1>
            {project.categories && (
              <p className="text-lg font-light">{project.categories.name}</p>
            )}
          </div>
        </Container>
      </section>
      
      {/* Project details section */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Project description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl mb-4">Sobre el proyecto</h2>
              <div className="prose max-w-none">
                {/* Split description by paragraphs for better readability */}
                {project.description.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Project sidebar information */}
            <div className="lg:col-span-1">
              <div className="bg-accent p-6 rounded-md">
                <h3 className="text-xl mb-4">Información del proyecto</h3>
                
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-medium text-neutral">Categoría</h4>
                    <p>{project.categories?.name || 'Sin categoría'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-neutral">Fecha</h4>
                    <p>{new Date(project.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'
                    })}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  {project.quote_url && (
                    <Button<typeof Link> 
                      as={Link}
                      href={project.quote_url}
                      variant="primary"
                      fullWidth
                    >
                      Solicitar presupuesto similar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Image gallery */}
      <section className="py-12 bg-primary">
        <Container>
          <h2 className="text-2xl mb-8 text-center">Galería del proyecto</h2>
          <ProjectGallery images={project.images} title={project.title} />
        </Container>
      </section>
      
      {/* Related projects CTA */}
      <section className="py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl mb-4">¿Te ha gustado este proyecto?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Explora más trabajos de Maison Fontalba o contacta con nosotros para discutir tu próximo proyecto.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button<typeof Link> 
                as={Link}
                href="/portfolio"
                variant="outline"
              >
                Ver más proyectos
              </Button>
              <Button<typeof Link> 
                as={Link}
                href="/contact" 
                variant="primary"
              >
                Contactar
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}