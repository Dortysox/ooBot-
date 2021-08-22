const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.user.tag;
  let author = message.author.tag

  let huggif = await fetch('https://some-random-api.ml/animu/hug')
         .then(res => res.json())
         .then(json => json.link);
        

  const embed = new discord.MessageEmbed()
  .setTitle(` ${author} fait un calin à ${user.tag} !`)
  
  .setImage(huggif)
  .setColor('RANDOM')
  message.channel.send(embed);
};

module.exports.help = {
  name : 'hug',
  aliases :[],
  description: 'donne la photo de profil d\'un membre! ',
  cooldown : 10,
  usage : '<@member>',
  isUserAdmin : false ,
  permissions : false,
  args : false
};