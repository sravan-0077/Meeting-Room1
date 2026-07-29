# Stage 1: Build React production bundle using Node 22
FROM node:22-alpine AS build
WORKDIR /app

# Copy package manifests and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --no-audit || npm install --no-audit

# Copy application source and build assets
COPY . .
RUN npm run build

# Stage 2: Serve using NGINX Alpine
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy built production assets and nginx config
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
