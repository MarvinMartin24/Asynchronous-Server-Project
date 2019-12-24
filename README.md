[![Build Status](https://travis-ci.org/MarvinMartin24/Asynchronous-Server-Project.svg?branch=master)](https://travis-ci.org/MarvinMartin24/Asynchronous-Server-Project)

# Asynchronous-Server-Project
Asynchronous Server Technologies Project in Typescript and Nodejs

## Overview
The purpose of this Project is to create a REST API to implement CRUD (create, read, update, delete) operations on Data (User + Metrics). To build this Project we used different Tools:
* [Docker](https://docs.docker.com/)
    We decided to run securely our Application in a container.
    For that we specially used ```docker-compose``` to create 3 services (App, Mongo, Mongo-Express)
* [npm](https://docs.npmjs.com/) and [node](https://nodejs.org/en/docs/)
    We used nmp to manage our packages your our App
* [Mongoose](https://mongoosejs.com/docs/api.html)
    Mongoose were our main tools to interact with our containerize Mongo database service.
* [Mongo-Express](http://mongodb-tools.com/tool/mongo-express/)
    We added this third service to visualize our mongo database.
* [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/api/)
    We also added Tests to do some basic testing (Connection to mongo and API requests)
* [Postman](https://learning.getpostman.com/)
    We used Postman to test manually our Rest-API (POST/GET/DELETE/PUT)
* [Travis-ci](https://docs.travis-ci.com/)
    Finally, we also did some continuous Integration to build a healthier project by developing and testing in smaller increments.  


## Requirements
Only [Docker](https://docs.docker.com/v17.09/engine/installation/)! That is the magic of docker, you do not need anything else ! Follow the next instructions and everything will work perfectly well ! Just me sure you do not have any existing containers called app, mongo, mongo-express. If it is the case, use `docker stop` and `docker rm`


## Get Started

Clone our project with this GitHub repository. Use this command:
```bash
git clone https://github.com/MarvinMartin24/Asynchronous-Server-Project
```

### Lunch it !

To launch our 3 services, go to your file directory and use this:
```bash
docker-compose up -d --build
```
Behind this command, there is a ```npm run dev``` .
To see nodemon running use ```docker-compose up --build``` .

### Populate your Database
To initiate your mongo service, we created a command `Populate`, please use:
```bash
docker exec -it app npm run populate
```
This will added 2 Users (each one withe 3 metrics) to your mongo database.
Here is an example:
```
{
    "_id": ObjectID("5e01eca520ebea0090837ce2"),
    firstName: "hello",
    lastName: "world",
    email: "hello@world.com",
    password: "azerty"
}

{
    "_id": ObjectID("5e01eca520ebea0090837ce5"),
    "userId": "5e01eca520ebea0090837ce2",
    "value": 10,
    "date": ISODate("2019-12-24T10:47:01.038Z"),
}
```
### Additional Scripts

If you want to modify .ts files, you can use `build`.
This will Transpile .ts file to .js in the `/dist` folder

```bash
docker exec -it app npm run build
```

## Web Visualization

The server listens on port 3000 of your localhost.
So, to checkout the App, Go to [LocalHost (app)](http://localhost:3000/)

Similarly the mongo-express is on port 8081 of your localhost.
So, to see the database, Go to [LocalHost(Mongo-express)](http://localhost:8081/)


## Test
By using ```Mocha``` and ```Chai```, we created some tests, You can run the test with:
```bash
docker exec -it app npm run test
```
## API

### User Usage

| Method        | URL                    | Inputs           | Results     |
| ------------- |:----------------------:| ----------------:| -----------:|
| POST          | /api/user/register     | User infos       |  New User   |
| POST          | /api/user/authenticate | email, pwd       |    Token    |
| GET           | /api/profile           | Token            | User infos  |
| PUT           | /api/user/update       | Token + New infos| Update  User|
| DELETE        | /api/user/delete       | Token + UserId   | Delete User |

### Metric Usage

| Method        | URL                           | Inputs           | Results                |
| ------------- |:-----------------------------:| ----------------:| ----------------------:|
| POST          | /api/profile/add-metric       |  Token + UserId  | New Metric             |
| GET           | /api/profile/metrics          |  Token + UserId  | Show Metrics           |
| PUT           | /api/profile/metric/update    |  Token + UserId  | Update  First Metric   |
| DELETE        | /api/profile/metric/delete    |  Token + UserId  | Delete FirstMetric     |
| PUT           | /api/profile/metric/update/:id|  Token + MetricId| Update a pointed Metric|
| DELETE        | /api/profile/metric/delete/:id|  Token + MetricId| Delete a pointed Metric|


## Difficulties
* For the DevOps Part:
    The biggest problem was to setup the environment, because depending on the circonstancies, the environment required to connect to mongo in the containers or testing (for Travis) are not the same (check .env and .env.travis).
* For the Backend Part:
    The main issue was setting up the model using mongoose. We needed to create several file to elaborate the interaction with the database.
    Next, the authentication process was quite complicated. Mainly because we use Token (see jwt).
    Finally, it was hard to find a clean way to resquest the API in the Front side.

## Contributors
MARTIN Marvin and DESCOTTES Martin (ING4 SI Gr02)

## Acknowledgements
We also want to thank our teacher :
Mr Kudinov (webtechnologies/backend) and Mr Jouet (DevOps)

## License
MIT License
Copyright (c) 2019 Marvin Martin and Martin Descottes
