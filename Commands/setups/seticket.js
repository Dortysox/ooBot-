const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args) => {

    const channel = message.mentions.channels.first()

      if(!channel) return message.reply('Mentionnez un salon pour le  Ticket System.') // If No Channel Is Provided

      const embed = await channel.send(new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('📂 Ouvrir un Ticket 📂')
      .setDescription('Besoin d\'aide?  vous avez des porblemes ?\nOvrez un Ticket 🎫!')
      .addField(`**🔓Ouvrir un ticket **`, `[ Cliquez sur la reaction 🎫 ]`, true)
      .addField(`**🔒Fermer le ticket **`, `[ Tapper la cmd \`close\` 🎫 ]`, true)
      .setFooter('⚠️ les ticket crée sans raison seront suprimmé et vous serais _warn/mute_')
      )
      // channel.send(embed).then(message => {
      //     message.react('🎫')
      // })
      console.log(embed.id) // For Creating Channel
      await embed.react('🎫') // React To Embed
      
    // Delete Original Message
      message.channel.send(`**Pour finaliser la connfiguration des tickets aller sur le dashboard du bot puis dans parametres metez cette id \`${embed.id}\` dans le champ \`Ticket message id\`**`)
      

};

module.exports.help = {
  name : "setup-ticket",
  aliases :['set-tkt', 'tickets'],
  description: "configurer le salon des tickets",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};