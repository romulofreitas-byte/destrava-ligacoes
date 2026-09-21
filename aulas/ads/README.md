# Ads Meta — aula 21/09 | vídeo

Campanha nova: só vídeo, base quente, R$ 300/dia, encerra 21/09 20:30. Sem público frio.

A campanha estática de ontem (`120256030617530311`) pausa na hora de ligar a de vídeo. A foto do Rômulo vira só miniatura do player.

## Arquivos

- [copy.md](copy.md) / [copy.json](copy.json) — 5 copies × 2 vídeos
- [create-campaign.mjs](create-campaign.mjs) — API
- `creatives/videos aula 21-09/ad-25s-safezone.mp4` (22s)
- `creatives/videos aula 21-09/ad-54s-safezone.mp4` (54s)
- `creatives/romulo-mentor-destrava.jpg` — thumb

## Comandos

Token em `ads/.env` (não commitar). Precisa ser **válido** (Graph API Explorer, permissões `ads_management`, `ads_read`, `business_management`). Modelo: [env.example](env.example).

```bash
cd ads
node create-campaign.mjs --discover
node create-campaign.mjs
```

Revisar no Ads Manager e ligar (isso também pausa a campanha estática):

```bash
node create-campaign.mjs --activate
```

Pausar só a antiga:

```bash
node create-campaign.mjs --pause-old
```

## Estrutura

- Objetivo: Tráfego / cliques no link
- 1 conjunto: IG engajados 365d + video 50% (Advantage+ desligada)
- 10 anúncios: 22s e 54s × lista, e-mail, fim de ano, prova, callout
- Destino: `https://workshop.mundopodium.com.br/aula/lead-antigo-nao-e-lead-morto`
- Encerra sozinha 21/09 20:30

Depois da aula, revogar o token no Graph API Explorer.
