FROM node:16


WORKDIR /usr/app

COPY package*.json ./

RUN npm install

CMD node src/app.js
