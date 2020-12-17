FROM node:lts-alpine AS build_client
WORKDIR /app
COPY client /app
RUN npm install && npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build_client /app/build /app/client
COPY server /app
RUN npm install

ENV MYNOTES_USERNAME user
ENV MYNOTES_PASSWORD password
ENV MYNOTES_JWT_SECRET secret_to_be_defined

ENTRYPOINT ["node", "server.js"]
