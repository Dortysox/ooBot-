const {Client, Collection, MessageEmbed, Message} = require('discord.js');
module.exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || message.author;
let avatar = user.displayAvatarURL()
const embed1 = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(`☠️ Wasted ${user.tag} `)
  .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${avatar}`)
  .setURL(avatar)
 
  
message.channel.send(embed1)

};

module.exports.help = {
  name : "wasted",
  aliases :['mort'],
  description: "répete le message d'un utulisateur ",
  usage: ' <@member>',
  isUserAdmin : false ,
  permissions : false,
  args : true 
};