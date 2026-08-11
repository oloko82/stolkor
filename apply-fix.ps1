$ErrorActionPreference = "Stop"

$indexPath = Join-Path $PSScriptRoot "src\pages\index.astro"

if (-not (Test-Path $indexPath)) {
    throw "Nie znaleziono pliku src\pages\index.astro. Uruchom ten skrypt z głównego katalogu projektu Stolkor."
}

$content = Get-Content $indexPath -Raw

# Ujednolicenie deklaracji base bez ruszania reszty index.astro.
$content = $content -replace 'const\s+base\s*=\s*import\.meta\.env\.BASE_URL\s*;', @'
const rawBase = import.meta.env.BASE_URL;
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
'@

# Jeśli plik używa bezpośrednio import.meta.env.BASE_URL przy logo, zamień na bezpieczne base.
$content = $content -replace '\$\{import\.meta\.env\.BASE_URL\}images/logo\.webp', '${base}images/logo.webp'

Set-Content -Path $indexPath -Value $content -Encoding UTF8

Write-Host "Gotowe. Poprawiono Gallery.astro i index.astro."
Write-Host "Teraz uruchom: npm run build"
