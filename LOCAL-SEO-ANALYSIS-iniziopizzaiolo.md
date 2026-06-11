# Local SEO Analysis — iniziopizzaiolo.com
**Fecha:** 2026-06-11 | **Analista:** Claude Code / seo-local skill

---

## Local SEO Score: 52/100

| Dimensión | Peso | Puntos | Score |
|---|---|---|---|
| GBP Signals | 25% | 14/25 | ⚠️ Parcial |
| Reviews & Reputación | 20% | 9/20 | 🔴 Crítico |
| On-Page Local SEO | 20% | 13/20 | ⚠️ Parcial |
| NAP & Citas | 15% | 7/15 | ⚠️ Parcial |
| Local Schema | 10% | 7/10 | ✅ Bueno |
| Links & Autoridad Local | 10% | 2/10 | 🔴 Bajo |

---

## Tipo de negocio
**Híbrido** — Tiene ubicación fija en Madrid 28005 (talleres/cenas) + servicio a domicilio (catering en eventos). El modelo de "ubicación secreta" limita algunas señales GBP pero es parte deliberada de la marca.

## Vertical detectado
**FoodEstablishment / Experiencia Culinaria** — Talleres de cocina + cenas privadas + catering. Categoría GBP más precisa: *Cooking class* o *Pizza restaurant* (verificar cuál tiene más búsquedas en Madrid).

---

## GBP Signals — 14/25

✅ FoodEstablishment schema presente  
✅ Link de reseña Google en página (`g.page/r/...`)  
✅ Teléfono en schema (`+34614364778`)  
✅ `servesCuisine: "Neapolitan Pizza"` presente  
❌ Sin embed de Google Maps / iframe  
❌ Sin widget de reseñas GBP embebido  
❌ Sin `openingHoursSpecification` en schema  
❌ Sin referencia a horario de atención en página  
❌ GBP profile URL no incluido en `sameAs`  
❌ Sin categorías secundarias verificables en página  

---

## Reviews & Reputación — 9/20

⚠️ `aggregateRating: 5.0 / reviewCount: 3` en schema (testimonios internos)  
🔴 **Solo 3 reseñas Google** — umbral mínimo es 10 (Sterling Sky). La regla de los 18 días aplica: sin nueva reseña cada 3 semanas = caída de posición.  
✅ CTA "Déjanos tu reseña en Google ⭐" presente en sección de reseñas  
✅ 3 testimonios en página (María, Ignacio, Rafael)  
❌ Sin presencia verificable en Yelp, TripAdvisor, o Facebook Reviews  
❌ Sin respuestas de propietario visibles (no hay reseñas públicas aún)  
❌ 74% de consumidores solo considera reseñas de los últimos 3 meses — velocidad crítica ahora  

**Acción urgente:** Las 6 plantillas WhatsApp ya están listas (sprint anterior). Usarlas YA con los últimos clientes del taller.

---

## On-Page Local SEO — 13/20

✅ Title: *"Inizio · Pizza napolitana en Madrid · Talleres, cenas y catering"* — ciudad + servicio ✅  
✅ H1: *"Pizza napolitana de campeonato. En Madrid."* — señal local fuerte ✅  
✅ Meta description con Madrid ✅  
✅ Páginas de servicio dedicadas: /taller/, /catering/, /cena/, /catering-bodas/ ✅  
✅ Madrid mencionado en múltiples secciones del body ✅  
❌ **Sin `tel:` link** — solo `wa.me/` links. Google no cuenta WhatsApp como señal de teléfono  
❌ Sin mapa embebido (aunque sea por modelo "ubicación secreta")  
❌ Footer sin teléfono visible ni email — solo Instagram y WhatsApp  
❌ Sin click-to-call en sección de contacto  

---

## NAP & Citas — 7/15

**Consistencia NAP (página vs schema):**

| Campo | Schema | Página HTML | Estado |
|---|---|---|---|
| Nombre | Inizio | Inizio | ✅ |
| Dirección | Madrid, 28005 (sin calle) | Madrid (28005) en FAQ | ✅ Consistente |
| Teléfono | +34614364778 | Solo en wa.me/ links | ⚠️ No como `tel:` |
| Email | No presente | No presente | ❌ |

**Citas Tier 1 detectadas:**
- Google Business Profile: ✅ verificado (sprint anterior)
- Yelp: ❌ no detectado
- TripAdvisor: ❌ pendiente registro manual
- Facebook Business: ❌ no verificable
- Apple Business Connect: ❌ no reclamado
- Bing Places: ❌ no reclamado (**crítico**: alimenta ChatGPT, Copilot, Alexa)

**Agregadores de datos (distribución automática):**
- Data Axle: ❌
- Foursquare: ❌
- Neustar/TransUnion: ❌

---

## Local Schema — 7/10

✅ `@type: ["FoodEstablishment", "LocalBusiness"]` — subtipo correcto  
✅ `aggregateRating` presente  
✅ `priceRange: "€€"` presente  
✅ `telephone` presente  
✅ `servesCuisine` presente  
✅ `hasOfferCatalog` con 3 servicios y precios  
✅ FAQPage schema con 6 preguntas  
❌ **Sin `geo` (lat/long)** — señal geográfica missing, mínimo 5 decimales  
❌ Sin `openingHoursSpecification`  
❌ `sameAs` solo incluye Instagram — falta GBP URL, TripAdvisor, etc.  
❌ `PostalAddress` sin `streetAddress` (aceptable por modelo de negocio)  
❌ `reviewCount: 3` refleja testimonios internos, no reseñas Google verificadas  

---

## Links & Autoridad Local — 2/10

❌ Sin mención de Cámara de Comercio  
❌ Sin acreditación BBB o equivalente español  
❌ Sin menciones de prensa local detectables (Time Out, ElComidista pendientes)  
❌ Sin listas "mejores talleres de pizza en Madrid" (factor #1 visibilidad IA)  
✅ Instagram @iniziorp + @rodnypizzaiolo en `sameAs`  
⚠️ El sprint anterior identificó 15 targets de menciones externas — ninguno ejecutado aún  

---

## TOP 10 Acciones Priorizadas

### 🔴 CRÍTICO

**1. Conseguir las primeras 10 reseñas Google**
Usar las 6 plantillas WhatsApp del sprint con clientes recientes. Umbral mínimo para aparecer en pack local: 10 reseñas. Regla 18 días: mínimo 1 reseña cada 3 semanas para mantener posición.
> Sin autónomo requerido.

**2. Añadir `tel:` link al footer y sección de contacto**
Google no interpreta `wa.me/` como señal de teléfono. Añadir `<a href="tel:+34614364778">` junto al WhatsApp.
> Fix de código: 5 minutos. **YA APLICADO** (ver abajo).

**3. Añadir `geo` al schema LocalBusiness**
Coordenadas de Madrid 28005 con 5 decimales mínimo. Señal geográfica crítica.
> **YA APLICADO** (ver abajo).

### 🟠 ALTA

**4. Reclamar Bing Places**
ChatGPT, Copilot y Alexa alimentan sus resultados locales desde Bing, no desde Google. Sin Bing Places = invisible en IA de Microsoft.
> Registro gratuito, sin autónomo.

**5. Reclamar Apple Business Connect**
Uso duplicado al 27% (BrightLocal 2026). Maps de iPhone + Siri + Safari búsquedas locales.
> Registro gratuito, sin autónomo.

**6. Registrar en TripAdvisor**
Fuente directa de ChatGPT para recomendaciones locales de experiencias. Ya identificado en sprint anterior.
> Sin coste, sin autónomo.

**7. Añadir `openingHoursSpecification` al schema**
Aunque los talleres son por reserva, añadir horario de atención (ej: L-V 10:00-20:00) mejora la señal. Google rankea primero negocios abiertos en el momento de búsqueda.
> Fix de código: 5 minutos.

### 🟡 MEDIA

**8. Pitch urgente a Time Out Madrid y ElComidista**
Identificados en sprint anterior como prioridad alta. Una mención = autoridad local + señal IA "best of Madrid".
> Sin autónomo.

**9. Añadir GBP URL a `sameAs` en schema**
Incluir la URL del perfil de Google Business Profile en el array `sameAs`.

**10. Completar perfil GBP con posts y fotos**
GBP Posts activos generan "Post Justifications" en resultados locales. Las fotos aumentan solicitudes de dirección un 45%.

---

## Limitaciones de este análisis

Lo que NO se pudo medir:
- Posición real en el pack local de Google (requiere herramienta geo-grid como BrightLocal o Local Falcon)
- Domain Authority / perfil de backlinks completo (requiere Ahrefs o Semrush)
- Insights de GBP (vistas, clics, llamadas) — solo disponible en el dashboard de GBP
- Estado real de citas en todos los directorios (requiere Moz Local o BrightLocal)
- Posición en ChatGPT/Perplexity para queries locales

Para análisis IA completo: ejecutar `/seo-geo https://iniziopizzaiolo.com`

---
*Generado: 2026-06-11 | seo-local skill v2026.03*
