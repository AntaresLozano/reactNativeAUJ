# 📝 Notes App - Aplicación de Notas Profesional

> **Proyecto desarrollado para el programa "AUJ adopta un junior"**

Una aplicación de notas moderna y completa construida con **React Native** y **Expo**, que demuestra las mejores prácticas de desarrollo móvil y técnicas avanzadas de programación.

## 🚀 Características Destacadas

### ✨ **Experiencia de Usuario Excepcional**
- 🌓 **Tema Dinámico**: Adaptación automática entre modo claro y oscuro
- 📱 **Diseño Responsivo**: Optimizado para todos los tamaños de pantalla
- 🛡️ **Safe Area**: Protección completa contra notch, isla dinámica y barras del sistema
- 🎨 **Iconos Profesionales**: Librería Material Icons para una interfaz consistente
- ⚡ **Animaciones Fluidas**: Transiciones suaves y feedback háptico

### 🏗️ **Arquitectura Técnica Avanzada**
- 🔄 **Estado Compartido**: Context API para sincronización en tiempo real entre pantallas
- 💾 **Persistencia Local**: AsyncStorage para almacenamiento confiable de datos
- 🎯 **TypeScript**: Tipado estricto para mayor robustez y mantenibilidad
- 🧩 **Componentes Modulares**: Arquitectura escalable y reutilizable
- 📐 **Hooks Personalizados**: Lógica de negocio encapsulada y reutilizable

### 🛠️ **Funcionalidades Completas**
- ➕ **Crear Notas**: Interfaz intuitiva con validación de campos
- ✏️ **Editar Notas**: Modificación en tiempo real con autoguardado
- ✅ **Marcar como Completadas**: Sistema de estados con indicadores visuales
- 🗑️ **Eliminar Notas**: Confirmación de seguridad para evitar pérdidas accidentales
- 📊 **Estadísticas Inteligentes**: Dashboard con métricas en tiempo real
- 🔍 **Vista Previa**: Visualización optimizada de contenido

### 📈 **Dashboard de Estadísticas**
- 📊 **Métricas en Tiempo Real**: Total, completadas, pendientes y progreso
- 🎯 **Indicadores Visuales**: Gráficos de barras y porcentajes dinámicos
- 📅 **Notas Recientes**: Vista previa de las últimas modificaciones
- 🔄 **Sincronización Automática**: Actualización instantánea entre pantallas

## 🌐 Acceso a la Aplicación

### 📲 **Prueba Inmediata en Expo**
Accede directamente a la aplicación desde tu dispositivo móvil:

**🔗 [Abrir en Expo Go](https://expo.dev/accounts/alozanog/projects/notesapp/builds/919a421b-5e1e-4b83-a3e8-56e4b0dec25c)**

#### **Pasos para probar:**
1. Descarga **Expo Go** desde:
   - [📱 App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
   - [🤖 Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Escanea el código QR o abre el enlace directamente
3. ¡Disfruta de la aplicación completa!

### 💻 **Instalación Local**

#### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Expo CLI

#### **Configuración**
```bash
# 1. Clonar el repositorio
git clone [https://github.com/AntaresLozano/reactNativeAUJ.git]
cd notes-app

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start
```

#### **Opciones de Ejecución**
- **📱 Dispositivo físico**: Escanea el QR con Expo Go
- **🤖 Android**: Presiona `a` para abrir en emulador
- **📱 iOS**: Presiona `i` para abrir en simulador  
- **🌐 Web**: Presiona `w` para abrir en navegador

## 🛠️ Stack Tecnológico

### **Frontend**
- **React Native** - Framework multiplataforma
- **Expo SDK ~54.0** - Herramientas de desarrollo avanzadas
- **TypeScript** - Tipado estático para mayor robustez
- **Expo Router** - Navegación basada en archivos

### **UI/UX**
- **@expo/vector-icons** - Iconografía profesional Material Design
- **react-native-safe-area-context** - Manejo de áreas seguras
- **Themed Components** - Sistema de temas dinámico
- **Haptic Feedback** - Retroalimentación táctil

### **Estado y Persistencia**
- **React Context API** - Gestión de estado global
- **AsyncStorage** - Almacenamiento local persistente
- **Custom Hooks** - Lógica de negocio encapsulada

## 📁 Estructura del Proyecto

```
notes-app/
├── app/                     # Pantallas principales (Expo Router)
│   ├── (tabs)/             # Navegación por pestañas
│   │   ├── index.tsx       # 📝 Pantalla de notas
│   │   ├── explore.tsx     # 📊 Pantalla de estadísticas
│   │   └── _layout.tsx     # Layout de navegación
│   └── _layout.tsx         # Layout raíz con providers
├── components/             # Componentes reutilizables
│   ├── note-card.tsx       # 🃏 Tarjeta individual de nota
│   ├── note-form.tsx       # 📝 Formulario crear/editar
│   ├── note-list.tsx       # 📋 Lista de notas
│   └── ui/                 # Componentes base UI
├── contexts/               # Contextos de React
│   └── notes-context.tsx   # 🔄 Estado global de notas
├── hooks/                  # Hooks personalizados
│   └── use-notes.ts        # 🎣 Lógica de gestión de notas
├── types/                  # Definiciones TypeScript
│   └── note.ts             # 📋 Interfaces y tipos
└── constants/              # Constantes y configuración
    └── theme.ts            # 🎨 Sistema de colores y temas
```

## 🎯 Características Técnicas Avanzadas

### **🔄 Gestión de Estado Reactivo**
- **Context API** para compartir estado entre componentes
- **Sincronización automática** entre pantallas de notas y estadísticas
- **Persistencia transparente** con AsyncStorage

### **🎨 Sistema de Temas Inteligente**
- **Detección automática** del tema del sistema
- **Colores dinámicos** que se adaptan al contexto
- **Contraste optimizado** para accesibilidad

### **📱 Diseño Responsivo y Moderno**
- **SafeAreaView** para compatibilidad con todos los dispositivos
- **Componentes adaptativos** que responden al tamaño de pantalla
- **Iconografía consistente** con Material Design

### **⚡ Rendimiento Optimizado**
- **Lazy loading** de componentes
- **Memoización inteligente** para evitar re-renders innecesarios
- **Gestión eficiente de memoria** con hooks optimizados

## 🤝 Sobre el Proyecto

Este proyecto fue desarrollado como parte del programa **"AUJ adopta un junior"**, demostrando:

- ✅ **Dominio de React Native** y el ecosistema Expo
- ✅ **Arquitectura escalable** con patrones modernos
- ✅ **Código limpio** y bien documentado
- ✅ **Mejores prácticas** de desarrollo móvil
- ✅ **Experiencia de usuario** de nivel profesional

---

## 📞 Contacto

**Desarrollado con ❤️ para el programa AUJ adopta un junior**

¿Preguntas o comentarios? ¡Me encantaría escuchar tu feedback!

---

*Esta aplicación demuestra competencias avanzadas en desarrollo móvil, gestión de estado, diseño de interfaces y arquitectura de software.*