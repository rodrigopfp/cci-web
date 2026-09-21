#!/usr/bin/env bash
# ============================================================================
# DESCARGA DE RESOLUCIONES Res. Ex. N°52 — industrializadoras de las 24 fichas
# ============================================================================
# Archivo de trabajo (NO versionar). Descarga desde www.minvu.gob.cl las
# resoluciones exentas enlazadas en la tabla "Empresas Industrializadoras
# certificadas por DITEC" para las industrializadoras que aparecen en las 24
# fichas VIT, más el listado de zonas térmicas y el estándar higrotérmico de
# la Ditec. Extrae texto con `pdftotext -layout` para buscar comuna/dirección.
#
# Requisitos: bash, curl, pdftotext (poppler). HTTP/1.1 forzado: el sitio del
# Minvu corta la descarga por HTTP/2 desde esta máquina.
# Uso: bash scripts/fichas-vit/descargar-resoluciones-vit.sh
# ============================================================================
set -uo pipefail
cd "$(dirname "$0")"

BASE="https://www.minvu.gob.cl/wp-content/uploads"
# nombre_local|ruta relativa a BASE
ITEMS=(
  "res-0607-patagual|2024/11/RES-EX-N607_PATAGUAL_14032023.pdf"
  "res-0639-santa-magdalena|2024/11/RES-EX-N639_SANTA-MAGDALENA_16032023.pdf"
  "res-0637-e2e|2024/11/RES-EX-N637_E2E_16032023.pdf"
  "res-0679-promet|2024/11/RES-EX-N679_PROMET_27032023.pdf"
  "res-0834-baumax|2024/11/RES-EX-N834_BAUMAX_21042023.pdf"
  "res-1092-tecnofast|2024/11/RES-EX-N1092_TECNOFAST_14062023.pdf"
  "res-1093-tecnotruss|2024/11/RES-EX-N1093_TECNOTRUSS_14062023.pdf"
  "res-1657-prefabricadas-premium|2024/11/RES-EX-N1657_PREFABRICADAS-PREMIUM_04102023.pdf"
  "res-1702-canada-house|2026/01/CANADA-HOUSE-SPA-RESOLUCION-EXENTA-1702-13-11-2025.pdf"
  "res-1823-tecnotruss-2|2025/12/Res-Ex-N%C2%B01823-Aprueba-Incripcion-de-empresa-Tecnoruss.pdf"
  "ditec-zonas-termicas|2023/04/Zonas-Termicas-DITEC.pdf"
  "ditec-estandar-higrotermico|2023/04/Estandar-higrotermico-Ditec.pdf"
)

: > _resoluciones-urls.tsv
for it in "${ITEMS[@]}"; do
  name="${it%%|*}"; rel="${it#*|}"
  code=$(curl -sS -L --http1.1 --max-time 180 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \
         -o "$name.pdf" -w "%{http_code}" "$BASE/$rel" 2>/dev/null || echo "ERR")
  size=$(stat -c %s "$name.pdf" 2>/dev/null || echo 0)
  printf "%s\t%s\t%s\t%s\n" "$name" "$code" "$size" "$BASE/$rel" >> _resoluciones-urls.tsv
  if [ "$code" = "200" ] && [ "$size" -gt 0 ]; then
    pdftotext -layout "$name.pdf" "$name.txt" 2>/dev/null || echo "$name: fallo pdftotext"
    chars=$(tr -d '[:space:]' < "$name.txt" 2>/dev/null | wc -c)
    echo "$name · http=$code · $size bytes · texto=$chars chars"
  else
    echo "$name · http=$code · $size bytes · NO DESCARGADO"
  fi
done
echo "Listo."
