import type { Aula } from '@/content/aulas';
import { AulaDeliverablesSection } from './AulaDeliverablesSection';
import { AulaFaqSection } from './AulaFaqSection';
import { AulaFinalCta } from './AulaFinalCta';
import { AulaFooter } from './AulaFooter';
import { AulaForWhoSection } from './AulaForWhoSection';
import { AulaHero } from './AulaHero';
import { AulaHostSection } from './AulaHostSection';
import { AulaPainSection } from './AulaPainSection';
import { AulaStoriesSection } from './AulaStoriesSection';
import { AulaStickyBar } from './AulaStickyBar';

export function AulaPageContent({ aula }: { aula: Aula }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute left-10 top-20 h-96 w-96 animate-float rounded-full bg-yellow-400/10 blur-3xl" />
        <div
          className="absolute bottom-20 right-10 h-80 w-80 animate-float rounded-full bg-yellow-400/5 blur-3xl"
          style={{ animationDelay: '2s' }}
        />
      </div>
      <div className="relative z-10">
      <AulaStickyBar aula={aula} />
      <AulaHero aula={aula} />
      <AulaPainSection aula={aula} />
      <AulaDeliverablesSection aula={aula} />
      <AulaForWhoSection aula={aula} />
      <AulaHostSection aula={aula} />
      <AulaFaqSection aula={aula} />
      <AulaStoriesSection aula={aula} />
      <AulaFinalCta aula={aula} />
      <AulaFooter aula={aula} />
      </div>
    </main>
  );
}
