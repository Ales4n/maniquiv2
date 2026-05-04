# ADR-001: Theme base — Dawn lean (mayo 2026)

## Contexto

El theme existente (Atelier 2.1.5) arrastraba bloat de CSS y JS no utilizado que penalizaba Lighthouse. El rediseño es total: nueva paleta, nueva tipografía, nuevo sistema de secciones. Parchear Atelier hubiera sido más lento que construir desde cero.

## Decisión

Usar Dawn como base, específicamente la versión lean de mayo 2026 (`shopify theme init`). Esta versión difiere del Dawn clásico:
- Solo `assets/critical.css` como hoja global (sin decenas de `component-*.css`)
- CSS por sección via `{% stylesheet %}` encapsulado (no una hoja monolítica)
- `snippets/css-variables.liquid` inyecta variables CSS en el `<head>` via `{% style %}`
- `layout/theme.liquid` de 37 líneas — mínimo viable

## Consecuencias

**Positivas:**
- Arquitectura CSS encapsulada por defecto — coincide con lo que prescribe CLAUDE.md
- Lighthouse limpio desde el inicio (zero dead CSS)
- `{% stylesheet %}` por sección facilita commits atómicos y revisión sección a sección

**Negativas / a vigilar:**
- Fuentes via Google Fonts (no Shopify font picker) — añade una request externa. Alternativa futura: self-host los woff2 en `assets/` para eliminar esa dependencia y mejorar LCP.
- Sin componentes Dawn reutilizables (carrito, modal, etc.) — hay que construirlos si se necesitan. Para el home del sprint 1, no aplica.

## Estructura resultante

```
maniqui-theme/
├── assets/critical.css          ← reset + tokens globales + sistema de botones
├── snippets/css-variables.liquid ← paleta v3.2 inline en <head>
├── layout/theme.liquid          ← fonts, schema LocalBusiness, skip-link
└── sections/section-maniqui-*.liquid ← CSS encapsulado via {% stylesheet %}
```
