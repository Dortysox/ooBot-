const { MessageEmbed } = require("discord.js");


module.exports.run = (client, message, args) => {
  const user = message.mentions.users.first();
  const moderator = message.author
  const reason = (args.splice(1).join(' ') || 'Aucune raison spécifée');
  const embed = new MessageEmbed()
  user ? message.guild.member(user).ban(reason) : 
  embed.setColor('2F3136')
  embed.setDescription(`:white_check_mark: ${user} à  bien été banni du serveur ! \nReason : ${reason}`);
  message.channel.send(embed);

     
  const mpembed = new MessageEmbed()
  .setAuthor(`${user.username} (${user.id}) `, user.displayAvatarURL() )
  .setTitle('Membre Banni !')
  .setColor('2F3136')
  .setDescription(`**Action**: Ban \n**Moderateur**: ${moderator} \n**Reason**: ${reason}`)
  .setThumbnail(user.displayAvatarURL())
  .setFooter(message.author.username, message.author.displayAvatarURL());

  user.send(mpembed)

  const rembed = new MessageEmbed()
  .setAuthor(`${user.username} (${user.id}) `, user.displayAvatarURL() )
  .setTitle('Membre Banni !')
  .setColor('2F3136')
  .setDescription(`**Action**: Ban \n**Moderateur**: ${moderator} \n**Reason**: ${reason}`)
  .setThumbnail(user.displayAvatarURL())
  .setFooter(message.author.username, message.author.displayAvatarURL());

  message.channel.send(rembed)
};

module.exports.help = {
  name : "ban",
  aliases :['bann'],
  description: "bannir un itulisateur",
  cooldown : 10,
  usage: '<votre_message>',
  isUserAdmin : true ,
  permissions : true,
  args : true 
};