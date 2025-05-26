# Imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias de producción
RUN npm install --production

# Copia el resto del proyecto
COPY . .

# Establece la variable de entorno para producción
ENV NODE_ENV=production

# Expone el puerto que usa tu app (según index.js)
EXPOSE 8888

# Comando por defecto para ejecutar la app
CMD ["node", "index.js"]
