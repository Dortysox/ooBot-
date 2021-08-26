const discord = require('discord.js')
module.exports.run = async (client, message, args) => {

       // ticket-setup #channel
    const customFooter = await dashboard.getVal(message.guild.id, "footer");
    const enabled = await dashboard.getVal(message.guild.id, "tktenabled");

    console.log(enabled)

    if (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
    if (enabled === 'on') {


      let channel = message.mentions.channels.first();
      if (!channel) return message.reply("Usage: `!ticket-setup #channel`");

      let ticketEmbd = await channel.send(new MessageEmbed()
        .setTitle("Ticket System")
        .setDescription("React to open a ticket!")
        .setFooter(`ooBot ticket system | ${customFooter} `)
        .setColor("00ff00")
      );

      ticketEmbd.react('🎫');
      db.set(`${message.guild.id}-ticket`, ticketEmbd.id);


      message.channel.send("Ticket System Setup Done!")
    }

    if (command == "close" || command == "close-tkt" || command == "close-ticket") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de fermer ce ticket.')
      if (!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
      message.channel.delete();
    }
  
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