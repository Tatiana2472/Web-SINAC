# Script de Automatización de Respaldo Diario de PostgreSQL 18.6 (SINAC)
# Responsable: Royner Gutiérrez Ugalde
# Registra o ejecuta la tarea programada diaria a las 02:00 AM usando respaldo_postgresql.js --auto

param(
    [switch]$RegistrarTarea,
    [switch]$EjecutarAhora
)

$ProyectoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$ScriptRespaldo = Join-Path $PSScriptRoot "respaldo_postgresql.js"
$NombreTarea = "SINAC_Respaldo_Automatico_PostgreSQL"

Write-Host "=== AUTOMATIZACIÓN DE RESPALDO POSTGRESQL 18.6 (SINAC) ===" -ForegroundColor Cyan
Write-Host "Tarea programada: $NombreTarea"
Write-Host "Frecuencia configurada: Diaria (02:00 AM) + Pre-despliegue (RPO = 24h / < 1 min)"
Write-Host "Script objetivo: $ScriptRespaldo --auto"

if ($RegistrarTarea) {
    $Comando = "node `"$ScriptRespaldo`" --auto"
    schtasks /Create /TN $NombreTarea /TR $Comando /SC DAILY /ST 02:00 /F
}

if ($EjecutarAhora) {
    node $ScriptRespaldo --auto
}
