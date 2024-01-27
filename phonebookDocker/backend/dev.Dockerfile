FROM node:16

WORKDIR /usr/src/app
COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install
ENV DEBUG=todo-backend:*

# npm start is the command to start the application in development mode
USER node
CMD ["npm","run", "dev"]