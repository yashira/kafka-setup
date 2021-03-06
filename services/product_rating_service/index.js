const { Kafka } = require('kafkajs');
const init = async() => {

  const kafka = new Kafka({
    clientId: 'product-rating-app',
    brokers: ['localhost:29092']
  });

  const producer = kafka.producer();
  await producer.connect();
  return producer;
}

const sendMessage = async(producer, review) => {
  await producer.send({
    topic: 'reviews',
    messages: [{
    value: JSON.stringify({
      comment: review.comment,
      starCount: review.starCount,
      productId: review.productId,
      customerId: review.customerId
    })
  }]
  });
}

const main = async() => {

  var reviews = [
    {
      id: "004",
      comment: "Bad product.",
      starCount: 1,
      productId: "421",
      customerId: "00347"
    }
  ]
  const producer = await init();
  await sendMessage(producer, reviews[0])
}

main()