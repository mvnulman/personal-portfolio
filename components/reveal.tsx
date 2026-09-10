'use client';

import { motion, type Variants } from 'motion/react';
import { type ReactNode } from 'react';

const variants: Record<
  string,
  Variants
> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 16, scale: 0.98, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  once = true,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'blur' | 'left' | 'right' | 'fade';
  once?: boolean;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12, margin: '0px 0px -48px 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}