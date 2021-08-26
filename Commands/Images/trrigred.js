const DIG = require("discord-image-generation");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || message.author;

  let avatar = user.displayAvatarURL({size: 4096, dynamic: true})

  const atta = new DIG.Triggered().getImage(avatar);
  
    message.channel.send(atta);
  
};

module.exports.help = {
  name : "triggred",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};