const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = (client, message, args) => {
const Status = new Discord.MessageEmbed()
.setTitle(`${message.guild.name} Configs ! `)
.addField('`` Captcha system ',``)

};

module.exports.help = {
  name : "server-config",
  aliases :['sg', 'serverg'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};