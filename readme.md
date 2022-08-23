# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

1. Clone the [git repo](https://github.com/ObelusFamily/Anythink-Market-ocqm5)
2. Download and [install docker](https://docs.docker.com/get-docker/). You can verify docker is ready by running the following commands in your terminal: `docker -v` & `docker-compose -v`
3. Run `docker-compose up` from the project root directory to load Anythink's backend and frontend. If Docker is working correctly, the backend should be running and able to connect to your local database. test this by pointing your browser to http://localhost:3000/api/ping.
   Now, it’s time to check the frontend.
4. Create a new user on http://localhost:3001/register Create one (choose a cool nickname and everything). and you're good to go!
