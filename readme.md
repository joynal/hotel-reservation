# Overview

For this task, I designed two micro-services. The first one is `api-gateway` which deals with all public API's and the second one is `reservation-service` which makes a reservation and notify the service owner about reservation status. For communication between two services, I used message queue as an event stream(Kafka).

## Technology used

- NodeJS, MongoDB, Apache Kafka, Docker

## Setup & start services (Without docker):

1.  Install npm packages on both `api-gateway` & `reservation-service`:

```bash
npm i
```

2. Setup environment variables on both `api-gateway` & `reservation-service`:

Copy `.env.example` to `.env` and replace `.env` configurations with yours.

3. create Kafka topic
```bash
bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 3 --topic room-reservation
```

4. Start `api-gateway`
```bash
npm run start
```

5. Start `reservation-service`
```bash
npm run start
```
Now API will available at 3000 port, or other you configured

6. Seed sample data

Run this node script from `api-gateway` directory:

```
node ./src/seed/run.js
```

## Setup & start services (Without docker):

This will start all the docker containers and also will create kafka topic & seed initial data.
```bash
./scripts/init.sh
```

Get the running container list:
```bash
docker container ls -a
```

## API's

- List of users:
  - GET `/api/v1/users`
  - pass `publicSecret` as authorization header.
- Add new user:
  - POST `/api/v1/users`
  - pass `publicSecret` as authorization header.
  - request body:
    ```js
    {
        name: 'Don',
        bonusPoints: 23
    }
    ```
- Update user bonus points:
  - PATCH `/users/:id/update-bonus-points`
  - pass `internalSecret` as authorization header
  - request body:
    ```js
    {
      // pass positive and negative value for increment & decrement.
      num: 5;
    }
    ```
- List of rooms:
  - GET `/api/v1/rooms`
  - pass `publicSecret` as authorization header.
- Add new room:
  - POST `/api/v1/rooms`
  - pass `publicSecret` as authorization header.
  - request body:
    ```js
    {
        name: 'Luxury',
        availableAmount: 10,
        requiredPoints: 50,
    }
    ```
- Make a reservation:
  - POST `/rooms/:roomId/make-reservation`
  - pass `publicSecret` as authorization header and `userId` in the request body.
  - request body:
    ```js
    {
      userId: "5e40bc250e3cc25aa7daf43d";
    }
    ```
