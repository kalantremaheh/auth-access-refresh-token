const redis = require('redis')
const client = redis.createClient({
    port:6379,
    host: "127.0.0.1"
})

client.on('connect',()=>{
    console.log('clinet connect to redis');
})

client.on('ready',()=>{
    console.log('clinet connect to redis & ready to use');
})

client.on('error',(err)=>{
    console.log(err.message);
})

client.on('end',()=>{
    console.log('Clinet disconnected from redis');
})

client.on('SIGINT',()=>{
   client.quit();
})

module.exports = client