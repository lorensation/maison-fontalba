/**
 * ProjectGallery
 * Description: Interactive image gallery for project detail pages with lightbox view
 */
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
  };

  const closeLightbox = () => {
    setCurrentImage(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImage === null) return;
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : (prev || 0) + 1));
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImage === null) return;
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : (prev || 0) - 1));
  };

  // Slideshow settings
  const slideProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    autoplay: false,
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-md">
        <p className="text-gray-500">No hay imágenes disponibles para este proyecto.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main gallery view */}
      <div className="mb-8">
        <Slide {...slideProperties}>
          {images.map((image, index) => (
            <div key={index} className="each-slide relative h-[500px]">
              <div 
                className="relative w-full h-full cursor-pointer" 
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={`${title} - Imagen ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>

      {/* Thumbnail navigation */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`
              relative h-20 cursor-pointer border-2 rounded overflow-hidden
              ${currentImage === index ? 'border-neutral' : 'border-transparent'}
            `}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 16vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {currentImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl p-2"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <button 
              onClick={goToPrev}
              className="absolute left-4 text-white text-4xl p-2 z-10"
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="relative w-full h-full max-w-6xl max-h-[80vh] px-16 flex items-center justify-center">
              <Image
                src={images[currentImage]}
                alt={`${title} - Imagen ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button 
              onClick={goToNext}
              className="absolute right-4 text-white text-4xl p-2 z-10"
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-white text-center mt-4">
            <p className="text-sm">{currentImage + 1} de {images.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;