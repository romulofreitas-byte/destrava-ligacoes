# Prompt para Cursor — Instalar Meta Pixel no site do Workshop

Cole este prompt no Cursor, no repositório `destrava-ligacoes`. O Pixel já está sendo criado manualmente via API da Meta pelo Rômulo — este prompt cobre só a instalação/instrumentação no código, não a criação do Pixel em si.

---

## Contexto

- Stack: Next.js App Router.
- Fluxo de compra: o site do Workshop redireciona para checkout (Stripe, conforme configuração já existente do ecossistema Mundo Pódium — confirmar se o Workshop usa link de checkout direto ou API de criação de sessão).
- O banner de cookies do site já menciona explicitamente "tecnologias de marketing (incluindo Meta Pixel)" — ou seja, o Pixel só deve disparar depois que o usuário aceitar cookies não-essenciais, para manter compliance com o que já está prometido no banner.

## 1. Variável de ambiente

Adicionar ao `.env.local` / Vercel:
```
NEXT_PUBLIC_META_PIXEL_ID=<ID fornecido pelo Rômulo após criação via API>
```

## 2. Componente base do Pixel (PageView)

Criar `src/components/analytics/MetaPixel.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel({ consentGranted }: { consentGranted: boolean }) {
  useEffect(() => {
    if (consentGranted && PIXEL_ID && typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [consentGranted]);

  if (!consentGranted || !PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
```

## 3. Ligar ao banner de cookies existente

Localizar o componente do banner de cookies atual (o que exibe "Aceitar Todos / Rejeitar / Personalizar") e:
- Armazenar a escolha do usuário (localStorage ou cookie, ex.: `cookie_consent_marketing: true/false`).
- Renderizar `<MetaPixel consentGranted={...} />` no layout raiz (`src/app/layout.tsx`), passando o valor do consentimento.
- Se o usuário rejeitar ou não tiver decidido ainda, o Pixel não deve carregar. Se aceitar depois de já estar na página, o Pixel deve carregar nesse momento (sem precisar recarregar a página).

## 4. Evento InitiateCheckout

No botão/CTA "Garantir vaga" (`HeroSectionWorkshop.tsx` e `FinalCTAWorkshopSection.tsx` — os dois pontos de CTA principal), disparar o evento antes do redirecionamento para o checkout:

```tsx
const handleCheckoutClick = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      content_name: "Workshop Destrava Ligações",
      value: 897,
      currency: "BRL",
    });
  }
  // manter o comportamento de redirecionamento/navegação já existente aqui
};
```

Aplicar esse handler no `onClick` de cada botão de CTA, sem alterar o destino do link/redirecionamento atual.

## 5. Evento Purchase — recomendação de arquitetura

**Importante:** disparar `Purchase` só no client-side (ex. numa página de "obrigado" pós-checkout) é frágil — bloqueadores de anúncio, navegação cross-domain pro Stripe e retorno perdem uma fração real das conversões. A prática recomendada é:

- **Se o checkout for hospedado (Stripe Checkout redirecionando de volta para uma URL de sucesso no site):** disparar `Purchase` client-side nessa página de sucesso, incluindo `value` e `currency`, **e também via Conversions API (server-side)** a partir do webhook do Stripe (`checkout.session.completed`), para não depender só do client-side.
- **Configurar deduplicação:** usar o mesmo `event_id` no disparo client-side e no server-side (Conversions API), conforme a documentação da Meta, para o Pixel não contar a mesma compra duas vezes.

Isso é mais robusto de implementar depois de confirmar exatamente como o checkout do Workshop está configurado hoje (link direto do Stripe vs. sessão criada via API). Se precisar, sinalizar essa dúvida antes de implementar o Purchase — não é bloqueante para subir o PageView e o InitiateCheckout primeiro.

## 6. Teste

- Instalar a extensão "Meta Pixel Helper" no Chrome e verificar se o PageView dispara ao carregar a página (só depois de aceitar cookies).
- Verificar no Gerenciador de Eventos da Meta (Events Manager) se os eventos `PageView` e `InitiateCheckout` chegam em tempo real ao clicar no CTA.
- Testar o fluxo completo de consentimento: rejeitar cookies → confirmar que nenhum evento dispara → aceitar → confirmar que passa a disparar.

## Checklist

- [ ] `NEXT_PUBLIC_META_PIXEL_ID` configurado no ambiente
- [ ] Componente `MetaPixel.tsx` criado e plugado no `layout.tsx`
- [ ] Pixel só carrega após consentimento de cookies de marketing (ligado ao banner existente)
- [ ] Evento `InitiateCheckout` disparando nos dois CTAs principais (hero e CTA final)
- [ ] Decisão tomada sobre arquitetura do `Purchase` (client-side simples vs. client + Conversions API via webhook do Stripe)
- [ ] Testado com Meta Pixel Helper e confirmado no Events Manager
- [ ] QA do fluxo de consentimento (rejeitar → nada dispara; aceitar → dispara)
