const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
  
  const embed = new MessageEmbed()
  
  .setTitle("Help Page")
  .setColor("#eb2845")
  .addField(`Prefix`, ' `/`' , true)
.addField('for check the stock' , '`/stock`' , '/stockp2' , true)
.addField(`for gen`, ' `/<stock>`' , true)
.addField(`visit the support ! `, ' [support](https://sites.google.com/view/epoxy-bot/accueil)' , true)
.addField(`add the bot ! `, ' [Invite](https://discord.com/api/oauth2/authorize?client_id=776457745481465896&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2F9U8ZzuHQ&scope=bot)', true)
message.channel.send(embed);
message.react("✅");
};

module.exports.help = {
  name : 'help',
  aliases :['hlp','h'],
  description: 'renvoie la help page ',
  cooldown : 10,
  usage : '',
  isUserAdmin : false ,
  permissions : true,
  args : false
};