# __NODE API__
A simple node API project for demonstrating the CRUD opperation in API using
* express js
* postgreSQL (database used)
* knex ( for establishing ORM relation with model)

A great cheatsheet for knex by devhints.io can be found [here](https://devhints.io/knex)

## For testing out on your system
1. install npm dependencies
```
$ npm install
```
2. create database (I am using *postgreSQL*)
```
$ psql
postgres=# CREATE DATABASE todo_node_api_db
```
3. run migration file
```
$ knex migration:latest
```
4. run the seed file ( __not important__ )
```
$ knex seed:run
```
5. run the server in development environment
```
$ npm start
```
And you are ready to go.
### Basic API end points
* localhost:3000/api/
  * Send *GET* request here to see details of api or applicatoin.
* localhost:3000/api/todos
  * Send *GET* request here to see all todo list items.
  * Send *POST* request here to add new todo entry.
* localhost:3000/api/todos/:id (eg: localhost:3000/api/todos/5 replace id with id of todo like here )
  * Send *GET* request here to get details of single todo item matching the **id**
  * Send *PUT* request here to update the existing todo item by **id**
  * Send *DELETE* request here to delete the todo item matching **id**

## Basic Steps I followed for creating this app

1. install dependencies
```
npm install --save express
npm install --save body-parser
npm install --save-dev nodemon
```

2. Database Setup
```
$ sudo -u postgres psql
postgres=# CREATE DATABASE 
```

3. adding knex and pg to our app
```
$ npm install -g knex
$ npm install knex --save
$ npm install pg --save
```

4. init knex to generate ./knexfile.js
```
$ knex init
```

5. Edit the generate ./knexfile.js to include
``` javascript
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'todo_node_api_db',
      user: 'postgres',
      password: 'password'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  }
};
```
6. Making migration file using command
``` shell
$ knex make:migration
```

7. Edit the migration file to contain
``` javascript
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todos', (table) => {
      table.increments('id').primary();
      table.text('task');
      table.date('due_date');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todos')
  ]);
};

```

8. run the migration
``` shell
$ knex migrate:latest
```

9. making seed
```
$ knex seed:make todos
```

10. edit ./seeds/todo.js to include
``` javascript
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(() => {
      return Promise.all([
        knex('todos').insert({
          task: "create api using express js",
          due_date: '2018-Jul-06'
        })
        .then(() => {
          console.log('Seeding Complete!');
        })
        .catch(error => {
          console.log(`Error seeding data: ${error}`);
        })
      ])
    });
};

```

11. running the seed
```
$ knex seed:run
```

12. add these configuration to db.js
``` javascript
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

module.exports = database;
```

These are the basic library setups for knex.

The cheetsheet for CRUD operation using knex can be found [here](https://devhints.io/knex)