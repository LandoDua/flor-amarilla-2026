# AGENTS.md - Contexto para Agentes de IA

Guia completa para agentes de IA que trabajen en este proyecto.

## Vision General

**flor-amarilla-2026** es una aplicacion web de una sola pagina (SPA) que muestra una carta animada de flores amarillas. Fue creada como regalo personal para el Dia de las Flores Amarillas 2026.

- **Stack**: React 19 + Vite 8 + Framer Motion
- **Idioma**: JavaScript (JSX) - sin TypeScript
- **Estilo**: Sin framework CSS, estilos manuales en CSS
- **Deploy**: GitHub Pages via GitHub Actions
- **PWA**: Si, instalable y funciona offline

## Arquitectura

### Flujo de la Aplicacion

```
index.html
  └─ src/main.jsx (punto de entrada)
       └─ src/App.jsx (orquestador principal)
            ├─ LoadingScreen.jsx (pantalla de carga animada)
            ├─ FlowerCollage.jsx (motor de cuadricula)
            │    ├─ FlowerCutout.jsx (flor individual animada)
            │    └─ FinalMessage.jsx (mensaje romantico)
            └─ CSS (App.css + index.css)
```

### Componentes

#### App.jsx
- **Responsabilidad**: Orquestar el estado de carga y renderizar componentes principales
- **Estado**: `isLoading` (boolean) - controla cuando mostrar las flores
- **Logica**: Precarga todas las imagenes de flores antes de mostrar la app
- **Datos**: Array `allFlowers` con las rutas de todas las imagenes

#### LoadingScreen.jsx
- **Responsabilidad**: Mostrar pantalla de carga animada
- **Props**: `show` (boolean) - controla visibilidad
- **Animaciones**: SVG de girasol pulsante + texto con opacidad variable
- **Exit**: Transicion de desvanecimiento al ocultarse

#### FlowerCollage.jsx
- **Responsabilidad**: Generar y renderizar la cuadricula de flores
- **Funciones**:
  - `generateFlowerPositions(cols, rows)`: Genera posiciones aleatorias con jitter
  - `pickImage()`: Selecciona flor aleatoria (82% amarilla, 18% otro color)
- **Estado**: `visibleCount` - controla cuantas flores son visibles (aparecen una por una)
- **Constantes**:
  - `yellowFlowers`: Array de flores amarillas (girasoles, tulipanes, lirios, dientes de leon)
  - `otherFlowers`: Array de flores de otros colores (lila, violeta)

#### FlowerCutout.jsx
- **Responsabilidad**: Renderizar una flor individual con animacion de wobble
- **Props**: `src`, `style`, `delay`, `size`
- **Animaciones**:
  - Entrada: Escala de 0.15 a 1 con spring
  - Wobble infinito: Movimiento en X, Y y rotacion con steps
  - Opacidad variable durante wobble
- **Configuracion aleatoria**: Cada flor tiene su propio patron de wobble

#### FinalMessage.jsx
- **Responsabilidad**: Mostrar el mensaje romantico final
- **Props**: `show` (boolean) - controla visibilidad
- **Animaciones**: Cada linea aparece con delay escalonado
- **Contenido**: 3 lineas de texto (modificables)

### Archivos CSS

#### index.css
- Reset global de estilos
- Importacion de Google Fonts (Inter)
- Variables CSS basicas

#### App.css
- Estilos del tablero de corcho/newspaper
- Grid de flores (.collage-container)
- Pantalla de carga (.loading-screen)
- Mensaje final (.final-message)
- Responsive design
- Animaciones CSS complementarias

### Assets

#### public/flowers/
- 26 imagenes PNG con fondo transparente
- Tipos: sunflower (8), tulip (6), lilium (4), dandelion (3), lilac (3), viola (2)
- Tamanos variables (500x500px aprox)
- **IMPORTANTE**: Al agregar/quitar flores, actualizar arrays en App.jsx y FlowerCollage.jsx

#### public/favicon.svg
- Icono SVG de girasol para la app

#### public/icons.svg
- Sprite de iconos SVG (no se usa activamente)

## Convenciones de Codigo

### JavaScript/JSX
- Sin TypeScript - usar JavaScript puro con JSX
- Componentes funcionales con hooks
- Imports: usar `import` estandar (ES Modules)
- Nomenclatura: PascalCase para componentes, camelCase para variables/funciones
- No hay state management global (solo useState local)

### CSS
- Sin framework CSS (no Tailwind, no CSS-in-JS)
- Estilos manuales en archivos CSS separados
- Clases con naming convencional (sin BEM estricto)
- Variables CSS limitadas (colores hardcoded en componentes)
- Responsive design con media queries

### Animaciones (Framer Motion)
- Usar `motion` components de framer-motion
- Animaciones de entrada: `initial` + `animate`
- Animaciones infinitas: `repeat: Infinity`
- Transiciones: usar `type: "spring"` o `type: "steps"` segun necesidad
- AnimatePresence para animaciones de salida

## Guias de Desarrollo

### Agregar una nueva flor

1. Colocar imagen PNG en `public/flowers/`
2. Agregar ruta en `src/App.jsx` al array `allFlowers`:
   ```javascript
   const allFlowers = [
     // ... existing flowers
     `${base}flowers/nueva-flor.png`,
   ];
   ```
3. Agregar en `src/components/FlowerCollage.jsx`:
   - Si es amarilla: agregar a `yellowFlowers`
   - Si es de otro color: agregar a `otherFlowers`
4. Probar que la imagen carga correctamente

### Modificar el grid de flores

En `src/components/FlowerCollage.jsx`:

```javascript
// Cambiar numero de columnas y filas
const flowers = useMemo(() => generateFlowerPositions(6, 10), []);
//                                                    ^cols ^rows
```

Para ajustar tamanos, modificar los rangos en `generateFlowerPositions`:

```javascript
if (sizeRoll < 0.1) {
  size = rand(65, 90);    // Rango de tamano pequenas
}
// ... otros rangos
```

### Cambiar el fondo

En `src/App.css`, buscar la seccion `.newspaper-bg` y modificar:
- Color de fondo
- Textura (background-image)
- Opacidad

### Modificar animaciones de flores

En `src/components/FlowerCutout.jsx`, modificar `wobbleConfig`:

```javascript
const wobbleConfig = {
  xOffsets: [0, rand(-8, 8), ...],  // Movimiento en X
  yOffsets: [0, rand(-5, 5), ...],  // Movimiento en Y
  rotations: [0, rand(-6, 6), ...], // Rotacion
  opacities: [1, rand(0.7, 0.95), ...], // Opacidad
  duration: rand(2.5, 4.5),  // Duracion del ciclo
  steps: Math.floor(rand(3, 6)),  // Suavidad del movimiento
};
```

### Cambiar el mensaje final

En `src/components/FinalMessage.jsx`, modificar el contenido JSX directamente. Cada linea es un `<motion.p>` con su propio delay.

## Configuracion de Herramientas

### Vite (vite.config.js)

```javascript
// Plugins activos
plugins: [
  react(),           // Soporte JSX + HMR
  VitePWA({...})    // PWA + caching
]

// Configuracion importante
base: '/flor-amarilla-2026/'  // Subdirectorion en GitHub Pages
server: {
  host: '0.0.0.0',  // Accesible en red local
  port: 5173
}
```

### PWA (vite-plugin-pwa)

- **registerType**: 'autoUpdate' - actualizacion automatica
- **Cache**: CacheFirst para imagenes de flores (1 ano TTL)
- **Manifest**: Configurado en vite.config.js
- **Icono**: SVG inline en el manifest

### Oxlint (.oxlintrc.json)

Reglas activas:
- `react/rules-of-hooks`: error
- `react/only-export-components`: warn

Ejecutar: `npm run lint`

### GitHub Actions (.github/workflows/deploy.yml)

- Trigger: push a `main`
- Build: `npm ci && npm run build`
- Deploy: GitHub Pages via `actions/deploy-pages`
- Node: 20

## Comandos Utiles

```bash
# Desarrollo
npm run dev          # Dev server en http://localhost:5173

# Build
npm run build        # Construye en dist/
npm run preview      # Preview del build

# Codigo
npm run lint         # Ejecutar Oxlint

# Git
git status           # Ver cambios
git add .            # Agregar todos los cambios
git commit -m "msg"  # Commitear
git push             # Subir a GitHub
```

## Troubleshooting

### Las flores no aparecen
- Verificar que las imagenes PNG existen en `public/flowers/`
- Revisar consola del navegador por errores 404
- Verificar que las rutas en App.jsx y FlowerCollage.jsx son correctas

### Animaciones no funcionan
- Verificar que framer-motion esta instalado: `npm ls framer-motion`
- Revisar consola por errores de importacion

### PWA no se instala
- Verificar que el build fue exitoso
- Revisar que el service worker se registro (Application > Service Workers en DevTools)
- Probar en modo incognito

### Build falla
- Ejecutar `npm run lint` para ver errores
- Verificar version de Node.js (requiere 20+)
- Limpiar node_modules: `rm -rf node_modules && npm install`
