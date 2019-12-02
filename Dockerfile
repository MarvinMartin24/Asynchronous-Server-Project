FROM node:latest
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY ./app.js .
COPY ./view .
COPY ./tests .
CMD [ "node", "start" ]
