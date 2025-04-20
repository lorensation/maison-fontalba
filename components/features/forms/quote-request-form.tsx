/**
 * QuoteRequestForm
 * Description: Form for requesting project quotes with detailed information
 */
"use client"

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Select from '@/components/ui/select';
import Button from '@/components/ui/button';
import { supabaseClient } from '@/lib/supabase';

// Form validation schema
const quoteFormSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Introduce un email válido'),
  phone: z.string().optional(),
  service_type: z.string().optional(),
  description: z.string().min(20, 'Por favor, describe tu proyecto con más detalle (mínimo 20 caracteres)'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar la política de privacidad',
  }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const serviceOptions = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'interior-design', label: 'Diseño de Interiores' },
  { value: 'branding', label: 'Branding y Diseño Gráfico' },
  { value: 'design-consulting', label: 'Consultoría de Diseño' },
  { value: 'other', label: 'Otro (especificar en descripción)' },
];

const budgetOptions = [
  { value: '', label: 'Selecciona un rango de presupuesto' },
  { value: 'less-than-5000', label: 'Menos de 5.000€' },
  { value: '5000-10000', label: '5.000€ - 10.000€' },
  { value: '10000-20000', label: '10.000€ - 20.000€' },
  { value: 'more-than-20000', label: 'Más de 20.000€' },
  { value: 'flexible', label: 'Flexible / Por determinar' },
];

const timelineOptions = [
  { value: '', label: 'Selecciona una línea temporal' },
  { value: 'urgent', label: 'Urgente (1-2 semanas)' },
  { value: 'short', label: 'Corto plazo (1-2 meses)' },
  { value: 'medium', label: 'Medio plazo (3-6 meses)' },
  { value: 'long', label: 'Largo plazo (+6 meses)' },
  { value: 'flexible', label: 'Flexible / Por determinar' },
];

const QuoteRequestForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service_type: '',
      description: '',
      budget: '',
      timeline: '',
      gdprConsent: false,
    },
  });

  const onSubmit: SubmitHandler<QuoteFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);

      // Insert quote request into Supabase table
      const { error } = await supabaseClient.from('quote_requests').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          service_type: data.service_type || null,
          description: data.description,
          budget: data.budget || null,
          timeline: data.timeline || null,
          is_read: false,
        },
      ]);

      if (error) throw new Error(error.message);

      setSubmitResult({
        success: true,
        message: 'Tu solicitud de presupuesto ha sido enviada. Nos pondremos en contacto contigo pronto con una propuesta personalizada.',
      });

      // Reset the form on success
      reset();
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitResult({
        success: false,
        message:
          'Ha ocurrido un error al enviar la solicitud. Por favor, inténtalo de nuevo o contáctanos directamente por correo electrónico.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitResult && (
        <div
          className={`p-4 rounded-md ${
            submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          id="name"
          placeholder="Tu nombre"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="tu@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Teléfono (opcional)"
          id="phone"
          type="tel"
          placeholder="+34 600 000 000"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Select
          label="Tipo de servicio"
          id="service_type"
          placeholder="Selecciona un servicio"
          options={serviceOptions}
          error={errors.service_type?.message}
          {...register('service_type')}
        />
      </div>

      <Textarea
        label="Descripción del proyecto"
        id="description"
        placeholder="Cuéntanos en detalle sobre tu proyecto, objetivos, requisitos y cualquier idea específica que tengas."
        rows={6}
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Presupuesto estimado (opcional)"
          id="budget"
          options={budgetOptions}
          error={errors.budget?.message}
          {...register('budget')}
        />

        <Select
          label="Línea temporal (opcional)"
          id="timeline"
          options={timelineOptions}
          error={errors.timeline?.message}
          {...register('timeline')}
        />
      </div>

      {/* GDPR Consent Checkbox */}
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="gdprConsent"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-neutral focus:ring-neutral/50"
            {...register('gdprConsent')}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="gdprConsent" className="text-sm text-gray-600">
            Acepto la{' '}
            <a href="/privacy-policy" className="text-neutral hover:underline">
              política de privacidad
            </a>{' '}
            y el tratamiento de mis datos.
          </label>
          {errors.gdprConsent && (
            <p className="mt-1 text-xs text-red-600">{errors.gdprConsent.message}</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Solicitar presupuesto'}
        </Button>
      </div>
    </form>
  );
};

export default QuoteRequestForm;