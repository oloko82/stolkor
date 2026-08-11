$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Instalowanie oficjalnej integracji Astro Sitemap..."
npm install @astrojs/sitemap

Write-Host ""
Write-Host "Gotowe."
Write-Host "Teraz uruchom:"
Write-Host "  npm run build"
Write-Host ""
Write-Host "Po buildzie sprawdzimy katalog dist oraz meta tagi."
