# Escudo Digital Familiar

Plataforma web premium para presentar y aplicar un método de protección digital de menores basado en 2 capas: DNS de protección + control parental.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Componentes:** shadcn/ui
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Despliegue:** Vercel

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build

```bash
npm run build
npm start
```

## Estructura del proyecto

```
src/
├── app/                    # Rutas de la aplicación (App Router)
│   ├── layout.tsx          # Layout global con Navbar y Footer
│   ├── page.tsx            # Landing page (/)
│   ├── metodo/             # /metodo
│   ├── presentacion/       # /presentacion
│   ├── configurador/       # /configurador
│   ├── guias/
│   │   ├── android/        # /guias/android
│   │   ├── ios/            # /guias/ios
│   │   ├── windows/        # /guias/windows
│   │   ├── macos/          # /guias/macos
│   │   ├── router/         # /guias/router
│   │   └── navegadores/    # /guias/navegadores
│   ├── familias/           # /familias
│   ├── colegios/           # /colegios
│   ├── parroquias/         # /parroquias
│   ├── faq/                # /faq
│   ├── descargas/          # /descargas
│   └── legal/              # /legal
├── components/
│   ├── ui/                 # Componentes base (Container, Section, PremiumCard, Badge)
│   └── layout/             # Navbar y Footer
├── content/                # Contenido local (guías, datos)
├── lib/                    # Utilidades y helpers
└── hooks/                  # Custom hooks
public/
└── images/                 # Recursos estáticos
```

## Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube el repositorio a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa el repositorio
4. Vercel detectará automáticamente Next.js y configurará el build
5. Haz clic en **Deploy**

### Opción 2: CLI

```bash
npm i -g vercel
vercel
```

### Variables de entorno

No se requieren variables de entorno. Todo el contenido es local.

## Paleta de colores

| Color | Uso |
|-------|-----|
| Azul profundo (brand) | Seguridad, confianza |
| Cian suave (cyan) | Tecnología |
| Naranja (accent) | Acompañamiento |
| Verde (success) | Configuración correcta |
| Gris pizarra (slate) | Textos |

## Licencia

Todos los derechos reservados.
