const discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    const embed = new discord.MessageEmbed()
  const disabled = await dashboard.getVal(message.guild.id, "disiabled");
  if (disabled.content = "true") return ;
  embed.setColor('2F3136')
  embed.setDescription(':white_check_mark: pong !');
message.channel.send(embed);
};

module.exports.help = {
  name : "test",
  aliases :['repeat', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};