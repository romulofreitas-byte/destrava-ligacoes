'use client';

import { useEffect, useState } from 'react';
import { isWorkshopSalesOpen } from '@/lib/constants';

/** Vendas abertas só até o fim da Black Friday. Atualiza se a página ficar aberta na virada. */
export function useWorkshopSalesOpen(): boolean {
  const [open, setOpen] = useState(() => isWorkshopSalesOpen());

  useEffect(() => {
    const tick = () => setOpen(isWorkshopSalesOpen());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return open;
}
