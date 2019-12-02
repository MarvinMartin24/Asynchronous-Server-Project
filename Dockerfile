FROM node:latest

# Create app directory
WORKDIR /usr/app/


# Install app dependencies
COPY package*.json ./
COPY nodemon.json ./
RUN npm install

# Bundle app source
COPY ./src ./src
COPY ./view ./view
COPY ./tests ./tests
COPY ./bin ./bin
COPY ./dist ./dist



EXPOSE 3000
CMD [ "npm", "run", "dev" ]
