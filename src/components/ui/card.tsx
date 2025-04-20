"use client";

/**
 * Card
 * Description: A reusable card component for displaying content with optional image
 */
import React from 'react';
import Image from 'next/image';

interface CardProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  className?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = 'Card image',
  className = '',
  children,
  onClick,
  hoverEffect = true,
}) => {
  return (
    <div 
      className={`
        bg-primary rounded-md overflow-hidden shadow-sm
        ${hoverEffect ? 'hover:shadow-md transition-shadow duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {imageSrc && (
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        {title && <h3 className="text-xl font-medium text-neutral mb-2">{title}</h3>}
        {description && <p className="text-gray-700">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;