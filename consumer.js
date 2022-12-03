const amqp=require('amqplib')

async function connect(){
    const connection=await amqp.connect('amqp://localhost:5672')
    const channel=await connection.createChannel()
    await channel.assertQueue('jobs')
    channel.consume('jobs',data=>{
        const input=JSON.parse(data.content.toString())
        console.log(`${input.data} received`);
        if(input.data%2==0){
            channel.ack(data)           // Dequeue from queue
        }
    })
}

connect()