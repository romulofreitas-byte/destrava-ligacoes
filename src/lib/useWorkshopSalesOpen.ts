'use client';

import { useEffect, useState } from 'react';
import { isWorkshopSalesOpen } from '@/lib/constants';

/** Vendas abertas enquanto o primeiro lote não tiver data de virada. */
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
