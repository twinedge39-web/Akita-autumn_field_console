param(
  [switch]$SkipBuild,
  [switch]$Install,
  [string]$AppVersion = "2.7.1",
  [string]$OutputRoot = ".mod-build",
  [string]$ChiaInstallPath = "$env:LOCALAPPDATA\Programs\Chia"
)

$ErrorActionPreference = "Stop"

function Resolve-RepoRoot {
  $scriptPath = $PSScriptRoot
  if (-not $scriptPath) {
    return (Get-Location).Path
  }
  return $scriptPath
}

function Assert-PathExists {
  param(
    [string]$Path,
    [string]$Message
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "$Message`nMissing: $Path"
  }
}

function Invoke-Step {
  param(
    [string]$Name,
    [scriptblock]$Action
  )

  Write-Host ""
  Write-Host "==> $Name" -ForegroundColor Cyan
  & $Action
}

$repoRoot = Resolve-RepoRoot
$guiRoot = Join-Path $repoRoot "packages\gui"
$buildRoot = Join-Path $guiRoot "build"
$electronBuild = Join-Path $buildRoot "electron"
$rendererBuild = Join-Path $buildRoot "renderer"
$workRoot = if ([System.IO.Path]::IsPathRooted($OutputRoot)) { $OutputRoot } else { Join-Path $repoRoot $OutputRoot }
$stageRoot = Join-Path $workRoot "asar-stage"
$outputAsar = Join-Path $workRoot "app.asar"
$targetAsar = Join-Path $ChiaInstallPath "resources\app.asar"

Write-Host "Chia GUI mod packer" -ForegroundColor Green
Write-Host "Repo: $repoRoot"
Write-Host "Target Chia: $ChiaInstallPath"

Assert-PathExists -Path (Join-Path $repoRoot "package.json") -Message "Run this script from the chia-blockchain-gui repo."
Assert-PathExists -Path (Join-Path $guiRoot "package.json") -Message "GUI package not found."

if (-not $SkipBuild) {
  Invoke-Step "Compile locales" {
    Push-Location $repoRoot
    try {
      npm run locale:compile --workspace @chia-network/core
      npm run locale:compile --workspace @chia-network/wallets
      npm run locale:compile --workspace @chia-network/gui
    } finally {
      Pop-Location
    }
  }

  Invoke-Step "Build production GUI" {
    Push-Location $repoRoot
    try {
      npm run build:skipLocales
    } finally {
      Pop-Location
    }
  }
}

Assert-PathExists -Path $electronBuild -Message "Electron build output not found. Run without -SkipBuild first."
Assert-PathExists -Path $rendererBuild -Message "Renderer build output not found. Run without -SkipBuild first."

Invoke-Step "Create staging folder" {
  if (Test-Path -LiteralPath $stageRoot) {
    Remove-Item -LiteralPath $stageRoot -Recurse -Force
  }
  New-Item -ItemType Directory -Path $stageRoot | Out-Null
  Copy-Item -LiteralPath $buildRoot -Destination $stageRoot -Recurse
  $sourcePackage = Join-Path $guiRoot "package.json"
  $stagePackage = Join-Path $stageRoot "package.json"
  Copy-Item -LiteralPath $sourcePackage -Destination $stagePackage

  if ($AppVersion) {
    $packageJson = Get-Content -LiteralPath $stagePackage -Raw | ConvertFrom-Json
    $packageJson.version = $AppVersion
    $packageJson | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $stagePackage -Encoding UTF8
    Write-Host "Packaged GUI version: $AppVersion" -ForegroundColor Yellow
  }
}

Invoke-Step "Pack app.asar" {
  if (Test-Path -LiteralPath $outputAsar) {
    Remove-Item -LiteralPath $outputAsar -Force
  }

  Push-Location $repoRoot
  try {
    npx asar pack $stageRoot $outputAsar
  } finally {
    Pop-Location
  }
}

Assert-PathExists -Path $outputAsar -Message "Failed to create modded app.asar."
Write-Host ""
Write-Host "Created: $outputAsar" -ForegroundColor Green

if (-not $Install) {
  Write-Host ""
  Write-Host "Not installed. To replace the local Chia GUI after review, run:" -ForegroundColor Yellow
  Write-Host "  powershell -ExecutionPolicy Bypass -File .\pack-mod-gui.ps1 -SkipBuild -Install"
  exit 0
}

Invoke-Step "Check local Chia install" {
  Assert-PathExists -Path $targetAsar -Message "Target app.asar not found."

  $running = Get-Process -Name "Chia" -ErrorAction SilentlyContinue
  if ($running) {
    throw "Chia.exe is running. Close Chia before replacing app.asar."
  }
}

Invoke-Step "Backup and replace app.asar" {
  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $backupAsar = Join-Path (Split-Path $targetAsar -Parent) "app.asar.backup-$timestamp"

  Copy-Item -LiteralPath $targetAsar -Destination $backupAsar
  Copy-Item -LiteralPath $outputAsar -Destination $targetAsar -Force

  Write-Host "Backup: $backupAsar" -ForegroundColor Yellow
  Write-Host "Installed: $targetAsar" -ForegroundColor Green
}
