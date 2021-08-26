const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
let user = message.mentions.users.first() || message.author;
 let avatar = user.displayAvatarURL({size: 4096, dynamic: true})

const invites = await db.get(`${user.tag}_INVITES_${message.guild.id}`)
const Bonus = await db.get(`${user.tag}_BONUS_${message.guild.id}`)
if(Bonus === null) Bonus === 0 ;
if(invites === null) invites === 0 ;
const totalInvites = invites + Bonus
if(totalInvites === null) totalInvites === 0 ;
const invitesembd = new Discord.MessageEmbed()
.setTitle(`${user.tag} invites !`)
.setThumbnail(avatar)
.addField('`✅` Confirmed invites :', `**${invites}** invites`,true)
.addField('`🌟` Bonus invites :',`**${Bonus}** invites`,true)
.setDescription(`${user} has **${totalInvites}** invites **Total** `)
message.channel.send(invitesembd)
  
};

module.exports.help = {
  name : "invites",
  aliases :['user-invites', 'invite-count'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false
};