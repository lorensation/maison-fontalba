/**
 * ContactForm
 * Description: Form for general inquiries with validation and submission handling
 */
"use client"

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { supabaseClient } from '@/lib/supabase';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Introduce un email válido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar la política de privacidad',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
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
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      gdprConsent: false,
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);

      // Insert message into Supabase table
      const { error } = await supabaseClient.from('contact_messages').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
          is_read: false,
        },
      ]);

      if (error) throw new Error(error.message);

      setSubmitResult({
        success: true,
        message: 'Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.',
      });

      // Reset the form on success
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitResult({
        success: false,
        message:
          'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente por correo electrónico.',
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

      <Input
        label="Teléfono (opcional)"
        id="phone"
        type="tel"
        placeholder="+34 600 000 000"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Textarea
        label="Mensaje"
        id="message"
        placeholder="¿En qué podemos ayudarte?"
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

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
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;