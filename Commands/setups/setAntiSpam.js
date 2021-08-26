const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = (client, message, args) => {

if(args[0] === 'on' || args[0] === 'off') {


const antispamchnl = message.channel
     if(args[0] === 'on' ) {
    if(args[0] === 'on') {
            await db.set(`antispam-${message.guild.id}_${message.channel.id}`, true)
            message.channel.send(' `✅` L\'antispam est desormais activé sur ce salon ')
        } else if(args[0] === 'off') {
            await db.delete(`captcha-${message.guild.id}`)
            message.channel.send('`✅` L\'antispam a été desactivée sur ce salon')
        }
     }
} else return message.channel.send(':x: **Veuillez entrer une option valid on/off**') ;
};

module.exports.help =  {
  name : "set-antispam",
  aliases :['antispam', 'antiflood'],
  description: "ne pas permetre au membres de spamer dans un saalon spécifique",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : false,
};