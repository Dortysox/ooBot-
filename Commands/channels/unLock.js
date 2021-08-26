const discord = require("discord.js");
const db = require("quick.db");
const { ooColor } = require("../../config")
module.exports.run = async (client, message, args) => {

   const embed = new discord.MessageEmbed()
   .setDescription(`🔐 ${message.channel} a été Lock`)
   .setColor(ooColor);
   message.channel.send(embed);
   
};

module.exports.help = {
  name : "locku",
  aliases :['u'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : true ,
  permissions : true,
  args : false 
};