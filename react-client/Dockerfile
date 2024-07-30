# selecting the base node image
FROM node:20-bullseye-slim as build

# set the working directory
WORKDIR /usr/src/app

# copy the dependency configurations
COPY package*.json ./

# install the dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# copy the source code
COPY . ./

# build the react app
RUN npm run build


# select the nginx image
FROM nginx:1.27.0-alpine-slim

# copy the nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# copy the build files to nginx html dir
COPY --link --from=build /usr/src/app/dist/ /usr/share/nginx/html

# expose the port
EXPOSE 80