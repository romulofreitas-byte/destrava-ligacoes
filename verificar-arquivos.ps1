# Script de Verificação de Arquivos para Migração
# Este script verifica se todos os arquivos necessários foram copiados

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verificação de Arquivos para Migração" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$missingFiles = @()
$foundFiles = @()

# Lista de arquivos obrigatórios
$requiredFiles = @(
    # Configurações
    ".gitignore",
    "package.json",
    "tsconfig.json",
    "next.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    
    # App Core
    "src/app/globals.css",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/not-found.tsx",
    
    # Componentes Globais
    "src/components/ClientComponents.tsx",
    "src/components/ErrorBoundary.tsx",
    "src/components/CookieConsent.tsx",
    "src/components/MetaPixel.tsx",
    "src/components/Clarity.tsx",
    "src/components/FloatingWhatsAppButton.tsx",
    
    # Componentes de Seção
    "src/components/sections/WorkshopPageContent.tsx",
    "src/components/sections/HeroSectionWorkshop.tsx",
    "src/components/sections/WorkshopTestimonialBanner.tsx",
    "src/components/sections/WorkshopModulesSection.tsx",
    "src/components/sections/LiveCallsSection.tsx",
    "src/components/sections/EventDetailsSection.tsx",
    "src/components/sections/WhoIsItForWorkshopSection.tsx",
    "src/components/sections/ColdCallQuizSection.tsx",
    "src/components/sections/WhyYouStuckSection.tsx",
    "src/components/sections/TestimonialsVideoSection.tsx",
    "src/components/sections/WhatYouWillLearnSection.tsx",
    "src/components/sections/AboutRomuloWorkshopSection.tsx",
    "src/components/sections/WhyDifferentWorkshopSection.tsx",
    "src/components/sections/NicheApplicationSection.tsx",
    "src/components/sections/AfterWorkshopSection.tsx",
    "src/components/sections/TestimonialsScrollSection.tsx",
    "src/components/sections/WorkshopFAQSection.tsx",
    "src/components/sections/FinalCTAWorkshopSection.tsx",
    "src/components/sections/Footer.tsx",
    "src/components/sections/PainPointsMarquee.tsx",
    "src/components/sections/BenefitsMarquee.tsx",
    "src/components/sections/LogoSeparator.tsx",
    
    # Componentes UI
    "src/components/ui/Button.tsx",
    "src/components/ui/Card.tsx",
    "src/components/ui/Section.tsx",
    "src/components/ui/Badge.tsx",
    "src/components/ui/FAQ.tsx",
    "src/components/ui/ProtectedImage.tsx",
    "src/components/ui/AnimatedButton.tsx",
    "src/components/ui/AnimatedCard.tsx",
    "src/components/ui/FlipCard.tsx",
    "src/components/ui/StatCounter.tsx",
    "src/components/ui/SubtleCTA.tsx",
    "src/components/ui/SubtleHelpModal.tsx",
    "src/components/ui/VideoModal.tsx",
    "src/components/ui/TestimonialCard.tsx",
    "src/components/ui/TestimonialCarousel.tsx",
    "src/components/ui/TimelineModal.tsx",
    "src/components/ui/MethodModal.tsx",
    
    # Contextos
    "src/contexts/ModalContext.tsx",
    
    # Dados
    "src/data/faq.ts",
    "src/data/benefits.ts",
    "src/data/comparison.ts",
    "src/data/program.ts",
    
    # Bibliotecas
    "src/lib/constants.ts",
    "src/lib/metaPixel.ts"
)

Write-Host "Verificando arquivos..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        $foundFiles += $file
        Write-Host "[OK] $file" -ForegroundColor Green
    } else {
        $missingFiles += $file
        Write-Host "[FALTANDO] $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Resumo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Arquivos encontrados: $($foundFiles.Count)" -ForegroundColor Green
Write-Host "Arquivos faltando: $($missingFiles.Count)" -ForegroundColor $(if ($missingFiles.Count -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($missingFiles.Count -gt 0) {
    Write-Host "Arquivos que precisam ser copiados:" -ForegroundColor Yellow
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Consulte GUIA_MIGRACAO_COMPLETA.md para instruções detalhadas." -ForegroundColor Yellow
} else {
    Write-Host "Todos os arquivos necessários foram encontrados!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Cyan
    Write-Host "1. Execute 'npm install' para instalar dependências" -ForegroundColor White
    Write-Host "2. Crie arquivo .env.local com variáveis de ambiente" -ForegroundColor White
    Write-Host "3. Ajuste textos e imagens para nova temática" -ForegroundColor White
    Write-Host "4. Execute 'npm run dev' para testar localmente" -ForegroundColor White
}

Write-Host ""
