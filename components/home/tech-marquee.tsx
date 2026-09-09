import { skills } from '@/data/profile';
import { Marquee } from '@/components/marquee';
import { Reveal } from '@/components/reveal';

export function TechMarquee() {
  const items = skills.map((s) => s.name);
  return (
    <section
      className="wrap"
      style={{ paddingBlock: 32, borderBottom: '1px solid var(--line)' }}
    >
      <Reveal variant="fade">
        <Marquee
          items={items}
          className="display"
          itemClassName="text-2xl md:text-4xl font-bold tracking-tight uppercase"
          // text apagado estilo marca d'água
        />
      </Reveal>
    </section>
  );
}