#===== INSTALL DEPENDENCIES
FROM node:20-alpine AS dps
WORKDIR /app
COPY ./phonebook_client/package.json ./phonebook_client/package-lock.json ./
RUN npm ci 


#===== BUILD STATIC FE FILE
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dps ./app/node_modules ./node_modules
COPY ./phonebook_client .
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL
RUN npm run build

# ======== SERVE BY NGINX ============
FROM nginx:1.27-alpine 
COPY --from=builder ./app/dist ./usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]