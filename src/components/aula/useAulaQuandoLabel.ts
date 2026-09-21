'use client';

import { useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { getAulaQuandoLabel } from '@/content/aulas';

export function useAulaQuandoLabel(aula: Aula): string {
  const [label, setLabel] = useState(() => getAulaQuandoLabel(aula));

  useEffect(() => {
    const sync = () => setLabel(getAulaQuandoLabel(aula));
    sync();
    const id = window.setInterval(sync, 15_000);
    return () => window.clearInterval(id);
  }, [aula]);

  return label;
}
