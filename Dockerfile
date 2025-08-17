# syntax=docker/dockerfile:1
# check=error=true

# FROM debian:stable-slim AS builder 
FROM node:lts AS builder 

WORKDIR /app

COPY . .

RUN npm install --omit=dev
RUN npm run build

FROM docker.io/library/caddy:2.10

COPY Caddyfile /etc/caddy/Caddyfile

WORKDIR /app
COPY --from=builder /app/www /var/www/html/

EXPOSE 80
EXPOSE 443
