# PROYECTO: Escudo Digital Familiar

## Contexto
Estás creando una plataforma web premium desplegable en Vercel para presentar y aplicar un método de protección digital de menores basado en 2 capas:
1. DNS de protección (barrera preventiva)
2. Control parental (gestión de apps, horarios, permisos)

De momento NO usar Supabase, NO login, NO base de datos, NO backend complejo. La plataforma queda abierta. Más adelante se añadirá autenticación.

El objetivo es una plataforma visual de presentación y guiado paso a paso para configurar dispositivos, redes WiFi, datos móviles, navegadores y routers.

## Stack OBLIGATORIO
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide Icons
- contenido local en archivos TypeScript dentro de /content
- imágenes en /public/images y /public/illustrations
- deploy final en Vercel

## NO USAR
- Supabase, Prisma, base de datos, autenticación, pagos, backend innecesario, librerías experimentales

## CALIDAD ESPERADA
Estilo Apple / Stripe / Linear / Vercel. Transmitir seguridad, familia, tecnología, calma. Mucho espacio, buenas tarjetas, iconografía profesional, navegación fluida, responsive perfecto.

## TAREAS DE ESTA FASE

### 1. Inicializar proyecto Next.js
- Crear proyecto Next.js con App Router y TypeScript
- Instalar Tailwind CSS, shadcn/ui, Framer Motion, Lucide Icons
- Configurar estructura de carpetas

### 2. Estructura de carpetas
```
escudo-digital-familiar/
├── app/
│   ├── page.tsx
│   ├── metodo/page.tsx
│   ├── presentacion/page.tsx
│   ├── configurador/page.tsx
│   ├── guias/android/page.tsx
│   ├── guias/ios/page.tsx
│   ├── guias/windows/page.tsx
│   ├── guias/macos/page.tsx
│   ├── guias/router/page.tsx
│   ├── guias/navegadores/page.tsx
│   ├── familias/page.tsx
│   ├── colegios/page.tsx
│   ├── parroquias/page.tsx
│   ├── faq/page.tsx
│   ├── descargas/page.tsx
│   ├── legal/page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   ├── ui/
│   ├── shared/
│   └── configurator/
├── content/
├── lib/
├── public/images/
├── public/illustrations/
└── public/downloads/
```

### 3. Configurar
- layout global con metadata
- fuente moderna (Inter o similar)
- tema visual premium en globals.css
- tailwind.config con tokens de diseño
- utilidades cn
- Navbar y Footer básicos
- README con instrucciones de instalación, desarrollo y despliegue

### 4. Componentes base
- components/layout/Navbar.tsx
- components/layout/Footer.tsx
- components/shared/Container.tsx
- components/shared/Section.tsx
- components/shared/PremiumCard.tsx
- components/shared/Badge.tsx

### 5. Páginas placeholder
Crear app/layout.tsx y todas las páginas de la estructura de carpetas con contenido mínimo (título y descripción), para que las rutas existan y el build pase.

### 6. Verificar
- npm install correcto
- npm run build sin errores
