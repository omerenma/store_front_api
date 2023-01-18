## Description of application
- Storefront backend api built with NodeJs, express framework, postgresql and jasmine testing framework
- The application provides data needed to power the frontend of an ecommerce website

## Instruction on usage
- clone the respository from https://github.com/omerenma/storefrontapi into your local machine
- cd storefrontapi
- Run yarn add all || npm install in your terminal

## Server port
- 5500
## Database port
-  5432
## Database name
- store_front_api
## Database Migration
- Run db-migrate up in your terminal
## Database connection instruction
- 
## Starting application express server
- Run yarn start in your terminal 
- Server listens on port 5500

## Linting, formating and code style check
- Run yarn lint

## Prettier
- Run yarn prettier

## Compiles and minifies for production
- Run yarn build

## Testing the endpoint
- Run yarn test

## Endpoint to resize image
- localhost:5000/api/images?filename='encenadaport.jpg'&width=200&height=200

## Image resize  functionality
- Upon accessing the endpoint url with the query parametersc, a new copy of the image is save to disk with  the location /assetes/thumbnails
