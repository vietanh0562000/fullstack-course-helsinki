FROM node:20-alpine AS dps
WORKDIR /app 
COPY package.json package-lock.json ./
RUN npm ci 

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dps ./app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]