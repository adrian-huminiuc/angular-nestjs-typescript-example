### NOTE:  
 In order to save time i've included the certificates and the environment variables in the source code.
 


### To run (make sure docker, docker-compose are installed)
```bash
docker-compose run api npm run fixtures
docker-compose up -d
```


### To run tests
```bash
docker-compose up -d

export $(cat .env | xargs ) && docker-compose exec mysql mysql -P${MYSQL_PORT} -p${MYSQL_PASSWORD} -u root -e "create database ${MYSQL_DATABASE}_test"

docker-compose exec -it api npm run test
```
