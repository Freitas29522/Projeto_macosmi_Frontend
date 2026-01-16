$ErrorActionPreference = "Stop"

# pastas origem/destino
$src = (Join-Path (Get-Location).Path "Projeto\Frontend")
$dist = Join-Path $src "dist"

# limpa dist
if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
New-Item -ItemType Directory -Path $dist | Out-Null

# copia tudo primeiro (imagens, fontes, etc.)
Copy-Item -Path (Join-Path $src "*") -Destination $dist -Recurse -Force `
  -Exclude "node_modules", "dist", "*.ps1", "package-lock.json", "package.json"

# minificar JS (recursivo)
Get-ChildItem -Path $src -Recurse -File -Filter *.js |
  Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\dist\\" } |
  ForEach-Object {
    $rel = $_.FullName.Substring($src.Length).TrimStart("\")
    $out = Join-Path $dist $rel
    $outDir = Split-Path $out -Parent
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null

    npx terser $_.FullName -c -m -o $out
  }

# minificar CSS (recursivo)
Get-ChildItem -Path $src -Recurse -File -Filter *.css |
  Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\dist\\" } |
  ForEach-Object {
    $rel = $_.FullName.Substring($src.Length).TrimStart("\")
    $out = Join-Path $dist $rel
    $outDir = Split-Path $out -Parent
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null

    npx cleancss -o $out $_.FullName
  }

# minificar HTML (recursivo)
Get-ChildItem -Path $src -Recurse -File -Filter *.html |
  Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\dist\\" } |
  ForEach-Object {
    $rel = $_.FullName.Substring($src.Length).TrimStart("\")
    $out = Join-Path $dist $rel
    $outDir = Split-Path $out -Parent
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null

    npx html-minifier-terser $_.FullName `
      --collapse-whitespace `
      --remove-comments `
      --minify-css true `
      --minify-js true `
      -o $out
  }

Write-Host "Build completo -> $dist"
