'use client';

import { Lottie } from 'lottie-react';
import animation from '@/assets/code.json';

export function CodeLottie() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 820,
        // Mantém a paleta original da animação, sem filtrar por tema
        filter: 'none',
      }}
    >
      <Lottie
        src={animation}
        loop
        autoplay
        style={{ width: '100%', height: 'auto', mixBlendMode: 'screen' }}
      />
    </div>
  );
}