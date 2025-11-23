'use client';

import { z } from 'zod';
import { SectionTitle } from '../section-title';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../button';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { fadeUpAnimation } from '@/app/lib/animations';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().email('E-mail inválido'),
  message: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .max(500, 'Mensagem deve ter no máximo 500 caracteres'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data);
      toast.success('Mensagem enviada com sucesso!');
      reset();
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
    }
  };

  return (
    <section
      className="py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950"
      id="contact"
    >
      <div className="w-full max-w-[420px] mx-auto">
        <SectionTitle
          subtitle="contato"
          title="Vamos trabalhar juntos? Entre em contato"
          className="items-center text-center"
        />
        <form
          className="mt-12 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div {...fadeUpAnimation}>
            <input
              placeholder="Nome"
              className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-[#FF4858]"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.name.message}
              </span>
            )}
          </motion.div>
          <motion.div {...fadeUpAnimation}>
            <input
              placeholder="E-mail"
              type="email"
              className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-[#FF4858]"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.email.message}
              </span>
            )}
          </motion.div>
          <motion.div {...fadeUpAnimation}>
            <textarea
              placeholder="Mensagem"
              className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-[#FF4858]"
              {...register('message')}
              maxLength={500}
            />
            {errors.message && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.message.message}
              </span>
            )}
          </motion.div>

          <motion.div {...fadeUpAnimation}>
            <div className="relative w-max mx-auto mt-6">
              <Button className="z-[2] relative" disabled={isSubmitting}>
                Enviar mensagem
                <HiArrowNarrowRight size={18} />
              </Button>
              <div className="absolute inset-0 bg-[#FF4858] blur-2xl opacity-20" />
            </div>
          </motion.div>
        </form>
      </div>
    </section>
  );
};
