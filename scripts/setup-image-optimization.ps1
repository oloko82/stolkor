$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Instalowanie Sharp..."
npm install --save-dev sharp

Write-Host ""
Write-Host "Konfigurowanie skryptów npm..."
node .\scripts\configure-image-optimization.mjs

Write-Host ""
Write-Host "Pierwsza optymalizacja galerii..."
npm run optimize:gallery

Write-Host ""
Write-Host "Gotowe."
Write-Host "Uruchom teraz: npm run dev"
