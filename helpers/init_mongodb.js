const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db')
})  

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose connection disconnected')
})

mongoose.connection.on('SIGINT',async()=>{
   await mongoose.connection.close()
   process.exit(0)
})
