FROM node:lts-alpine AS build_client
WORKDIR /app
COPY client /app
RUN npm install && npm run build

FROM node:lts-alpine

ENV MYNOTES_CONTEXT mynotes
ENV MYNOTES_USERNAME user

WORKDIR /app
COPY --from=build_client /app/build /app/client/${MYNOTES_CONTEXT}
COPY server /app
RUN mkdir /app/data
RUN npm install

ENTRYPOINT ["node", "server.js"]
