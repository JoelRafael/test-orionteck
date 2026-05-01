# OrionTek Client Manager 🏢

![React](https://img.shields.io/badge/React-19.0+-blue.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0+-purple.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC.svg?logo=tailwind-css)

Bienvenido al repositorio del **Sistema de Gestión de Clientes** de OrionTek. Esta aplicación fue desarrollada como solución a la prueba técnica para llevar el control de clientes, donde cada cliente puede tener $N$ cantidad de direcciones.

La aplicación implementa una estructura moderna de páginas y componentes, utilizando React Router para la navegación, React Context para el manejo de estado global, Tailwind CSS para una interfaz atractiva y un servicio simulado que gestiona el CRUD almacenando los datos en `localStorage`.

---

## 📋 Características Principales

- **CRUD Completo de Clientes**: Crea, lee, actualiza y elimina clientes.
- **Múltiples Direcciones**: Posibilidad de agregar, editar o eliminar $N$ cantidad de direcciones dinámicamente por cada cliente.
- **Persistencia Local**: Uso de `localStorage` para simular una base de datos y mantener la información persistente entre recargas de la página.
- **Validación de Formularios**: Mascaras de entrada (`InputMask`) y validaciones con Regex para asegurar formatos correctos de teléfonos y correos electrónicos.
- **Diseño Moderno y Responsivo**: Interfaz construida con Tailwind CSS, optimizada para todas las pantallas y con micro-interacciones.

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos detallados para poner en marcha el proyecto en tu máquina local.

### 1. Requisitos Previos

Asegúrate de tener instalados los siguientes requerimientos en tu sistema:
- **Node.js** (v18.0 o superior)
- **NPM** (viene incluido con Node.js) o **Yarn**

### 2. Clonar y Preparar el Proyecto

Si aún no has descargado el proyecto, clona el repositorio e ingresa a la carpeta:
```bash
# Entrar a la carpeta del proyecto
cd test-oriontek
```

### 3. Instalación de Paquetes

Instala todas las dependencias necesarias ejecutando el siguiente comando:
```bash
npm install
```

### 4. Configuración de Variables de Entorno (.env)

El proyecto requiere una llave (`Key`) para poder acceder e inicializar el almacenamiento de los clientes en el `localStorage` del navegador.

1. Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`).
2. Agrega la siguiente variable de entorno al archivo:

```env
VITE_APP_STORAGE_KEY="oriontek_clients_db"
```
> **Nota**: El valor de `VITE_APP_STORAGE_KEY` será el nombre bajo el cual se guardará toda la estructura JSON en el `localStorage` de tu navegador. Puedes cambiar el valor si lo deseas.

### 5. Iniciar el Servidor de Desarrollo

Una vez instaladas las dependencias y configurado el archivo `.env`, puedes levantar el entorno de desarrollo de Vite:

```bash
npm run dev
```

El servidor iniciará localmente. Abre tu navegador e ingresa a: **[http://localhost:5173](http://localhost:5173)** para ver la aplicación funcionando.

---


