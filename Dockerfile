# Imagen base para tu contenedor
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación React
RUN npm run build

# Expone el puerto 5000 para Express
EXPOSE 5000

# Comando para iniciar la aplicación Express
CMD ["npm", "run", "start:dev"]
