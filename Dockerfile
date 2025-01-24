FROM node:22 AS build

WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.21.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf.template
ENV BACKEND_HOST=fishkeeping-backend
ENV BACKEND_PORT=8080

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx","-g", "daemon off;"]
