# ===================
# STAGE 1: INSTALL PRODUCTION DEPENDENCIES
# ===================
FROM node:20-alpine AS dps 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev 

# ===================
# STAGE 2: BUILD AND RUN 
# ===================
FROM node:20-alpine 
WORKDIR /app
COPY --from=dps /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]