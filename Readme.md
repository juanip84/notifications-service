# Notifications service

This is a service for sending notifications to end users, for now only sends SMS, but in the future will manage emails.

Expose an API Rest endpoint for sending SMS.

## Tech Approach

For this i used:
- node js + express (rest api)
- sns and twilio libs/sdk
- localstack for emulating sns locally
- docker for being able to run as a container
- docker-compose for running easily locally
- swagger for documenting the endpoint

## App configuration

The needed configuration of the app can be found in the `docker-compose.yml` file. 

When running in a real way for SNS there is two ways of getting permissions:
1- setting up accessKey and secretKet of an iam_user (could be programmatic) as environment variables 
2- not defining those variables and just attach an iam_role to ECS service or EC2 instance (if running on AWS), and managing the permissions at role level (way more secure)

## Needed params to be sent

channel: could be 'sns' or 'twilio'

phoneNumber: in format +number for example +549116xxxxxxx for an argentinian number

msg: the message to be sent

##  Swagger and endpoint request

To see the SMS endpoint specs after running the service locally could open swagger with:
https://localhost:3000/docs


## Running in real way

Since this service is dockerized it is recommended to run it that way.

Could be run in two ways for real use:
1- docker-compose using 'dev' service: this could be useful for an initial dev environment, so could be run  using
docker-compose easily inside an EC2 instance, VM or similar. For this needs to change the variables on the 'dev' service 
inside docker-compose.

2- run using docker commands, or even orchestated (ECS?), passing the expected vars as environment variables.

## Running this service for local testing and developing

This application is dockerized so ideally you only need `docker` and `docker-compose` to run this app locally.
To make modifications, you just need to modify the needed code inside the `src` directory and then run the dockerized app.

Since has hot reload, the majority of the files could be modified and will reload and recreates the container automatically.

To start the app locally, just run:

```bash
docker-compose up local
```
This will simulate SNS interface by using localstack.
Sadly twilio cannot be emulate so will fail since the credentials are fake unless you setup real ones.

To recreate container (if needed) run the next three commands:

```bash
docker-compose down
```

```bash
docker-compose up build
```

```bash
docker-compose up local
```

To start the app locally but testing against twilio and real SNS run using:

```bash
docker-compose up dev
```

For this since SNS won't be emulated (no localstack started) both twilio and sns variables needs to be setup with proper credentials.

## TODO

Next steps planned for helping a bit more are:

- implementing unit tests, so code is tested using jest
- implementing sendgrid integration for sending emails
- saving notifications status and get endpoint for checking that?
- make another version for being run as lambda function being trigger by queue or api gateway