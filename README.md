<h1 align="center">ALKEMY FilmsDisneyApi</h1>

## Description

This is a project for the Alkemy challenge, it is a REST API that allows you to create, read, update and delete movies and characters from the Disney universe.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the project.

```bash
npm install
```

## Usage

```bash
npm run dev
```

### Routes

```http://localhost:3000/filmsDisneyApi```

#### Movies

| Method | Route   | Description      |
| ------ | -----   | -----------      |
| GET    | /movies | Get all movies   |
| GET    | /movies?{property}={value} | Get movie by properties |
| GET    | /movies/:id | Get a movie by id |
| POST   | /movies  | Create a movies |
| PUT    | /movies/:id | Update a movie by id |
| DELETE | /movies/:id | Delete a movie by id |

#### Characters

| Method | Route   | Description      |
| ------ | -----   | -----------      |
| GET    | /characters | Get all characters   |
| GET    | /characters/:id | Get a character by id |
| GET    | /characters?{property}={value} | Get character by properties |
| POST   | /characters  | Create a character |
| PUT    | /characters/:id | Update a character by id |
| DELETE | /characters/:id | Delete a character by id |

#### Genres

| Method | Route   | Description      |
| ------ | -----   | -----------      |
| GET    | /genres | Get all genres   |
| GET    | /genres/:id | Get a genre by id |
| GET    | /genres?{property}={value} | Get genre by properties |
| POST   | /genres  | Create a genre |
| PUT    | /genres/:id | Update a genre by id |
| DELETE | /genres/:id | Delete a genre by id |

#### Auth

| Method | Route   | Description      |
| ------ | -----   | -----------      |
| POST   | /auth/register  | Register a user |
| POST   | /auth/login  | Login a user |

## Storage

| Method | Route   | Description      |
| ------ | -----   | -----------      |
| GET    | /storage | Get all file from Storage  |
| GET    | /storage/:id | Get a file by id |
| POST   | /storage  | Create a file |
| DELETE | /storage/:id | Delete a file by id |

## Swagger Documentation

```http://localhost:3000/documentation/```

## .env configuration

```bash
# working port of the express
PORT_EXPRESS=

# NoSQL database connection path
MONGODB_URI=

# public file connection path 
PUBLIC_URL=

# secret key of JSON WEB TOKEN 
JWT_SECRET=

# information required for the connection with the SQL database
NAME_DB=
USER_NAME=
PASSWORD=
HOST=
DIALECT=
PORT=
MAX=
MIN=
ACQUIRE=3
IDLE=

# WEBHOOK route for sending error notifications
# to slack 

SLACK_WEBHOOK=

# email and password of the mail from where 
# registration confirmation emails are sent
# and login 
MAILUSER=
MAILPSSWD=

# variable to choose which database we go
# to use, if SQL or NoSQL, as default it remains in SQL

ENGINE_DB=mysql
```
