# Stage 1: Build environment
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build-storybook

# Stage 2: Production environment dengan Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/storybook-static .

# Copy config Nginx custom (listen di port 8080)
COPY storybook-nginx-default.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]