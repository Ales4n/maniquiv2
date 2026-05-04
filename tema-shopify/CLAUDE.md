# CLAUDE.md — Maniquí

## Proyecto

Maniquí es un servicio de arreglos de ropa en Valencia, España, formado por tres modistas profesionales con taller propio en Marxalenes. El ángulo principal de comunicación es: **"Ropa nueva que no te queda perfecta"**. La web funciona como e-commerce de servicios (contratación directa) y como puerta de entrada al canal principal de captación, que es WhatsApp.

**URL de producción:** https://maniquicreaciones.com/
**Repositorio:** https://github.com/Ales4n/tema-shopify
**Development store:** [pendiente de añadir URL del dev store]

---

## Posicionamiento estratégico — leer antes de cualquier cambio

### Quién es Maniquí

Taller de arreglos de ropa con identidad artesanal y humana. Tres modistas con oficio que cosen ellas mismas cada prenda — sin intermediarios, sin protocolos. Tres años de actividad, 5 estrellas en Google Maps. Atención sin cita previa por defecto.

### Quién NO es Maniquí

- **NO somos atelier de novia / ceremonia / alta costura.** Si el contenido empuja hacia "vestidos de boda", "patrones complejos", "prendas de archivo familiar" o similares, está mal posicionado.
- **NO somos costurera de barrio low-cost.** El tono no es "rapidito y baratito", es "bien hecho a precio justo".
- **NO somos servicio genérico tipo cadena.** El "tres modistas con nombre y manos" es la diferenciación principal.

### Cliente objetivo

Persona que compra ropa online en marcas como Zara, Mango, H&M, COS, marcas DTC. Encuentra prenda que le gusta, no le queda bien (largo, cintura, mangas, hombros), y antes de devolverla considera el arreglo. Mayoritariamente en Valencia ciudad y área metropolitana, también clientes online en toda España.

### Jerarquía de canales de conversión — CRÍTICO

Esta jerarquía condiciona todas las decisiones de UI, copy y CTA en la web. No se cuestiona sin justificación estratégica.

| Canal | Peso | Cuándo destacar |
|---|---|---|
| **WhatsApp** | 50% | CTA primario en hero, sección de canales, CTA final, mobile sticky. Color verde marca (#25D366). Mensaje pre-rellenado: "Hola, necesito arreglar una prenda. ¿Me podéis dar precio?" — debe coincidir con el de la campaña Meta |
| **Visita al taller** | 35% | CTA secundario en hero, segunda tarjeta en sección de canales, sección dedicada con mapa, segundo CTA en cierre. Color warm-dark |
| **E-commerce online** | 15% | Solo en sección de catálogo. CTA terciario discreto. Sin destacar visualmente. Para no-locales o quien no puede venir |

**El e-commerce vive en su propia sección sin esconderse, pero sin protagonismo.** Cumple tres funciones: dar idea de precio (reducir fricción), nutrir SEO long-tail, permitir contratación directa para quien lo prefiera.

---

## Stack técnico

- **Plataforma:** Shopify (Online Store 2.0)
- **Theme base:** Dawn (theme oficial de Shopify, fork desde repo público)
- **Templating:** Liquid + JSON templates
- **CSS:** Vanilla CSS con custom properties (variables CSS). Sin preprocesadores ni frameworks
- **JS:** Vanilla JS. Web Components donde aporten valor (siguiendo el patrón Dawn)
- **Integraciones actuales:** Meta Pixel, WhatsApp (link directo con mensaje pre-rellenado), Google Analytics 4, Google Search Console, Calendly (para reservas de proyectos complejos)
- **Automatización WhatsApp:** Make.com con WhatsApp Cloud API y Data Store para tracking de estado por cliente

---

## Identidad de marca — Branding Kit v3.2 (mayo 2026)

### Tono de voz

- **Cercano pero profesional.** Cálido, humano, con oficio. No corporativo, no coloquial extremo.
- **Directo y claro.** Frases cortas. Cero hedging tipo "sin compromiso", "totalmente gratis", "click aquí".
- **Seguro y resolutivo.** El usuario tiene un problema (la ropa no le queda) y nosotros lo solucionamos.
- **Aspiracional sutil.** No vendemos arreglos, vendemos que tu ropa te quede perfecta y dure años más en el armario.
- **Idioma:** Español (España). Usar "tú", no "usted". Sin modismos latinoamericanos.

### Referencias estéticas

- **Sí:** Sézane, Toteme, La Ligne, Frances de Lourdes — atelier editorial cálido, identidad de oficio.
- **No:** Everlane, COS, marcas tech-clean minimalistas frías. Maniquí tiene calidez y materia, no es industrial.

### Tipografía

```css
--font-display: 'Cormorant Garamond', Georgia, serif;
  /* Headings, eyebrows decorativos */
  /* Pesos: 300, 400, italic 400 */
  
--font-body: 'Red Hat Text', system-ui, -apple-system, sans-serif;
  /* Body, UI, labels, CTAs */
  /* Pesos: 400, 500, 600 */
```

**Reglas:**
- Italic Cormorant en sage como gesto editorial — usar con MODERACIÓN. Máximo 3-4 veces en toda la web. Si aparece en cada heading, pierde fuerza y se vuelve tic.
- Eyebrow text: Red Hat Text 11-12px, uppercase, letter-spacing 0.18em, color sage o terracotta según contexto.

### Paleta exacta

```css
--sage: #8FA585;          /* Acento principal, líneas decorativas, eyebrows, CTAs sage */
--sage-dark: #738B68;     /* Hover de sage */
--sage-soft: rgba(143,165,133,0.10); /* Fondos sutiles */
--sage-line: rgba(143,165,133,0.35); /* Líneas decorativas finas */

--cream: #FFFEFE;         /* Fondo principal — sustituye al blanco puro */
--cream-warm: #FDFBF7;    /* Fondos secundarios, alternar bandas */

--warm-dark: #2A2520;     /* Textos, headings, fondos oscuros (sección modistas, CTA final) */
--warm-dark-2: #3A332C;   /* Footer */

--text-2: #6B6660;        /* Textos secundarios, párrafos largos */
--text-muted: #948B7E;    /* Labels, captions, metadatos */
--border: #E8E2D5;        /* Bordes, divisores */

--terracotta: #C9A98E;    /* Acento muy puntual: callouts especiales, links destacados */

--whatsapp: #25D366;      /* CTAs canal WhatsApp (color de marca, no se modifica) */
--whatsapp-dark: #128C7E; /* Hover WhatsApp */
```

**Prohibido:**
- Blanco puro `#FFFFFF` o negro absoluto `#000000` en cualquier elemento
- Sage como fondo de bloques grandes (solo acento, líneas, CTAs)
- Otra paleta distinta a la anterior
- Tipografías distintas a Cormorant Garamond y Red Hat Text
- Gradientes vistosos, sombras dramáticas, patrones AI-typical
- Iconos genéricos Material/Bootstrap. Si hace falta icono, line-icon fino estilo Lucide
- Emojis en cualquier sitio

### Sistema de espaciado

Base 8px. Escala: `8, 16, 24, 32, 48, 64, 80, 120`.
- Padding vertical sección: 120px desktop / 80px tablet / 64px mobile.
- Container max-width 1280px, padding lateral 48px desktop / 24px mobile.

### Detalles del sistema visual

- Línea sage decorativa de 40px × 1px como separador entre headline y subhead (gesto recurrente de la marca).
- CTAs primarios con esquinas ligeramente redondeadas (8-12px), padding generoso vertical 14-16px, horizontal 28-32px.
- Transiciones 200-400ms ease — nunca instantáneas, nunca lentas.
- Hover states con leve translateY(-2px) o cambio de color, no efectos vistosos.

---

## Datos reales — usar exactamente estos, NO inventar

| Dato | Valor |
|---|---|
| Nombre | Maniquí |
| Razón social | Maniquí Creaciones |
| Dirección | Avinguda de la Constitució, 94, 46009 Valencia |
| Barrio | Marxalenes (La Saïdia) |
| WhatsApp | +34 603 30 55 66 |
| Email | hola@maniquicreaciones.com |
| Horario | Lunes a Viernes, 10:00–14:00 y 17:00–20:00 |
| Modalidad | Sin cita previa por defecto (walk-in). Calendly para proyectos complejos |
| Antigüedad | 3 años |
| Valoración Google Maps | 5 estrellas |
| Equipo | Tres modistas profesionales (sin nombres ficticios — usar `[Modista 1]`, `[Modista 2]`, `[Modista 3]` como placeholders explícitos hasta confirmar nombres reales) |

### Servicios y precios orientativos

| Servicio | Precio desde |
|---|---|
| Bajo de pantalón | 12€ |
| Ajuste de cintura | 18€ |
| Mangas (camisa / chaqueta) | 14€ |
| Hombros y caída | 25€ |

**Prohibido inventar:** nombres de modistas, años de oficio individuales, número de seguidoras Instagram, número de prendas arregladas, premios, certificaciones, frases atribuidas a personas concretas. Si necesitas un dato que no está aquí, déjalo como `[PLACEHOLDER]` explícito.

---

## Arquitectura de la web

### Estructura de páginas

```
/                          Home (12 secciones, ver wireframe)
/collections/arreglos      Catálogo completo de servicios
/products/[arreglo]        Página individual de cada servicio
/pages/como-funciona       Proceso paso a paso (3 canales)
/pages/sobre-nosotras      Historia + las modistas + taller
/pages/el-taller           Información del taller, mapa, horarios
/pages/contacto            Formulario + WhatsApp + Calendly
/pages/faq                 Preguntas frecuentes
/blogs/guias               Blog SEO: guías de tallas, cuidado, cuándo arreglar
```

### Estructura del home (12 secciones, orden cerrado)

1. **Nav sticky** — visible al scrollear, WhatsApp verde siempre presente
2. **Hero** — imagen full-bleed, "Ajustes de Ropa a tu medida", CTAs Visitar Taller / Arreglos Online
3. **Problema · Solución** — gancho emocional, conexión con campaña Meta
4. **Banda de confianza** — 3 años · 5★ Google · Sin cita · Presupuesto al momento
5. **Cómo trabajamos · 3 canales** — WhatsApp / Taller / Online (jerarquía visual sin badges)
6. **Las modistas** — fondo warm-dark, humanización sin CTA de venta
7. **Arreglos más pedidos** — catálogo abreviado por tipo de arreglo (no por tipo de prenda)
8. **Antes/Después + Testimonios** — prueba visual fusionada con quotes breves
9. **Visita el taller** — mapa, dirección, horario, callout Calendly para casos complejos
10. **FAQ** — 6 preguntas, acordeón, antes del cierre
11. **CTA final** — fondo warm-dark, WhatsApp + Taller (sin online)
12. **Footer** — datos NAP completos, navegación, redes

---

## Reglas de código

### Estructura de secciones Liquid

Todas las secciones del home y páginas internas deben seguir este patrón:

```liquid
{% comment %} MANIQUI: [Nombre] - [Propósito breve] - [YYYY-MM-DD] {% endcomment %}

<section class="maniqui-{{ section.id }}" id="maniqui-{{ section.id }}">
  <div class="maniqui-container">
    <!-- Contenido editable desde schema -->
  </div>
</section>

{% schema %}
{
  "name": "Maniquí — [Nombre visible en admin]",
  "tag": "section",
  "class": "section-maniqui",
  "settings": [
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow text",
      "default": "EJEMPLO"
    }
  ],
  "blocks": [],
  "presets": [
    {
      "name": "Maniquí — [Nombre]"
    }
  ]
}
{% endschema %}

{% stylesheet %}
  .maniqui-{{ section.id }} {
    /* Estilos encapsulados, prefijados, sin colisiones */
  }
{% endstylesheet %}

{% javascript %}
  // Solo si es estrictamente necesario
{% endjavascript %}
```

### Convenciones

- **Naming:**
  - Secciones: `section-maniqui-[nombre].liquid` (ej: `section-maniqui-hero.liquid`)
  - Snippets: `snippet-maniqui-[nombre].liquid`
  - Templates JSON: `templates/index.json`, `templates/page.about.json`, etc.
  - Clases CSS: `kebab-case` con prefijo `maniqui-` (ej: `maniqui-canales-card`)

- **Editabilidad desde admin:**
  - Todo texto visible debe estar en `section.settings` o `block.settings`
  - Toda imagen visible debe usar `image_picker`
  - Todo URL de CTA debe usar `url` o `text` setting
  - Labels de schema en español

- **No hardcodear:**
  - Nada de strings literales en el HTML
  - Excepción: legal copy estático, símbolos universales

- **Comentarios:**
  - Todo cambio significativo: `{% comment %} MANIQUI: [qué cambia] - [YYYY-MM-DD] {% endcomment %}`
  - Comentarios en español

- **Mobile-first siempre.** Breakpoints: 1024px (tablet), 600px (mobile). Si no funciona en 375px, no funciona.

- **Cada sección autónoma:** estilos encapsulados, sin dependencias cruzadas con otras secciones. Excepción: CSS variables globales del branding (definidas en `theme.liquid` o `base.css`).

- **Testing antes de cerrar:** Chrome desktop, Safari mobile, Firefox. No vale "se ve bien en mi navegador".

### Workflow de modificaciones

Cuando se pide crear/modificar/rediseñar:

1. **Antes de tocar nada:** listar el estado actual (qué secciones hay, qué orden, qué settings).
2. **Proponer estructura:** nombres de sección, contenido esperado, settings que expondrá.
3. **Implementar sección por sección,** validando cada una antes de pasar a la siguiente.
4. **Respetar la jerarquía cerrada del home** (12 secciones, orden no negociable).
5. **Nunca trabajar en producción directamente.** Siempre development store o theme duplicado en modo unpublished.

---

## SEO

### Reglas técnicas

- Toda página debe tener `<title>` único y `<meta name="description">` único, ambos editables desde Shopify admin.
- Estructura de headings correcta: un solo `<h1>` por página, jerarquía lógica h2 → h3.
- Imágenes: `alt` descriptivo en español, formato WebP preferido (Shopify lo gestiona automáticamente con `image_url` filter), lazy loading excepto hero.
- URLs limpias en español: `/products/ajuste-largo-pantalon` no `/products/arreglo-pantalon-123abc`.
- Schema markup (JSON-LD) en páginas relevantes:
  - Home y página /el-taller: `LocalBusiness` con NAP completo
  - Páginas de servicio: `Service`
  - FAQ: `FAQPage`
- Canonical tags correctos.
- Sitemap.xml validado en Search Console.
- Internal linking: cada artículo de blog enlaza a mínimo 2 servicios; cada servicio enlaza a 1-2 artículos relacionados.

### Keywords core

- arreglos de ropa Valencia
- arreglos de ropa Marxalenes
- arreglar ropa comprada online
- ajustar ropa nueva
- modista Valencia
- bajo de pantalón Valencia
- ajuste de cintura Valencia
- modista Marxalenes
- arreglos de ropa online España

### Estrategia de contenido

- **Cluster temático:** todo orbita alrededor de arreglos de ropa, fit perfecto, compras online problemáticas, cuidado y longevidad de prendas.
- **Intent match:** identificar si la query es informacional, comparativa o transaccional, y adaptar formato.
- **Estructura artículo blog:** H1 con keyword → introducción (problema) → desarrollo (solución) → CTA contextual (no genérico).
- **Extensión:** artículos blog 800-1500 palabras. Páginas de servicio 300-600 palabras.

---

## Rendimiento

### Objetivos

- **Lighthouse Performance:** > 85 mobile
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **INP:** < 200ms

### Reglas

- **Imágenes:** Máximo 200KB por imagen visible en viewport. Usar `image_url` con `width` y `format: 'webp'`. Implementar `srcset` con `sizes` para responsive. Lazy loading excepto LCP image (hero).
- **Fonts:** Solo Cormorant Garamond y Red Hat Text. `font-display: swap`. Preload de Cormorant 400 (peso usado en hero, LCP).
- **JS:** No añadir librerías externas sin justificación. Vanilla JS o web components Dawn-style. Defer/async para no críticos.
- **CSS:** Inline critical CSS para hero. Resto cargado normalmente. No cargar hojas completas si solo se usa una fracción.
- **Third-party scripts:** Meta Pixel y GA con `defer`. Evaluar impacto de cada script externo. Cuestionar apps de Shopify pesadas.
- **Shopify-specific:** Usar `asset_url | stylesheet_tag`. Minimizar uso de apps. Web Pixel API en lugar de scripts en theme cuando sea posible.

---

## Generación de contenido

### Para páginas de servicio (products)

Cada servicio incluye:
- **Título claro:** Qué arreglo es (ej: "Ajuste de largo de pantalón")
- **Descripción:** Problema → Cómo lo hacemos → Resultado. 150-300 palabras
- **Detalles prácticos:** Tiempo estimado, precio orientativo, qué incluye
- **CTA doble:** Botón contratar + enlace WhatsApp como alternativa
- **FAQ del servicio:** 3-5 preguntas específicas

### Para blog

- Tono educativo-comercial: informar y dirigir al servicio sin invadir
- Mínimo 1 imagen relevante con alt text
- CTA contextual al final, no genérico
- Formato escaneable: párrafos cortos, subtítulos claros, negritas en puntos clave

### Para landing / hero

- **Headline:** Máximo 8 palabras. Beneficio, no servicio.
  - ✅ "Que tu ropa te quede perfecta"
  - ❌ "Servicio profesional de arreglos de ropa"
- **Subheadline:** 1 frase explicando el cómo o dando contexto
- **CTA primario:** Acción clara con verbo ("Pregúntanos por WhatsApp", "Ven al taller")
- **Visual:** Imagen del oficio (manos, prenda en proceso, dedal, alfileres) con luz natural cálida

---

## Checklist antes de commitear

- [ ] ¿El cambio se ve bien en mobile (375px), tablet (768px) y desktop (1440px)?
- [ ] ¿Todos los textos visibles son editables desde el admin de Shopify?
- [ ] ¿Las imágenes tienen alt text descriptivo y están optimizadas?
- [ ] ¿Se mantiene la jerarquía de headings correcta (un solo h1)?
- [ ] ¿No se rompió ningún flujo de conversión existente (carrito, checkout, WhatsApp)?
- [ ] ¿El Lighthouse score no bajó por debajo de 85 mobile?
- [ ] ¿Los cambios están comentados con tag MANIQUI y fecha?
- [ ] ¿Se respeta el tono de voz, paleta y tipografías del branding kit v3.2?
- [ ] ¿La jerarquía de canales (WhatsApp > Taller > Online) se preserva?
- [ ] ¿Cero datos inventados (nombres modistas, métricas, dirección)?

---

## Contexto adicional para Claude Code

- El propietario (Alessandro) es consultor digital con conocimiento técnico de Shopify/Liquid, Meta Ads, copywriting, automatizaciones (Make.com), web development. Hablar en términos técnicos sin simplificar.
- Priorizar **ejecución sobre perfección**. Iterar rápido, validar, ajustar.
- Ante dudas de diseño o copy, **proponer una opción concreta** en vez de pedir instrucciones. Argumentar el porqué de la decisión.
- Si un cambio tiene implicaciones en SEO o rendimiento, **mencionarlo proactivamente**.
- **Presupuesto limitado:** evitar apps de pago cuando exista alternativa con código custom. No recomendar SaaS innecesarios.
- **Mercado local:** Valencia ciudad y área metropolitana. Todo el contenido, SEO y estrategia debe reflejar esto.
- **Honestidad técnica:** si un approach del usuario es subóptimo, decirlo. Alessandro espera pushback fundamentado, no asentimiento.
- **Trabajar siempre en development store o theme unpublished,** nunca en theme live de producción sin confirmación explícita.
