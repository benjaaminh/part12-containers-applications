#using node 16
FROM node:16 AS build-stage

#working from this dir
WORKDIR /usr/src/app

# copy all files in dir, use usertype node
COPY . .

#npm ci is safer than install, doesnt update dependencies
RUN npm ci

#run file
RUN npm run build


# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html