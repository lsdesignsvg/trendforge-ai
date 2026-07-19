# TrendForge AI

TrendForge AI es una plataforma SaaS para analizar tendencias de redes sociales, descubrir contenido viral, estudiar competidores y generar contenido con inteligencia artificial.

## Estructura propuesta

- apps/web: frontend en Next.js 15 + React 19 + TypeScript
- apps/api: backend en NestJS
- packages/ui: componentes compartidos
- packages/database: modelo Prisma y acceso a datos
- packages/auth: autenticación y autorización
- packages/ai: integración con modelos de IA
- packages/analytics: métricas y eventos
- workers/trends: procesos de recolección y análisis
- workers/scheduler: programación de tareas
- workers/notifications: notificaciones y recordatorios

## Objetivos iniciales

1. Landing premium y experiencia de producto
2. Dashboard con métricas clave y módulos de producto
3. Base de arquitectura para autenticación, pagos y módulos IA
4. Preparación para escalar a producción con seguridad y observabilidad

## Comandos útiles

- `cd apps/web && npm run dev`
- `cd apps/web && npm run build`
