#!/usr/bin/env bash
# ============================================================================
# EXTRACCIÓN DE MATERIALIDAD — fichas VIT de la Ditec (Minvu)
# ============================================================================
# Descarga las 24 fichas oficiales, extrae su texto con `pdftotext -layout` y
# emite las líneas ancla (materialidad, superficie, programa, alcance, empresa)
# que sirvieron para curar a mano scripts/fichas-vit/materialidad-vit.csv.
#
# Regla del proyecto: NO inferir. El CSV recoge solo lo que dice cada ficha;
# los campos ausentes quedan "sin dato". Este script reproduce la parte
# mecánica; la lectura/curación del CSV es humana (por eso el CSV se versiona
# y este script también, pero NO los PDF/txt — ver .gitignore).
#
# Requisitos: bash, curl, pdftotext (poppler).
# Uso: bash scripts/fichas-vit/extraer-fichas-vit.sh
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"

BASE="https://www.minvu.gob.cl/wp-content/uploads/2025/10"
FILES=(
  "1-Vivienda-tipo-industrailizada-PATAGUAL2023-2025.pdf"
  "2-Ficha-Vivienda-Rural-Tamarugo-2025.pdf"
  "3-Vivienda-tipo-industrailizada-E2E-2025.pdf"
  "4-FICHA-E2E-DITEC-FN-Vivienda-tipo-industrailizada-E2E-FN-2025.pdf"
  "5-2da-Ficha-Vivienda-Pareada86-2025.pdf"
  "6-Ficha-Vivienda-Rural-Nandu-2025.pdf"
  "7-Ficha-Vivienda-Rural-Nandu-RD-2025.pdf"
  "8-RD-Ficha-Vivienda-Rural-Nandu-DS49-2025.pdf"
  "9-PV-Ficha-Vivienda-Rural-Nandu-DS49-2025.pdf"
  "10-Ficha-Vivienda-TECNOPANEL-URBANA-2025.pdf"
  "11-Ficha-SANTA-MAGDALENA-RURAL-2025.pdf"
  "12-Ficha-SANTA-MAGDALENA-2025.pdf"
  "13-VI-Ficha-BAUMAX-2025.pdf"
  "14-Ficha-Baumax-departamento-pequeno-condominio-2025.pdf"
  "15-Ficha-Baumax-departamento-5-pisos-alta-2025.pdf"
  "16-Ficha-Vivienda-VIT-HUECHURABA-I-2025.pdf"
  "17-Ficha-Vivienda-TECNOFASTA-T01-2025.pdf"
  "18-Ficha-Vivienda-TECNOFASTA-2025.pdf"
  "19-Ficha-Vivienda-VIT-URABA-PAREADA-2025.pdf"
  "20-Ficha-Vivienda-VIT-LIMARI-2025.pdf"
  "21-Ficha-Vivienda-VIT-LIMARI-ADOSADA-2025.pdf"
  "22-Ficha-Vivienda-PROMET-2025.pdf"
  "23-Ficha-Vivienda-PROMET-1-PISO-2025.pdf"
  "24-Ficha-Vivienda-CANADA-HOUSE-2025.pdf"
)

echo "== 1) Descarga =="
: > _urls.tsv
i=0
for f in "${FILES[@]}"; do
  i=$((i+1)); nn=$(printf "%02d" "$i")
  code=$(curl -s -L -o "$nn.pdf" -w "%{http_code}" "$BASE/$f")
  printf "%s\t%s\t%s\n" "$nn" "$code" "$BASE/$f" >> _urls.tsv
  echo "$nn · http=$code · $f"
done

echo "== 2) pdftotext -layout =="
for nn in $(seq -w 1 24); do
  pdftotext -layout "$nn.pdf" "$nn.txt" 2>/dev/null || echo "$nn: fallo pdftotext (¿imagen sin capa de texto? -> lectura manual)"
done

echo "== 3) Líneas ancla por ficha =="
clean() { tr -d '\000-\010\013\014\016-\037' < "$1" | sed 's/[[:space:]]\+/ /g'; }
for nn in $(seq -w 1 24); do
  echo "----- $nn -----"
  clean "$nn.txt" | grep -ainE \
    "estructura de|Paneles SIP|muros y losas|hormig|acero|Metalcon|Perfil Acero|Materialidad|Sistema constructivo|Superficie|m2|D\.?S\.? ?(49|10)|FSEV|\(N\) = nacional|Desarrollada por|Empresa Industriali|PISO" \
    | grep -aviE "www|http" | head -18
done
echo "Listo. Curar/actualizar materialidad-vit.csv a partir de esta salida."
