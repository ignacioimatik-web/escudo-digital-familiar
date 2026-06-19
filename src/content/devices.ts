import type { DeviceGuide } from "@/lib/types"

export const deviceGuides: DeviceGuide[] = [
  {
    id: "android",
    titulo: "Android",
    descripcion:
      "Configura DNS privado y Google Family Link para proteger dispositivos Android.",
    dificultad: "medio",
    tiempoEstimado: "15-20 minutos",
    icono: "Smartphone",
    pasos: [
      {
        numero: 1,
        titulo: "Configurar DNS privado",
        descripcion:
          "Ve a Ajustes > Red e Internet > DNS privado. Selecciona 'Nombre del host del proveedor de DNS privado' e introduce: dns.familia.surf",
        nota: "Este DNS filtra contenido pornográfico, de apuestas y malware.",
      },
      {
        numero: 2,
        titulo: "Instalar Google Family Link",
        descripcion:
          "Descarga la app Google Family Link en el dispositivo del adulto. Crea una cuenta de Google para el menor (si no tiene) y vincúlala.",
      },
      {
        numero: 3,
        titulo: "Configurar filtros de contenido",
        descripcion:
          "En Family Link, ve a 'Gestionar configuración' > 'Filtros de Google Play'. Establece el límite de edad para apps y juegos según la recomendación por edad.",
      },
      {
        numero: 4,
        titulo: "Establecer límites de tiempo",
        descripcion:
          "Configura el tiempo diario máximo de uso y los horarios permitidos. Recomendación: sin pantallas 1h antes de dormir.",
      },
      {
        numero: 5,
        titulo: "Activar aprobación de compras",
        descripcion:
          "En Family Link, activa 'Requerir aprobación para compras'. Así ninguna compra en Play Store se realizará sin tu consentimiento.",
      },
      {
        numero: 6,
        titulo: "Revisar actividad semanal",
        descripcion:
          "Cada semana, revisa el informe de actividad en Family Link. Ajusta permisos según observes el uso real.",
      },
    ],
    advertencias: [
      {
        titulo: "El menor no debe conocer la contraseña de su cuenta",
        descripcion:
          "Si conoce la contraseña, puede desactivar Family Link en segundos.",
      },
      {
        titulo: "DNS privado no funciona en datos móviles con algunos operadores",
        descripcion:
          "Algunos operadores bloquean el DNS privado. Verifica que funcione correctamente.",
      },
    ],
    validacionFinal:
      "Intenta acceder a un sitio bloqueado (ej: un sitio de apuestas conocido). Debería mostrar error de conexión. Verifica en Family Link que los límites de tiempo funcionan correctamente.",
    erroresFrecuentes: [
      {
        problema: "El DNS privado no se guarda",
        solucion:
          "Verifica que has introducido correctamente el nombre del host: dns.familia.surf. Algunos fabricantes requieren reiniciar el dispositivo.",
      },
      {
        problema: "Family Link no envía notificaciones",
        solucion:
          "Comprueba que las notificaciones de la app Family Link están activadas en los ajustes del dispositivo del adulto.",
      },
    ],
  },
  {
    id: "iphone",
    titulo: "iPhone / iPad",
    descripcion:
      "Configura DNS personalizado y Tiempo de Uso con En Familia para proteger dispositivos Apple.",
    dificultad: "medio",
    tiempoEstimado: "15-20 minutos",
    icono: "Smartphone",
    pasos: [
      {
        numero: 1,
        titulo: "Configurar DNS personalizado",
        descripcion:
          "Ve a Ajustes > Wi-Fi > pulsa (i) junto a tu red > Configurar DNS > Manual. Elimina los existentes y añade: 145.102.6.25 (DNS de CleanBrowsing Family).",
        nota: "Este DNS filtra contenido para adultos automáticamente.",
      },
      {
        numero: 2,
        titulo: "Configurar En Familia",
        descripcion:
          "En el dispositivo del adulto: Ajustes > [tu nombre] > En Familia. Añade al menor con su Apple ID. Activa 'Compartir en familia'.",
      },
      {
        numero: 3,
        titulo: "Configurar Tiempo de Uso",
        descripcion:
          "En el dispositivo del menor: Ajustes > Tiempo de Uso. Activa 'Este es el [dispositivo] de [nombre del menor]'. Introduce el código del adulto.",
      },
      {
        numero: 4,
        titulo: "Establecer restricciones de contenido",
        descripcion:
          "Tiempo de Uso > Restricciones > Contenido y privacidad. Activa 'Restricciones de contenido'. En 'Contenido web', selecciona 'Limitar contenido para adultos'.",
      },
      {
        numero: 5,
        titulo: "Configurar límites de apps",
        descripcion:
          "Tiempo de Uso > Límites de apps. Añade categorías (Redes sociales, Juegos) y establece tiempos diarios. Recomendación: máx. 1-2h ocio digital.",
      },
      {
        numero: 6,
        titulo: "Bloquear compras",
        descripcion:
          "Tiempo de Uso > Restricciones > Compras en iTunes y App Store. En 'Requerir para comprar', selecciona 'Siempre requerir'.",
      },
    ],
    advertencias: [
      {
        titulo: "Protege el código de Tiempo de Uso",
        descripcion:
          "El menor no debe conocer el código. Si lo sabe, puede modificar todas las restricciones.",
      },
      {
        titulo: "El DNS solo funciona en Wi-Fi",
        descripcion:
          "Para proteger también en datos móviles, configura un perfil de DNS o usa el router.",
      },
    ],
    validacionFinal:
      "Intenta acceder a contenido para adultos en Safari. Debería mostrar 'Este sitio web ha sido bloqueado'. Verifica que los límites de apps funcionan: cuando se agote el tiempo, la app se bloquea.",
    erroresFrecuentes: [
      {
        problema: "No puedo acceder a sitios web legítimos",
        solucion:
          "Algunos sitios pueden ser bloqueados por error. Añade excepciones en Tiempo de Uso > Restricciones > Contenido web > Permitir siempre.",
      },
      {
        problema: "El menor desactiva el DNS",
        solucion:
          "En Tiempo de Uso > Restricciones > Cambios de cuenta, bloquea los cambios de configuración de red con el código del adulto.",
      },
    ],
  },
  {
    id: "windows",
    titulo: "Windows",
    descripcion:
      "Configura DNS manual y Microsoft Family Safety para proteger ordenadores Windows.",
    dificultad: "medio",
    tiempoEstimado: "15-25 minutos",
    icono: "Monitor",
    pasos: [
      {
        numero: 1,
        titulo: "Configurar DNS manual",
        descripcion:
          "Panel de Control > Redes e Internet > Centro de redes > Cambiar configuración del adaptador > clic derecho en tu conexión > Propiedades > IPv4 > Propiedades. DNS preferido: 145.102.6.25. DNS alternativo: 145.102.6.26.",
      },
      {
        numero: 2,
        titulo: "Crear cuenta Microsoft para el menor",
        descripcion:
          "Si el menor no tiene cuenta Microsoft, créala en account.microsoft.com/family. Añádela a tu grupo familiar.",
      },
      {
        numero: 3,
        titulo: "Configurar Microsoft Family Safety",
        descripcion:
          "Inicia sesión en family.microsoft.com con tu cuenta. Selecciona al menor y configura los filtros de contenido web, apps y juegos.",
      },
      {
        numero: 4,
        titulo: "Establecer límites de tiempo de pantalla",
        descripcion:
          "En Family Safety > Tiempo en pantalla, establece horarios permitidos y tiempo máximo diario por dispositivo.",
      },
      {
        numero: 5,
        titulo: "Activar informe de actividad",
        descripcion:
          "Activa los informes semanales por email para recibir un resumen de la actividad digital del menor.",
      },
      {
        numero: 6,
        titulo: "Configurar Edge con protección",
        descripcion:
          "Asegúrate de que el menor use Microsoft Edge (no Chrome u otro navegador sin filtros). Edge respeta los filtros de Family Safety.",
      },
    ],
    advertencias: [
      {
        titulo: "El menor no debe tener permisos de administrador",
        descripcion:
          "Crea una cuenta estándar para el menor. Con permisos de admin puede desactivar todos los filtros.",
      },
      {
        titulo: "Los filtros solo funcionan en Edge",
        descripcion:
          "Si el menor usa Chrome o Firefox, los filtros de Family Safety no se aplican. Bloquea la instalación de otros navegadores.",
      },
    ],
    validacionFinal:
      "Intenta acceder a un sitio bloqueado en Edge. Debería mostrar página de bloqueo. Verifica que el límite de tiempo funciona: al agotarse, se bloquea el acceso al equipo.",
    erroresFrecuentes: [
      {
        problema: "Los cambios de DNS no se aplican",
        solucion:
          "Abre la terminal (cmd) y ejecuta: ipconfig /flushdns. Reinicia el navegador.",
      },
      {
        problema: "Family Safety no sincroniza",
        solucion:
          "Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft (no con cuenta local). Verifica la conexión a Internet.",
      },
    ],
  },
  {
    id: "macos",
    titulo: "macOS",
    descripcion:
      "Configura DNS manual y Tiempo de Uso para proteger ordenadores Mac.",
    dificultad: "medio",
    tiempoEstimado: "15-20 minutos",
    icono: "Monitor",
    pasos: [
      {
        numero: 1,
        titulo: "Configurar DNS manual",
        descripcion:
          "Preferencias del Sistema > Red > Wi-Fi (o Ethernet) > Avanzado > DNS. Pulsa + y añade: 145.102.6.25 y 145.102.6.26. Aceptar y Aplicar.",
      },
      {
        numero: 2,
        titulo: "Configurar En Familia",
        descripcion:
          "Preferencias del Sistema > En Familia. Añade al menor con su Apple ID. Activa el uso compartido.",
      },
      {
        numero: 3,
        titulo: "Configurar Tiempo de Uso",
        descripcion:
          "Preferencias del Sistema > Tiempo de Uso. Activa las opciones para el menor. Establece el código de acceso (diferente al del menor).",
      },
      {
        numero: 4,
        titulo: "Restringir contenido web",
        descripcion:
          "Tiempo de Uso > Contenido y privacidad > Restricciones de contenido > Contenido web. Selecciona 'Limitar contenido para adultos'.",
      },
      {
        numero: 5,
        titulo: "Establecer límites de apps",
        descripcion:
          "Tiempo de Uso > Límites de apps. Configura tiempos máximos para categorías como Redes Sociales y Juegos.",
      },
      {
        numero: 6,
        titulo: "Bloquear cambios de configuración",
        descripcion:
          "Contenido y privacidad > Restricciones > Cambios de cuenta. Selecciona 'No permitir' para que el menor no pueda modificar el DNS u otras configuraciones.",
      },
    ],
    advertencias: [
      {
        titulo: "Protege el código de Tiempo de Uso",
        descripcion:
          "El menor no debe conocer el código. Si lo sabe, puede desactivar todas las restricciones.",
      },
      {
        titulo: "El DNS solo protege en esta red",
        descripcion:
          "Si el Mac se conecta a otra red Wi-Fi, mantendrá el DNS. Pero si el menor reinicia el router, podría perderse la configuración.",
      },
    ],
    validacionFinal:
      "Intenta acceder a contenido para adultos en Safari. Debería mostrar 'Sitio web bloqueado'. Verifica que los límites de apps funcionan correctamente.",
    erroresFrecuentes: [
      {
        problema: "No puedo guardar los cambios de DNS",
        solucion:
          "Necesitas permisos de administrador. Introduce la contraseña de tu cuenta cuando se solicite.",
      },
      {
        problema: "El menor puede cambiar el DNS",
        solucion:
          "En Tiempo de Uso > Contenido y privacidad > Restricciones > Cambios de cuenta, selecciona 'No permitir'.",
      },
    ],
  },
  {
    id: "router",
    titulo: "Router",
    descripcion:
      "Configura DNS de protección en el router para proteger todos los dispositivos de la red doméstica.",
    dificultad: "avanzado",
    tiempoEstimado: "20-30 minutos",
    icono: "Router",
    pasos: [
      {
        numero: 1,
        titulo: "Acceder al panel del router",
        descripcion:
          "Abre un navegador y escribe la IP del router (normalmente 192.168.1.1 o 192.168.0.1). Introduce usuario y contraseña (consultar la pegatina del router o el manual).",
        nota: "Si no sabes la IP, en Windows ejecuta 'ipconfig' en CMD. En Mac/Linux, 'ifconfig' o 'ip addr' en terminal.",
      },
      {
        numero: 2,
        titulo: "Localizar la configuración DNS",
        descripcion:
          "Busca la sección WAN, Internet o DNS. Varía según el fabricante. Puede estar en 'Configuración básica' o 'Configuración avanzada'.",
      },
      {
        numero: 3,
        titulo: "Cambiar los DNS",
        descripcion:
          "Sustituye los DNS actuales por: DNS primario: 145.102.6.25 / DNS secundario: 145.102.6.26 (CleanBrowsing Family). Guarda los cambios.",
      },
      {
        numero: 4,
        titulo: "Reiniciar el router",
        descripcion:
          "Apaga el router, espera 10 segundos y vuelve a encenderlo. Espera 2-3 minutos a que conecte completamente.",
      },
      {
        numero: 5,
        titulo: "Reconectar dispositivos",
        descripcion:
          "Desconecta y vuelve a conectar todos los dispositivos a la red Wi-Fi para que obtengan los nuevos DNS.",
      },
      {
        numero: 6,
        titulo: "Validar la configuración",
        descripcion:
          "Visita dnsleaktest.com desde un dispositivo conectado. Verifica que los DNS mostrados corresponden a los configurados (145.102.6.25 / 145.102.6.26).",
      },
    ],
    advertencias: [
      {
        titulo: "Haz una copia de la configuración original",
        descripcion:
          "Antes de cambiar nada, anota los DNS originales por si necesitas revertir los cambios.",
      },
      {
        titulo: "Algunos routers requieren DNS sobre HTTPS",
        descripcion:
          "Routers modernos pueden requerir configuración adicional para DoH. Consulta el manual del fabricante.",
      },
    ],
    validacionFinal:
      "Desde cualquier dispositivo de la red, intenta acceder a un sitio para adultos conocido. Debería mostrar error de conexión. Visita dnsleaktest.com para confirmar que los DNS son correctos.",
    erroresFrecuentes: [
      {
        problema: "No puedo acceder al panel del router",
        solucion:
          "Verifica la IP del router. Si no funciona, prueba 192.168.1.1, 192.168.0.1, o 192.168.1.254. Si nada funciona, pulsa el botón reset del router 10 segundos.",
      },
      {
        problema: "Los dispositivos no obtienen los nuevos DNS",
        solucion:
          "Renueva la IP de cada dispositivo: en Windows 'ipconfig /release' y 'ipconfig /renew'. En Mac/Linux, desactiva y reactiva Wi-Fi.",
      },
    ],
  },
  {
    id: "navegador",
    titulo: "Navegadores",
    descripcion:
      "Configura DNS seguro (DoH) en Chrome, Edge, Firefox y Opera para filtrar contenido a nivel de navegador.",
    dificultad: "facil",
    tiempoEstimado: "5-10 minutos por navegador",
    icono: "Globe",
    pasos: [
      {
        numero: 1,
        titulo: "Chrome: Activar DNS seguro",
        descripcion:
          "Configuración > Privacidad y seguridad > Seguridad > Usar DNS seguro > Activar. Selecciona 'Con' > Elige 'CleanBrowsing' o introduce URL personalizada: https://dns.familia.surf/dns-query",
      },
      {
        numero: 2,
        titulo: "Edge: Activar DNS seguro",
        descripcion:
          "Configuración > Privacidad, búsqueda y servicios > Seguridad > Usar DNS seguro para especificar cómo se resuelven las direcciones DNS > Activar. Elige un proveedor o introduce URL personalizada.",
      },
      {
        numero: 3,
        titulo: "Firefox: Habilitar DNS sobre HTTPS",
        descripcion:
          "Ajustes > General > Configuración de red > Ajustes > Habilitar DNS sobre HTTPS. Selecciona 'Proveedor personalizado' e introduce: https://dns.familia.surf/dns-query",
      },
      {
        numero: 4,
        titulo: "Opera: Configurar DNS privado",
        descripcion:
          "Configuración > Privacidad y seguridad > Seguridad > Usar DNS seguro > Activar. Selecciona 'Con' y elige un proveedor compatible.",
      },
      {
        numero: 5,
        titulo: "Verificar la configuración",
        descripcion:
          "Visita dnsleaktest.com y haz un 'Extended test'. Verifica que los DNS mostrados corresponden al proveedor configurado.",
      },
    ],
    advertencias: [
      {
        titulo: "El DNS del navegador solo protege en ese navegador",
        descripcion:
          "Si el menor usa otro navegador sin configurar, no tendrá protección. Configura todos los navegadores instalados.",
      },
      {
        titulo: "Algunas extensiones pueden interferir",
        descripcion:
          "Extensiones de VPN o proxy pueden anular la configuración DNS. Revisa las extensiones instaladas.",
      },
    ],
    validacionFinal:
      "Intenta acceder a un sitio bloqueado. Debería mostrar error de conexión. Visita dnsleaktest.com para confirmar que los DNS son correctos.",
    erroresFrecuentes: [
      {
        problema: "La configuración no se guarda",
        solucion:
          "Algunos navegadores requieren reinicio completo. Cierra todas las ventanas y vuelve a abrir el navegador.",
      },
      {
        problema: "Los sitios no se filtran correctamente",
        solucion:
          "Verifica que has introducido correctamente la URL del proveedor. Asegúrate de que la URL termina en /dns-query.",
      },
    ],
  },
]

export function getDeviceGuide(id: string): DeviceGuide | undefined {
  return deviceGuides.find((g) => g.id === id)
}
