# base image
FROM node:20-bullseye-slim

# setup the working directory
WORKDIR /app

# copying the package.json file
COPY tasks-api/package*.json ./tasks-api/

COPY react-client/package*.json ./react-client/

# installing the dependencies
RUN cd tasks-api && npm install

RUN cd react-client && npm install

# copy the nodeja api code
COPY --chown=node:node tasks-api/src ./tasks-api/src

# copy the react client code
COPY --chown=node:node react-client/ ./react-client/

# Copy the documentdb public key 
COPY --chown=node:node global-bundle.pem ./

# building the react client
RUN cd react-client && npm run build

# exposing the port 5001 to the application
ENV PORT=5001

# running the node server
CMD ["node","tasks-api/src/server.js"]

