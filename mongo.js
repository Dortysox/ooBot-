const { Invite } = require('discord.js');
const mongoose = require('mongoose')
const { mongoPath } = require('./config')

module.exports =  {
init: () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  
  };


   mongoose.connect(mongoPath, options)
   mongoose.Promise = global.Promise
   mongoose.connection.on("connected",() => console.log('Connected to mongodb ✔️ !') )
}
}
