<img src="https://github.com/DanielMil/Spot/blob/master/frontend/src/images/logo.svg" alt="logo" width="150"/>

# Spot
## The Application
Spot is a full-stack application that aims to simplify and consolidate the parking process. It was designed as the engineering capstone project for ENGG41X at the University of Guelph. It consists of a React.js web client, Node.js with TypeScript API and embedded logic for CV license plate detection. The project also includes hardware components that can be seen below.

<img src="https://github.com/DanielMil/Spot/blob/master/images/circuit.png" alt="circuit" width="300"/>

<img src="https://github.com/DanielMil/Spot/blob/master/images/gate.png" alt="gate" width="300"/>

## Environment Setup
### 1. Install the following software:
* [PostgreSQL](https://www.postgresql.org/download/) - SQL-based datastore.   
* [Postman](https://www.postman.com/downloads/) - Make requests to the REST API backend
* [DBeaver](https://dbeaver.io/download/) - Graphic user interface for the database
* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/) - Containerization software. (Optional)

### 2. Create a .env file in the root directory
This file will contain the environment variables to connect to the server, connect to an email 
address for password reset and contains secrets.

#### Use the template .env file shown below:

```INI
NODE_ENV=development
DATABASE_TEST_NAME=testing
DATABASE_PASSWORD=<Database password>
DATABASE_NAME=<Database name>
DATABASE_USERNAME=postgres
JWT_SECRET=<Secret>
EMAIL_ADDRESS=<Email>
EMAIL_PASSWORD=<Email password>
SESSION_SECRET=<Secret>
DATABASE_HOST=<'localhost' for local or 'postgres' for Docker>
ORIGIN=http://localhost:3000
```

### 3. Run the Server

#### To run the back-end:
```console
foo@bar:~$ cd server
foo@bar:~$ npm install
foo@bar:~$ npm run dev
```

You can ensure that the setup was successful by running the ```npm run test``` and ensuring that all unit tests pass.

### 4. Run the client
```console
foo@bar:~$ cd client
foo@bar:~$ npm install
foo@bar:~$ npm start
```

### 5. Editor Config (Optional)

#### Linter and VSCode Config
- To more easily develop with the linter and beautifier, download the 'eslint' extension in VSCode.
- To automatically beautify the code on save, click "ctrl+shift+p" or "cmd+shift+p" then search for settings.json.
  In the settings.json file add the following snippet: 
```json
"editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
 }
```
## Docker
Another way to run the app is with Docker. Docker containerizes the app so that it works the same way on all machines and can be started with one click. 

### To run with Docker:
1. Make sure Docker is installed on your system.
2. Ensure that the .env file is located in the root directory and that the value of 'DATABASE_HOST' is 'postgres'.
3. From the root directory, use the docker-compose tool by:
```console
foo@bar:~$ docker-compose up --build
```
Future builds don't need to be fully rebuilt, so simply doing
```console
foo@bar:~$ docker-compose up
```
will suffice.

Connecting to DBeaver and using Postman should be exactly the same.

## Notes:
- You can create a new database in DBeaver and the connection port should work be default.
- NodeMailer probably won't work by default. You will have to change the email security permission for 
 your email client (I recommend GMail).
