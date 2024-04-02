
# Angular
FROM node:alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:prod

# Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
