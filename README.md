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
01. Create **reviews** topic to gather incomming product events from product rating service
```sh
docker-compose exec broker kafka-topics --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic reviews
```  
02. Create **poor-reviews** topic to store poor reviews from customers
```sh
docker-compose exec broker kafka-topics --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic poor-reviews
```  
03. Config jdbc source connector to load customer data.
```sh
curl -i -X PUT http://localhost:8083/connectors/jdbc_source_postgres_01/config \
  -H "Content-Type: application/json" \
  -d '{
  "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
  "connection.url": "jdbc:postgresql://postgres:5432/postgres",
  "connection.user": "postgres",
  "connection.password": "postgres",
  "mode":"incrementing",
  "incrementing.column.name":"user_id",
  "topic.prefix":"postgres_",
  "transforms":"copyFieldToKey,extractKeyFromStruct",
  "transforms.copyFieldToKey.type":"org.apache.kafka.connect.transforms.ValueToKey",
  "transforms.copyFieldToKey.fields":"user_id",
  "transforms.extractKeyFromStruct.type":"org.apache.kafka.connect.transforms.ExtractField$Key",
  "transforms.extractKeyFromStruct.field":"user_id",
  "table.whitelist": "customers"
  }'
```
04. Config csv source connector to load product-sales data.
```sh
curl --location --request PUT 'http://localhost:8084/connectors/source_csv_connector/config' \
--header 'Content-Type: application/json' \
--data-raw '{
  "connector.class" : "com.github.jcustenborder.kafka.connect.spooldir.SpoolDirCsvSourceConnector",
  "finished.path" : "/tmp/output",
  "input.path" : "/tmp/input",
  "error.path" : "/tmp/error",
  "input.file.pattern" : "ProductSales.csv",
  "topic" : "productssales",
  "value.schema" : "{\"name\" : \"com.kafkasetup.products.Product\", \"type\" : \"STRUCT\", \"isOptional\" : false, \"fieldSchemas\" : { \"product_id\" : { \"type\" : \"INT64\", \"isOptional\" : false }, \"product_name\" : { \"type\" : \"STRING\", \"isOptional\" : false }, \"total_sales\" : { \"type\" : \"INT64\", \"isOptional\" : false}}}",
  "key.schema" : "{ \"name\" : \"com.kafkasetup.products.ProductKey\", \"type\" : \"STRUCT\", \"isOptional\" : false, \"fieldSchemas\" : { \"product_id\" : { \"type\" : \"INT64\", \"isOptional\" : false } }}",
  "csv.first.row.as.header": "true",
  "flush.size": "2",
  "rotate.interval.ms": "1000"}'
```
05. Login to ksqldb and check topic contents.
```sh
docker exec -it ksqldb-cli ksql http://ksqldb-server:8088
```
> Login to ksqldb

```sh
LIST/SHOW topics
```
> List topics in broker

```sh
PRINT <topic-name> FROM BEGINNING;
```
> Print the topic content