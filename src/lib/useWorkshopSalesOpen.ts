'use client';

import { useEffect, useState } from 'react';
import { isWorkshopSalesOpen } from '@/lib/constants';

/** Vendas fechadas enquanto não houver checkout de R$ 897. */
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
