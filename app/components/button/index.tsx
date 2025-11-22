import { cn } from '@/app/lib/utils';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-[#FF4858] py-3 px-4 rounded-lg text-gray-50 flex justify-center items-center gap-2 hover:bg-[#E63946] transition-all disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
