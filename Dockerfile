FROM node:20-bullseye-slim

WORKDIR /app

COPY tasks-api/package*.json ./tasks-api/

COPY react-client/package*.json ./react-client/

RUN cd tasks-api && npm install

RUN cd react-client && npm install

COPY --chown=node:node tasks-api/src ./tasks-api/src

COPY --chown=node:node react-client/ ./react-client/

RUN cd react-client && npm run build

ENV PORT=5001

CMD ["node","tasks-api/src/server.js"]

