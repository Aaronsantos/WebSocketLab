const amqp = require('amqplib/callback_api')
const ENDERECO_FILA = 'amqp://localhost'
amqp.connect(ENDERECO_FILA, (error0, connection) => {

    if(error0) {
        throw error0
    }

    connection.createChannel((error1, channel) => {

        if(error1){
            throw error1
        }
        var queue = 'websocket'
        var msg = 'enviado do rabbitmq'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(" [x] Sent %s", msg)
    })
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
})
