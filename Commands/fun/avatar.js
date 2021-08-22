const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || message.author;

  let avatar = user.displayAvatarURL({size: 4096, dynamic: true})

  const embed = new discord.MessageEmbed()
  .setTitle(`${user.tag}'s Avatar`)
  .setURL(avatar)
  .setImage(avatar)
  .setColor('RANDOM')
  message.channel.send(embed);
};

module.exports.help = {
  name : 'avatar',
  aliases :['pp','pdp'],
  description: 'donne la photo de profil d\'un membre! ',
  cooldown : 10,
  usage : '<@member>',
  isUserAdmin : false ,
  permissions : false,
  args : false
};