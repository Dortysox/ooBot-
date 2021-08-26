const discord = require("discord.js");
const db = require("quick.db");

module.exports.run = (client, message, args) => {

  const amount = parseInt(args[0]);

  if(args[0] === 'off') {
    message.channel.setRateLimitPerUser(0);
    const msgembd = new discord.MessageEmbed()
    .setTitle(` ✅ le Slowmode a été désactivée `)
    message.channel.send(msgembd)

   
  } else

     
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send(" `❌` Veuillez entrer un nombre valid **`s|m|h`**");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send(`\`✅\` Le Slowmode a été activé pour **${amount} secondes** `);
        return;
      } else {
        message.channel.send(`\`✅\` Le Slowmode a été activé pour **${amount} seconde** `);
        return;
      }
    }
    if (args[0] === amount + "m") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send(`\`✅\` Le Slowmode a été activé pour **${amount} minutes** `);
        return;
      } else {
        message.channel.send(`\`✅\` Le Slowmode a été activé pour **${amount} minute** `);

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send(`\`✅\` Le Slowmode a été activé pour **${amount} heures** `);
        return;
      } else {
        message.channel.send(`\`✅\` Le Slowmode a été activé pour **${amount} heur** `);
        return;
      }
    } else {
      message.channel.send(" `❌` Vous pouvez seulment utiliser : **`s|m|h`**");
    }
  
};

module.exports.help = {
  name : "slowmode",
  aliases :['cooldown'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : true 
};