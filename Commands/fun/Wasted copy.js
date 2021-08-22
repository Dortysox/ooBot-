const {Client, Collection, MessageEmbed, Message} = require('discord.js');
module.exports.run = async (client, message, args) => {

let user = message.mentions.users.first() || message.author;
const embed1 = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(`💸 Mission passed ! ${user.tag} `)
  .setImage('https://some-random-api.ml/canvas/passed?avatar=' + user.displayAvatarURL({size: 4096, dynamic: true}) )
 
message.channel.send(embed1)

};

module.exports.help = {
  name : "MissionPassed",
  aliases :['passed'],
  description: "répete le message d'un utulisateur ",
  usage: ' <@member>',
  isUserAdmin : false ,
  permissions : false,
  args : true 
};