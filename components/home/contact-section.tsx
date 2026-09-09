'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { socials } from '@/config/site';
import { PenArrow, SectionTopic } from '@/components/pen-arrow';
import { SocialIcon } from '@/components/social-icon';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';

export function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const msg = (key?: string) => {
    if (!key) return '';
    return t(key as never);
  };

  const onSubmit = async (data: ContactInput) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      reset({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--line-strong)',
    padding: '12px 0',
    fontSize: 17,
    color: 'var(--ink)',
  };

  return (
    <section
      id="contact"
      className="wrap"
      style={{ paddingBlock: 96, paddingTop: 64 }}
    >
      <SectionTopic label={t('title').replace('\n', ' ')} />
      <h2 className="display" style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}>
        {t('title').split('\n').map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h2>
      <p style={{ color: 'var(--ink-2)', marginTop: 16, maxWidth: 480 }}>
        {t('note')}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
          gap: 64,
          marginTop: 48,
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="label"
                style={{
                  color: 'var(--ink-2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ display: 'inline-flex', color: 'var(--accent)' }}>
                  <SocialIcon icon={s.icon} size={18} />
                </span>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="contact-name" className="label" style={{ color: 'var(--ink-3)' }}>
              {t('name')}
            </label>
            <input
              id="contact-name"
              type="text"
              {...register('name')}
              placeholder={t('namePlaceholder')}
              style={fieldStyle}
            />
            {errors.name && (
              <p style={{ color: 'var(--warm)', fontSize: 13, marginTop: 6 }}>
                {msg(errors.name.message)}
              </p>
            )}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="contact-email" className="label" style={{ color: 'var(--ink-3)' }}>
              {t('emailLabel')}
            </label>
            <input
              id="contact-email"
              type="email"
              {...register('email')}
              placeholder={t('emailPlaceholder')}
              style={fieldStyle}
            />
            {errors.email && (
              <p style={{ color: 'var(--warm)', fontSize: 13, marginTop: 6 }}>
                {msg(errors.email.message)}
              </p>
            )}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="contact-message" className="label" style={{ color: 'var(--ink-3)' }}>
              {t('message')}
            </label>
            <textarea
              id="contact-message"
              rows={4}
              {...register('message')}
              placeholder={t('messagePlaceholder')}
              style={{ ...fieldStyle, resize: 'vertical' }}
            />
            {errors.message && (
              <p style={{ color: 'var(--warm)', fontSize: 13, marginTop: 6 }}>
                {msg(errors.message.message)}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            {status === 'loading' ? '...' : t('send')}
            <PenArrow />
          </button>
          {status === 'done' && (
            <p className="label" style={{ marginTop: 16, color: 'var(--accent)' }}>
              {t('sent')}
            </p>
          )}
          {status === 'error' && (
            <p className="label" style={{ marginTop: 16, color: 'var(--warm)' }}>
              {t('error')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}