#using node 16
FROM node:16

#working from this dir
WORKDIR /usr/src/app

# copy all files in dir, use usertype node
COPY --chown=node:node . .

#npm ci is safer than install, doesnt update dependencies
RUN npm ci

#set environment variable
ENV DEBUG=example:*

#run file
CMD npm start