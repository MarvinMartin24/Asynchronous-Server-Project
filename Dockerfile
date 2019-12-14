FROM node:latest

# Create app directory
WORKDIR /usr/app/


# Install app dependencies
COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm install

# Bundle app source
COPY ./src ./src
VOLUME ["/usr/app/src"]


EXPOSE 3000
CMD [ "npm", "run", "dev" ]
