# Script de Deploy para Vercel
# Execute: .\deploy-vercel.ps1

Write-Host "🚀 Iniciando deploy no Vercel..." -ForegroundColor Green

# Verificar se está logado
Write-Host "`nVerificando login..." -ForegroundColor Yellow
$whoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Você precisa fazer login primeiro. Execute: vercel login" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Logado como: $whoami" -ForegroundColor Green

# Configurar variáveis de ambiente
Write-Host "`n📝 Configurando variáveis de ambiente..." -ForegroundColor Yellow
Write-Host "⚠️  Você precisará inserir os valores manualmente:" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_META_PIXEL_ID: 2971488916372606" -ForegroundColor Cyan
Write-Host "   - NEXT_PUBLIC_BASE_URL: (será configurado após primeiro deploy)" -ForegroundColor Cyan

# Fazer deploy
Write-Host "`n🚀 Fazendo deploy..." -ForegroundColor Yellow
Write-Host "⚠️  Se for a primeira vez, você precisará:" -ForegroundColor Yellow
Write-Host "   1. Escolher o escopo (selecione sua conta)" -ForegroundColor Cyan
Write-Host "   2. Linkar ao projeto existente ou criar novo" -ForegroundColor Cyan
Write-Host "   3. Confirmar as configurações" -ForegroundColor Cyan

vercel --prod

Write-Host "`n✅ Deploy concluído!" -ForegroundColor Green
Write-Host "`n📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Configure as variáveis de ambiente no dashboard do Vercel" -ForegroundColor Cyan
Write-Host "   2. Ou execute os comandos manualmente:" -ForegroundColor Cyan
Write-Host "      vercel env add NEXT_PUBLIC_META_PIXEL_ID" -ForegroundColor Gray
Write-Host "      vercel env add NEXT_PUBLIC_BASE_URL" -ForegroundColor Gray

