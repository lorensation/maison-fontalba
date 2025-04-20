/**
 * Portfolio Page
 * Description: Displays all projects with filtering options by category
 */
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/container';
import Card from '@/components/ui/card';
import { createServerSupabaseClient } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Portafolio | Maison Fontalba',
  description: 'Explora nuestros proyectos de diseño minimalista y elegante en el portafolio de Maison Fontalba.',
};

// This function will be called during SSR
export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();
  
  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');
  
  // Return all possible category parameters for static generation
  return (categories || []).map((category) => ({
    category: category.id,
  }));
}

interface PortfolioPageProps {
  searchParams: { category?: string };
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { category } = searchParams;
  
  const supabase = createServerSupabaseClient();
  
  // Fetch categories for the filter
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');
  
  // Fetch projects with filter if category is specified
  let projectsQuery = supabase
    .from('projects')
    .select('*, categories(name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  
  if (category) {
    projectsQuery = projectsQuery.eq('category_id', category);
  }
  
  const { data: projects } = await projectsQuery;
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-accent py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Nuestro Portafolio</h1>
            <p className="text-lg text-gray-700 mb-8">
              Descubre nuestros proyectos de diseño, donde la elegancia minimalista
              se combina con la funcionalidad para crear experiencias excepcionales.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Portfolio Filters & Grid */}
      <section className="py-16">
        <Container>
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center mb-12 gap-2">
            <Link
              href="/portfolio"
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !category ? 'bg-neutral text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Todos
            </Link>
            
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/portfolio?category=${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  category === cat.id ? 'bg-neutral text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          
          {/* Projects Grid */}
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  title={project.title}
                  description={project.summary}
                  imageSrc={project.featured_image}
                  imageAlt={project.title}
                  className="h-full"
                >
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-neutral">{project.categories?.name}</span>
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No hay proyectos disponibles</h3>
              <p className="text-gray-600">
                {category 
                  ? 'No se encontraron proyectos en esta categoría.' 
                  : 'No hay proyectos disponibles en este momento.'
                }
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}