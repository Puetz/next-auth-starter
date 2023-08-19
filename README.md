`docker run -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name next-auth-mongo mongo:6.0.6`

`mongosh -u admin -p password`
