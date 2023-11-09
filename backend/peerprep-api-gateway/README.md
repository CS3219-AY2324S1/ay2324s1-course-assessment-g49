# peerprep-api-gateway

Backend component of PeerPrep

## Requirements

1. MongoDB - https://www.mongodb.com/docs/manual/administration/install-community/
2. PostgreSQL - https://www.postgresql.org/download/
3. JDK 20

## Running the backend

1. `mvn clean install` to build
2. `mvn spring-boot:run` or run entry point `PeerprepApiGatewayApplication::main()` via IntelliJ

## Setting Up Tables / Populating Sample Questions

1. Script(s) can be found in resources/scripts
2. If using IntelliJ / DataGrip, open a new query console, paste the script and choose which lines to run using Cmd+Enter
3. Else, open terminal and run `mongosh` and `use peerprep`. Then, run `load(setupMongo.js)`
