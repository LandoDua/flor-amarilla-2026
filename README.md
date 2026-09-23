# Flores Amarillas 2026

Carta animada de flores amarillas para el Dia de las Flores Amarillas 2026. Una aplicacion web interactiva que muestra un ramo virtual de flores sobre un tablero de corcho, con animaciones suaves y un mensaje romántico al final.

![Flores Amarillas](public/flowers/sunflower1.png)

## Demo

🔗 [Ver demo en GitHub Pages](https://orlandodua.github.io/flor-amarilla-2026/)

## Tecnologias

| Tecnologia | Version | Uso |
|------------|---------|-----|
| React | 19.2.8 | Framework UI |
| Vite | 8.3.0 | Build tool y dev server |
| Framer Motion | 13.4.0 | Animaciones |
| vite-plugin-pwa | 1.3.0 | PWA (instalable offline) |
| Oxlint | 1.81.0 | Linter |

## Inicio Rapido

### Prerrequisitos

- Node.js 20+
- npm o yarn

### Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/OrlandoDua/flor-amarilla-2026.git
cd flor-amarilla-2026

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La app estara disponible en `http://localhost:5173`

### Otros comandos

```bash
npm run build    # Construir para produccion
npm run preview  # Vista previa de la construccion
npm run lint     # Ejecutar linter (Oxlint)
```

## Personalizacion

### Cambiar nombre y destinatario

Edita `src/App.jsx` y busca las lineas:

```jsx
<motion.div className="caption-top" ...>
  Para: luly
</motion.div>

<motion.div className="signature-bottom" ...>
  Orlando
</motion.div>
```

Cambia `luly` y `Orlando` por los nombres que desees.

### Cambiar el mensaje final

Edita `src/components/FinalMessage.jsx`:

```jsx
const lines = [
  "Tal vez no sean reales",
  "Pero no te quedas sin tus flores amarillas",
  "TE AMO",
];
```

Modifica el array `lines` con tu mensaje personalizado. Puedes agregar o quitar lineas.

### Agregar o quitar flores

1. Coloca tus imagenes PNG con fondo transparente en `public/flowers/`
2. Actualiza los arrays en `src/App.jsx` y `src/components/FlowerCollage.jsx`:

```javascript
// En App.jsx - lista completa de flores para precarga
const allFlowers = [
  `${base}flowers/tu-flor.png`,
  // ...
];

// En FlowerCollage.jsx - dividir por categorias
const yellowFlowers = [
  `${base}flowers/tu-flor-amarilla.png`,
  // ...
];

const otherFlowers = [
  `${base}flowers/tu-flor-otro-color.png`,
  // ...
];
```

### Ajustar probabilidad de colores

En `src/components/FlowerCollage.jsx`, modifica la funcion `pickImage`:

```javascript
const pickImage = () => {
  if (Math.random() < 0.82) {  // 82% probabilidad amarilla
    return yellowFlowers[Math.floor(Math.random() * yellowFlowers.length)];
  }
  return otherFlowers[Math.floor(Math.random() * otherFlowers.length)];
};
```

Cambia `0.82` para ajustar la proporcion (0.5 = 50%, 1.0 = 100% amarillas).

### Modificar el grid de flores

En `src/components/FlowerCollage.jsx`, busca:

```javascript
const flowers = useMemo(() => generateFlowerPositions(6, 10), []);
```

Los parametros son `(columnas, filas)`. Por defecto es 6x10 = 60 flores.

Tambien puedes ajustar el tamano de las flores en la funcion `generateFlowerPositions`:

```javascript
// Distribucion de tamanos (valores en pixeles)
if (sizeRoll < 0.1) {
  size = rand(65, 90);    // 10% pequenas
} else if (sizeRoll < 0.3) {
  size = rand(90, 120);   // 20% medianas-pequenas
} else if (sizeRoll < 0.6) {
  size = rand(120, 160);  // 30% medianas
} else if (sizeRoll < 0.85) {
  size = rand(160, 210);  // 25% grandes
} else {
  size = rand(210, 260);  // 15% muy grandes
}
```

### Cambiar el fondo

Los estilos estan en `src/App.css`. Busca la seccion `newspaper-bg` para modificar la textura o colores del tablero de corcho.

### Cambiar colores de la app

Edita `src/index.css` para cambiar los colores globales:

```css
:root {
  font-family: ...;
  color: ...;
  background-color: ...;
}
```

Tambien edita `vite.config.js` para cambiar el color del tema PWA:

```javascript
manifest: {
  theme_color: '#f5f0e1',  // Color de la barra de estado
  background_color: '#f5f0e1',
}
```

## Estructura del Proyecto

```
flor-amarilla-2026/
├── public/
│   ├── favicon.svg          # Icono de la app
│   ├── icons.svg            # Sprite de iconos SVG
│   └── flowers/             # 26 imagenes de flores PNG
├── src/
│   ├── main.jsx             # Punto de entrada de React
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos principales
│   ├── index.css            # Reset global y fuentes
│   └── components/
│       ├── LoadingScreen.jsx   # Pantalla de carga animada
│       ├── FlowerCollage.jsx   # Motor de cuadricula de flores
│       ├── FlowerCutout.jsx    # Flor individual con animacion
│       └── FinalMessage.jsx    # Mensaje romantico final
├── .github/workflows/
│   └── deploy.yml           # CI/CD para GitHub Pages
├── index.html               # Shell HTML
├── vite.config.js           # Configuracion de Vite + PWA
└── package.json
```

## Despliegue

### GitHub Pages (automatico)

El proyecto incluye un workflow de GitHub Actions que despliega automaticamente al hacer push en la rama `main`.

1. Sube tus cambios a GitHub
2. Ve a **Settings > Pages** en tu repositorio
3. Selecciona **GitHub Actions** como source

La app estara disponible en: `https://tu-usuario.github.io/flor-amarilla-2026/`

### Otros servidores

```bash
npm run build
```

Sube la carpeta `dist/` a cualquier servidor estatico (Netlify, Vercel, tu propio servidor, etc.).

**Importante:** Si despliegues en un subdirectorio diferente a `/flor-amarilla-2026/`, cambia la variable `base` en `vite.config.js`:

```javascript
base: '/tu-subdirectorio/',
```

## PWA (Progressive Web App)

La app es instalable y funciona offline. Los usuarios pueden instalarla desde su navegador.

- Se descarga automaticamente al primer uso
- Las imagenes de flores se cachean para uso offline
- Icono personalizable en `vite.config.js`

## Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.
