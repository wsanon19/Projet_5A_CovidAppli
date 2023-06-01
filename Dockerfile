#stage 1
FROM node:16.17.1 as temp_node
WORKDIR /app
COPY . .
RUN npm install npm@8.19.2
RUN npm install -g @angular/cli@14.2.4
RUN npm run build

#stage 2
FROM nginx:alpine
COPY --from=temp_node /app/dist/covid-appli /usr/share/nginx/html

