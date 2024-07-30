# base image
FROM node:20-bullseye-slim

# setup the working directory
WORKDIR /usr/src/app

# copying the package.json file
COPY package*.json ./

# installing the dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# copy the source code
COPY . ./

# exposing the port 5001 to the application
EXPOSE 5050

# running the node server
CMD ["node","./src/server.js"]

