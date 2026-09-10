import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'nameMin')
    .max(80, 'nameMax'),
  email: z.string().email('emailInvalid').max(120, 'emailMax'),
  message: z.string().min(10, 'messageMin').max(2000, 'messageMax'),
});

export type ContactInput = z.infer<typeof contactSchema>;
