FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=todo-backend:*
ENV MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database

CMD npm start