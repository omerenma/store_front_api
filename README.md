### Description of application
- Storefront backend api built with NodeJs, express framework, postgresql and jasmine testing framework
- The application provides data needed to power the frontend of an ecommerce website

### PORT NUMBER FOR SERVER
- 5500
## PORT NUMBER FOR DATABASE
-  5432
### ENVIRONMENT VARIABLES
- SERVER_PORT = 5500
- POSTGRES_HOST = 127.0.0.1
- POSTGRES_DB = store_front_api
- POSTGRES_TEST_DB = postgres
- POSTGRES_USER = postgres
- POSTGRES_PASSWORD = omerenma1
- ENV = dev
- BCRYPT_PASSWORD = ncdjndjnsadjnNCJCNJNCJINC8282ijsoijoSIIijijiuqwjo
- SALT_ROUNDS = 10
- TOKEN_SECRET = 'skdmsamdisadmcansdc0nndcjndcajsden'
- PEEPER = mmmkfmldk9448jvkmfdso

### PACKAGAE INSTALLATION
- clone the respository from https://github.com/omerenma/store_front_api into your local machine
- cd store_front_api
- Run yarn add all or npm install

### DATABASE SETUP
- CREATE DATABASE store_front_api

## Database Migration
- Run db-migrate up in your terminal
## Database connection instruction
- 
## Starting application express server
- Run yarn start or npm in your terminal 
- Server listens on port 5500


### Database Schema

## Product
-  id integer
- name string
- price integer
- [OPTIONAL] category
## User
- id integer
- firstName string
- lastName string
- password string

## Orders
- id integer
- id of each product in the order : integer
- quantity of each product in the order : integer
- user_id : integer
- status of order (active or complete) : string

## Order_products
- id integer
- quantity integer
- order_id integer
- product_id integer


## API Endpoints
#### Products
- Index => GET : "localhost:5500/products"
- Show => GET : "localhost:550/products/:id/"
- Create [token required] => POST "localhost:5500/products"
#### Users
- Index [token required] => GET : "localhost:5500/users"
- Show [token required] => GET : "localhost:5500/user/:id"
- Create N[token required] => POST : "localhost:550/user"
#### Orders
- Current Order by user (args: user id)[token required] => GET : "/orders"
- Specific order => Get : "localhost:5500/orders/:id"
- Make order => POST : "localhost:5500/orders"


     <!-- "test:watch": "jest --watch",
    "test": "jest", -->