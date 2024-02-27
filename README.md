# Juracine

Juracine is a web application that allows users to discover and manage a collection of movies and TV shows.

## Features

- Displaying the list of movies and TV shows
- User registration and login
- Managing favorites
- User profiles
- Administrator interface

## Technologies Used

- DBeaver
- Express.js
- HTML
- JWT (JSON Web Tokens)
- MYSQL
- Node.js
- React.js
- SASS
- ...

## Installation

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone the repository: `git clone https://github.com/your_username/Title_Project_Juracine.git`
- Install dependencies : `cd Title_Project_Juracine && npm install`
- Create environment files (`.env`) in both `backend` and `frontend`: you can copy `.env.sample` files as starters (**don't** delete them)
- Run the application: `npm run start`

## Available Commands

- `db:migrate` : Run the database migration script
- `db:seed` : Run the database seed script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools (will be executed on every _commit_, and refuse unclean code)

### FAQ

## Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS

## About the database

The database is automaticaly deployed with the name of your repo. During the build of the projet (`docker-entry.sh`), the `node migrate.js` command is executed in the backend. If you want to seed automaticaly your database using the `seed.js` script, replace the command _build_ on you `backend/package.json` by `node migrate.js && node seed.js`.

## About public assets (pictures, fonts...)

Don't use any public folder on your frontend. This folder won't be accessible online. You may move your public assets in the `backend/public` folder.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# Author
KALKI Prasanna - Web Developer and Web Mobile
