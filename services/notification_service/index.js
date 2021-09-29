const { Kafka } = require('kafkajs');

const main = async() => {
    const kafka = new Kafka({
        clientId: 'notificationz-app',
        brokers: ['localhost:29092']
    });

    const consumer = kafka.consumer({ groupId: 'bad-review-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'BAD_REVIEWS', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
        const json_payload = JSON.parse(message.value);
        console.log("Comment : " + json_payload.COMMENT)
      },
    });
}

main();

