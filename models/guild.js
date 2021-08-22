const mongoose = require('mongoose');
const {  DEFAULTSETTINGS: defaults } = require('../config')

 const guildSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     guildID: String,
     guildNmae: String,
     logChannel: {
         "type": String,
         "default": defaults.logchannel
     },
     Welcomemessage : {
         "type": String,
         "default": defaults.Welcomemessage
     }
 })

 module.exports = mongoose.model("Guild", guildSchema)