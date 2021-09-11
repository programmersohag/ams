# build stage
FROM node:8.11.4 as build-stage
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm run symlink

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
