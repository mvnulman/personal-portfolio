import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = process.env.YOUR_EMAIL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = bodySchema.parse(body);

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.trim() === '') {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      return NextResponse.json({
        message: 'Mensagem enviada com sucesso! (simulado - email não configurado)',
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [YOUR_EMAIL],
      subject: `Nova mensagem de contato - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nova mensagem de contato</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            Esta mensagem foi enviada através do formulário de contato do seu portfólio.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return NextResponse.json({
      message: 'Mensagem enviada com sucesso!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
