const { MessageEmbed } = require('discord.js');
const pop = require('popcat-wrapper')
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  
  const embed = new MessageEmbed()
  
  embed.setColor('2F3136')
  embed.setDescription(':white_check_mark: pong !');
message.channel.send(embed);


let user = message.mentions.users.first() || message.author
const av = user.displayAvatarURL()

const image = await pop.drip(av)

const attachment = new Discord.MessageAttachment(image, "drip.png");
message.channel.send(attachment);
};

module.exports.help = {
  name : 'ping',
  aliases :['ping'],
  description: 'renvoie pong! ',
  cooldown : 10,
  usage : '',
  isUserAdmin : false ,
  permissions : true,
  args : false
};