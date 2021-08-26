const db = require('quick.db')
const { discord, MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You should have admin perms to use this command!")
    }
    
   const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply('Whom Do You Want To Wanr?') // If User Is Not Provided
        let reason = args.slice(1).join(" ") // For Reason
        if(!reason) reason = 'Not Specified' // If Reason Is Not Provided

        const warnembd = new MessageEmbed()
        
        .setAuthor(`${user.user.username} Warned`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.id}> Was Warned For **${reason}** By <@${message.author.id}>
        `)
        message.channel.send(warnembd)
        db.add(`warns_${message.guild.id}_${user.id}`, 1) // `warns_${message
};

module.exports.help = {
  name : "warn",
  aliases :['sanctionner'],
  description: "Sanctionner un membre",
  usage: ' <@member> <reason>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};