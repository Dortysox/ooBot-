const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
  
  const embed = new MessageEmbed()
  
  let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first();
  if (role) {
    if (message.member.roles.cache.has(role.id)) return (
      embed.setColor('2F3136'),
      embed.setDescription(`:x: ** vous avez deja ce role  !**`),
      message.channel.send(embed)
      );
    if (role.permissions.has('KICK_MEMBERS')) return (
      embed.setColor('2F3136'),
      embed.setDescription(`:x:** Vous ne pouvez pas avoir ce role !**`),
      message.channel.send(embed)
      );

    message.member.roles.add(role)
    .then(m => message.channel.send(`vous posséde maintenant le role ${role} `))
    .catch(e => console.log(e));
  } else {
    message.channel.send("le role n'existe pas !")
  }
};

module.exports.help = {
  name : 'addrole',
  aliases :['addr', 'adr'],
  description: 'ajoute un role ',
  cooldown : 10,
  usage : '<Role_mention>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};