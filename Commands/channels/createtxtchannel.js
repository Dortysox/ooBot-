const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
   
    const name = (args.splice(1).join(' ') || 'Defaultchannelname')

    message.guild.channels
      .create(name, {
        type: 'text',
      })
      .then((channel) => {
        const categoryId = (args.splice(2).join(' '))
        channel.setParent(categoryId)
      })
      const channel = `#${name}`
  const embed = new MessageEmbed()
  
  embed.setColor('2F3136')
  embed.setDescription(`Channel created ${channel}!`);
message.channel.send(embed);
};

module.exports.help = {
  name : 'createTextChannel',
  aliases :['createTxt','ctxt'],
  description: 'Créer un salon textuel ',
  cooldown : 10,
  usage : ' <Channel_name> <Catégori_Id>',
  isUserAdmin : false ,
  permissions : true,
  args : true,
};