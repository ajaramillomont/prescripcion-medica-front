# Etapa 1: build
FROM node:18-alpine as builder

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build -- --configuration production --project=prescripcion-medica-front


# Etapa 2: Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/prescripcion-medica-front/browser /usr/share/nginx/html

# Elimina configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
