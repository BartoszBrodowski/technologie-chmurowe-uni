FROM node

COPY ./app /app

WORKDIR /app

RUN npm install

ENV MY_VAR="Hello World"

CMD ["npm", "start"]