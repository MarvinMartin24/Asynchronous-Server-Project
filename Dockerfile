FROM node:latest

# Create app directory
WORKDIR /usr/app/


# Install app dependencies
COPY package*.json ./
COPY nodemon.json ./
RUN npm install

# Bundle app source
COPY ./src ./src


EXPOSE 3000
CMD [ "npm", "run", "dev" ]
