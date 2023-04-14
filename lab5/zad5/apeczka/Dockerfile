FROM ubuntu as build

RUN apt-get update 

RUN apt install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_19.x

RUN apt-get install -y nodejs npm

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]