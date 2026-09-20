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
      <div className="relative z-10 flex flex-col pb-24 lg:pb-0">
      <AulaStickyBar aula={aula} />
      <div className="order-1">
        <AulaHero aula={aula} />
      </div>
      <div className="order-2 lg:order-6">
        <AulaStoriesSection aula={aula} />
      </div>
      <div className="order-3 lg:order-2">
        <AulaPainSection aula={aula} />
      </div>
      <div className="order-4 lg:order-3">
        <AulaDeliverablesSection aula={aula} />
      </div>
      <div className="order-5 lg:order-4">
        <AulaForWhoSection aula={aula} />
      </div>
      <div className="order-6 lg:order-5">
        <AulaHostSection aula={aula} />
      </div>
      <div className="order-7">
        <AulaFaqSection aula={aula} />
      </div>
      <div className="order-8">
        <AulaFinalCta aula={aula} />
      </div>
      <div className="order-9">
        <AulaFooter aula={aula} />
      </div>
      </div>
    </main>
  );
}
