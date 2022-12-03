const amqp=require('amqplib')

const data={data:process.argv[2]}

async function connect(){
    const connection=await amqp.connect('amqp://localhost:5672')
    const channel=await connection.createChannel()
    await channel.assertQueue('jobs')
    channel.sendToQueue('jobs',Buffer.from(JSON.stringify(data)))
    console.log(`${data.data} sent`);
}

connect()