const Discord = require("discord.js");
const time = require('moment')
const db = require("quick.db");

module.exports.run = (client, message, args) => {
 
let user = message.mentions.users.first() 
let author = message.author;
if (!user) return message.channel.send( new Discord.MessageEmbed() .setDescription(`:x: **Please mention a member to remove invites**`)) ;
 let avatar = user.displayAvatarURL({size: 4096, dynamic: true});

 let authorAvatar = author.displayAvatarURL({size: 4096, dynamic: true});

   let amount = args[0];
    let bonus = db.get(`${user.tag}_BONUS_${message.guild.id}`)
    if (!user) return message.channel.send( new Discord.MessageEmbed() .setDescription(`:x: **Please mention a member to remove invites**`)) ;
   if(!message.member.hasPermission(`MANAGE_NICKNAMES`)) return message.reply(` :x: **You do not have permission to use this command.**`).then(m => (m.delete({timeout: 10000})));
        if(isNaN(amount)) return message.reply(` :x: Please Type a valid number less than **7**.`).then(m => (m.delete({timeout: 10000})));
        if(amount >= 7) return message.reply(`Please choose a number less than **7**`);


if(bonus === 0) return message.reply(`**${user} has no invites to remove !**`);
db.subtract(`${user.tag}_BONUS_${message.guild.id}`, amount)
const embd = new Discord.MessageEmbed()
.setTitle(`Removed ${amount} Invites to ${user.tag}`)
.setThumbnail(avatar)
.setDescription(`\`✅\` ${user} losed \`${amount}\` \`🌟\` Bonus invites \n removed by ${author} `)
.setFooter(`Added by ${author} `, authorAvatar)
message.channel.send(embd)

  
};

module.exports.help = {
  name : "remove-invites",
  aliases :['rmv-bonus', 'rmvInvite'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};