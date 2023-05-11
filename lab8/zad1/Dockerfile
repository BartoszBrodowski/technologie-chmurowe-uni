FROM node:14

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/books || exit 1

CMD ["node", "index.js"]