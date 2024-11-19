# **BusApp**

BusApp es una aplicación diseñada para gestionar información de autobuses, dividida en dos componentes principales: **frontend** y **backend**. Este proyecto permite visualizar, crear, editar y eliminar información relacionada con los autobuses.

---

## **Estructura del Proyecto**

El proyecto está organizado en dos carpetas principales:

1. **Frontend**: Contiene la interfaz de usuario desarrollada con React.
2. **Backend**: Implementa la lógica de negocio y las API usando Spring Boot.

---

## **Pasos para Configurar y Ejecutar**

### **1. Configuración y Ejecución del Backend**

1. **Crear la Base de Datos**
   - En tu sistema local, crea una base de datos llamada `bus` en MySQL.
     ```sql
     CREATE DATABASE bus;
     ```

2. **Configurar el Archivo `application.properties`**
   - Navega a la carpeta `backend/bus/src/main/resources/` y abre el archivo `application.properties`.
   - Actualiza los parámetros según tu configuración:
     - **Puerto del servidor**
     - **Puerto de MySQL** (por defecto, es `3306`)
     - **Usuario** y **contraseña** de la base de datos

     Ejemplo:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/bus
     spring.datasource.username=tu_usuario
     spring.datasource.password=tu_contraseña
     server.port=4000
     ```

3. **Inicializar el Backend**
   - Inicia el backend. Esto creará automáticamente las tablas necesarias en la base de datos.
   - Asegúrate de que las rutas de las API estén activas para recibir las solicitudes del cliente:
     /bus, /bus/id, /marca
   - La ruta de bus cuenta con paginación con un límite de 10 para mejorar la velocidad de respuesta. 

---

### **2. Configuración y Ejecución del Frontend**

1. **Instalar Dependencias**
   - Navega a la carpeta `frontend/buses`.
   - Ejecuta el siguiente comando para instalar todas las dependencias requeridas:
     ```bash
     npm install
     ```

2. **Iniciar el Frontend**
   - Una vez completada la instalación, inicializa el servidor de desarrollo:
     ```bash
     npm run dev
     ```
   - Esto levantará el frontend en un puerto local (por defecto, `http://localhost:5173`).

---

## **Nota Importante**

Para que la aplicación funcione correctamente, **es necesario que el backend y el frontend estén corriendo simultáneamente**:

- **Backend:** Usualmente en `http://localhost:4000`.
- **Frontend:** Usualmente en `http://localhost:5173`.

---

## **Eso es Todo**

Con estos pasos, tu aplicación BusApp estará lista para usarse. 🚀

