# Script PowerShell para atualizar dados do participante Gilson Silva Castro no Supabase
# e enviar email de confirmação
# 
# Uso: .\scripts\upsert-gilson.ps1
# 
# Requer: Servidor Next.js rodando em http://localhost:3002

$body = @{
    charge_id = '10CF6966-827A-487A-9545-9B1CEA6056FD'
    reference_id = 'LINK_PAGAE=81eiPrem9'
    nome = 'Gilson Silva Castro'
    email = 'azimutegestao@gmail.com'
    telefone_country = '55'
    telefone_area = '91'
    telefone_number = '981483968'
    status = 'PAID'
    amount_brl = 49.99
    payment_method = 'Cartão de Crédito'
    installments = 1
} | ConvertTo-Json

Write-Host "🚀 Atualizando dados e enviando email..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:3002/api/workshop/upsert-and-send' -Method POST -Body $body -ContentType 'application/json'
    
    if ($response.success) {
        Write-Host "✅ Dados atualizados no Supabase com sucesso!" -ForegroundColor Green
        if ($response.emailSent) {
            Write-Host "✅ Email enviado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Email não foi enviado: $($response.error)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Erro: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erro ao processar requisição:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Certifique-se de que o servidor Next.js está rodando em http://localhost:3002" -ForegroundColor Yellow
    Write-Host "   Execute: npm run dev" -ForegroundColor Yellow
}







