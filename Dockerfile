FROM node:14.15.1-alpine

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build

ENV PORT 9000
ENTRYPOINT ["node", "server.js"]