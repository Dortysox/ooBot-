const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const axios = require('axios')
module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        console.log(flags);
        
        message.channel.send(`${user}'s badges: ${flags.join(', ')}`)

};

module.exports.help = {
  name : "Instagram-info",
  aliases :['ig', 'insta'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : true 
};