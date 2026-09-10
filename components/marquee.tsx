import { cn } from '@/lib/utils';

export function Marquee({
  items,
  className,
  itemClassName,
  color = 'var(--ink-3)',
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  color?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div
      className={cn('overflow-hidden whitespace-nowrap', className)}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className={cn('mx-6 inline-flex items-center gap-3', itemClassName)}
            style={{ color }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}