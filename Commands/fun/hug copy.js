const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.user.tag;
  let author = message.author.tag
  let title = await fetch('https://some-random-api.ml/meme')
  .then(res => res.json())
  .then(json => json.caption);
  let image = await fetch('https://some-random-api.ml/meme')
         .then(res => res.json())
         .then(json => json.image);
  

  const embed = new discord.MessageEmbed()
  .setTitle(title)
  .setImage(image)
  .setColor('RANDOM')
  message.channel.send(embed);
};

module.exports.help = {
  name : 'meme',
  aliases :[],
  description: 'donne la photo de profil d\'un membre! ',
  cooldown : 10,
  usage : '<@member>',
  isUserAdmin : false ,
  permissions : false,
  args : false
};