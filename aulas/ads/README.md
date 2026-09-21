# Ads Meta — aula 21/09

Campanha no ar até segunda 20:00. Só base quente. Verba lifetime R$ 400.

## No ar

- Conta: `act_7040341619402211` (BM - Rômulo Freitas)
- Campanha: `AULA | Lead antigo | 21/09` · `120256030617530311`
- Ads Manager: https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=7040341619402211&selected_campaign_ids=120256030617530311
- Pixel: `687023637552068` (WORKSHOP DSL 001)
- Página: Rômulo Freitas Pódium · Instagram `17841401330097000`
- Conjunto IG: Engajamento Instagram 365D
- Conjunto vídeo: [RMK][VIDEO50][30D]
- 6 anúncios estáticos (3 textos × 2 conjuntos)
- Encerra sozinha 21/09 20:00

## Arquivos

- [roteiros.md](roteiros.md) — 3 takes de 20s. Grave o A se for um só.
- [copy.md](copy.md) / [copy.json](copy.json) — textos dos anúncios
- [../organico-lead-antigo.md](../organico-lead-antigo.md) — Circle, WhatsApp, stories
- [create-campaign.mjs](create-campaign.mjs) — API
- `creatives/romulo-mentor-destrava.jpg` — estático no ar
- `creatives/aula-lead-antigo.mp4` — cole o vídeo aqui se for gravar ainda

## Comandos

Token em `ads/.env` (não commitar). Modelo: [env.example](env.example).

```bash
cd ads
node create-campaign.mjs --discover
node create-campaign.mjs
node create-campaign.mjs --activate
```

Vídeo depois: colar o mp4 e `node create-campaign.mjs --video` cria outra campanha PAUSED. Prefira subir o vídeo no Ads Manager, no anúncio que já está rodando.

Depois da aula, revogar o token no Graph API Explorer.
