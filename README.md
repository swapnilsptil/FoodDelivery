# Food Delivery Application

Aapp is a full-stack system build in MERN.js which aims to offer a customer a range of food products to order. Then the customer can choose and order a menu on its own.

The main features are:

- 2 different roles (Role Based Access Control):
  - `Restaurant`: Can process the orders received in Real time, view a history, add / edit new items. Can change the order status. Also have authority to block specific customer once received order.
  - `User`: Can order from the restaurants. Also view a orders history. Can cancel order till restaurant accept it.
- Follow React and Node.js best practices.
- 

# Sign-up
- Customer can register self using signup page. 
- Restaurant can start business using `Get Started` at footer. 

## Quick Start

```javascript
// Install dependencies for server & client
npm install && npm run client-install
// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:3002 and client on http://localhost:3000
```

## MERNJS stack

- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend.
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend.
- [MongoDB](https://www.mongodb.com/) for the database.
- [Redux](https://redux.js.org/basics/usagewithreact) for state management between React components.
- [Mongoose](https://mongoosejs.com/) for mongodb object modeling.

## Configuration

Make sure to add your own `MONGOURI` to file `nodemon.json`.

```javascript
{
  "env": {
    "MONGO_CONNECTION": ${`MONGOURI`},
    "MONGO_DATABASE": "foodApp"
  }
}
```
