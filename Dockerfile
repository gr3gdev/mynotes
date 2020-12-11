FROM node:14.15.1-alpine

ENV PORT 9000

RUN npm install && npm run build

COPY build build
COPY rest rest
COPY db.js .
COPY server.js .
COPY package.json .

ENTRYPOINT ["node", "server.js"]