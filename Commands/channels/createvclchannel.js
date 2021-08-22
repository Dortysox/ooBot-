const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
   
    const name = args.join(" ")
    message.guild.channels
      .create(name, {
        type: 'voice',
      })
  
  const embed = new MessageEmbed()
  
  embed.setColor('2F3136')
  embed.setDescription(`<a:wYes:759475315281362954> Channel created !`);
message.channel.send(embed);
};

module.exports.help = {
  name : 'createVoiceChannel',
  aliases :['createvcl','cvcl'],
  description: 'Créer un salon textuel ',
  cooldown : 10,
  usage : ' <Channel_name> <Catégori_Id>',
  isUserAdmin : false ,
  permissions : true,
  args : true,
};