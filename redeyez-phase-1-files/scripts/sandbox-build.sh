#!/usr/bin/env bash
# Sandbox-only: stub next/font/google (no network access to fonts.googleapis.com here),
# run the production build, then restore the original layout. Never committed to main history.
set -e
cd "$(dirname "$0")/.."

cp app/layout.tsx /tmp/layout.tsx.bak

python3 - <<'PY'
import re
src = open('app/layout.tsx').read()
src = src.replace(
    'import { Playfair_Display, Inter } from "next/font/google";',
    '// sandbox font stub'
)
src = re.sub(
    r'const playfair = Playfair_Display\(\{[^}]*\}\);',
    'const playfair = { variable: "--font-playfair" };',
    src, flags=re.S
)
src = re.sub(
    r'const inter = Inter\(\{[^}]*\}\);',
    'const inter = { variable: "--font-inter" };',
    src, flags=re.S
)
open('app/layout.tsx', 'w').write(src)
PY

npm run build
STATUS=$?

mv /tmp/layout.tsx.bak app/layout.tsx
exit $STATUS
