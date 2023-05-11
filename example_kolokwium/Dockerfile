FROM alpine as builder

RUN apk update && apk upgrade

RUN apk add --no-cache git

RUN apk add --no-cache curl

RUN apk add --update nodejs npm

ARG GIT_REPO

WORKDIR /app

RUN echo ${GIT_REPO}

RUN git clone ${GIT_REPO} .

RUN npm i

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

EXPOSE 80