# Tastr

## Run
The application requires to be run with `docker-compose` for all features to function properly.

### .env file
Before starting the containers you have to create a `.env` file in the root directory, containing:
```
# Token secretes used to sign and refresh Json Web Tokens
ACCESS_TOKEN_SECRET=ebd03abb02c60d49883f31c9b6a6240663b5e7e3356fb9264cbf9469a7d01b4ef471f2cd85dce733dc974f84af6ae607fdb372a6caf9e5f2f88f9d97ba54b1d2
REFRESH_TOKEN_SECRET=43374091e5ad5e5d96f0e43674013574f0df63e7a808c5507ee2e58461130de09bedd8d5473ad51841d495cca6b1ab24468b88351ffea1c4e945cd2dab408791

MYSQL_USER=user # MySQL username
MYSQL_PASSWORD=password # MySQL password for the regular user
MYSQL_DATABASE=tastr # The MySQL database name

AWS_BUCKET_ENDPOINT=http://172.20.0.2:4566 # Do NOT change this, unless it is running in production with an external AWS bucket.
AWS_BUCKET_REGION=eu-west-2
AWS_ACCESS_KEY_ID=123
AWS_SECRET_KEY=abc
AWS_BUCKET_NAME=tastr-bucket
```

1. Run `docker-compose up` to start the containers. 
2. Open a new terminal and run `npm run migrate` to add all the migrations to the database.
3. Navigate to `http://localhost:8080`.
4. (Optional) If the styling isn't working run `npm run build-css` and reload the website.

## Docker containers
### TastrDB (MySQL)
-   Creates .mysql folder for persisting the database between re-runs.

### localstack-s3 (AWS S3 mock):
-   Creates .localstack-data folder for storing all files send to the server

