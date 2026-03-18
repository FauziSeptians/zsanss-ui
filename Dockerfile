# Stage 1: Build environment
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files untuk caching layer
COPY package*.json ./
RUN npm install

# Copy source code dan build Storybook
COPY . .
RUN npm run build-storybook

# Stage 2: Production environment dengan Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Hapus file default Nginx
RUN rm -rf ./*

# Copy hasil build dari stage 1 ke folder Nginx
COPY --from=build /app/storybook-static .

# Ekspos port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]