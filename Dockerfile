FROM node:latest
WORKDIR src/app
COPY package*.json ./
RUN npm install
ADD . /src/app
COPY ./view .
COPY ./tests .
CMD [ "node", "start" ]
