$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "1/3 Instalowanie / sprawdzanie Sharp..."
npm install --save-dev sharp

Write-Host ""
Write-Host "2/3 Konfigurowanie npm..."
node .\scripts\configure-performance.mjs

Write-Host ""
Write-Host "3/3 Generowanie miniatur..."
npm run optimize:gallery

Write-Host ""
Write-Host "Gotowe. Teraz uruchom: npm run dev"
