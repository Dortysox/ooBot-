const Discord = require("discord.js");
const time = require('moment')
const db = require("quick.db");

module.exports.run = (client, message, args) => {
let user = message.mentions.users.first() 
let author = message.author;
 let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
 let authorAvatar = author.displayAvatarURL({size: 4096, dynamic: true});
   let amount = args[0];
   if(!message.member.hasPermission(`MANAGE_NICKNAMES`)) return message.reply(` :x: **You do not have permission to use this command.**`).then(m => (m.delete({timeout: 10000})));
        if(isNaN(amount)) return message.reply(` :x: Please Type a valid number less than **7**.`).then(m => (m.delete({timeout: 10000})));
        

if (!user) return message.channel.send( new Discord.MessageEmbed() .setDescription(`:x: **Please mention a member to add invites**`)) ;

db.add(`guild_${message.guild.id}_xp_${user.id}`, amount)
const embd = new Discord.MessageEmbed()
.setTitle(`Added ${amount} Xp to ${user.tag}`)
.setThumbnail(avatar)
.setDescription(`\`✅\` ${user} recived ${amount} \`🌟\` Bonus xp \n Added by ${author} `)
.setFooter(`Added by ${author} `, authorAvatar)
message.channel.send(embd)

  
};

module.exports.help = {
  name : "Add-xp",
  aliases :['addxp'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};