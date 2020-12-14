FROM node:lts-alpine AS build_client
WORKDIR /app
COPY client /app
RUN npm install && npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build_client /app/build /app/public
COPY package.json /app
COPY app.js /app
COPY server.js /app
COPY rest /app/rest
RUN npm install

ENTRYPOINT ["node", "server.js"]
