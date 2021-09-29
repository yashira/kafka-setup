# Kafka Setup
## Complete docker based deployment

This docker based kafka setup contains 
 - zookeeper
 - kafka brocker
 - kafka connect nodes
 - ksqldb
 - ksqldb-cli
 - postgresdb

## Installation

Please ensure to install **docker** and  [docker-compose](https://docs.docker.com/compose/install/)

Run the following command to setup the docker containers

```sh
docker-compose up -d --build
```
> This will build relevant images and create docker containers.

## Setup
01. Create a topic to gather incomming product events from product rating service
```sh
docker-compose exec broker kafka-topics \ --create \ --bootstrap-server localhost:9092 \ --replication-factor 1 \ --partitions 1 \ --topic reviews
```  

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

MIT

**Free Software, Hell Yeah!**