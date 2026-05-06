# Kinet Web

Landing conceptual en `React + Vite` para Kinet, construida con componentes y estilos modulares sin Tailwind.

## Ejecutar

```bash
npm install
npm run dev
```

## Estructura

- `src/components/sections`: bloques principales de la home
- `src/components/layout`: header y footer
- `src/components/common`: piezas reutilizables
- `src/data/siteContent.js`: contenido desacoplado de la UI
- `src/hooks`: interacción global para aura del puntero y progreso de scroll

## Nota sobre identidad visual

La UI ya usa la paleta `#180F2A`, `#FFFFFF`, `#C6FF34` y tipografía `Urbanist`.
No pude extraer automáticamente los logos ni íconos desde `KINET.pdf` con las herramientas locales disponibles, así que dejé un wordmark tipográfico y una estructura lista para reemplazarlo por SVG/PNG cuando exportes los assets del PDF.
