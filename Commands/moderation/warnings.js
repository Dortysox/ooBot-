const db = require('quick.db')
const { discord, MessageEmbed } = require('discord.js')

module.exports.run = (client, message, args) => {

    const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply('Whose Warnings You Want To See?') // If No User Is Provided

        let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`) // Get Users Warning
        if(warnings === null || warnings === 0) warnings = '0' // If No Warning Are Their

        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} Warnings`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.id}> Has **${warnings}** Warnings
        `)
        message.channel.send(embed)
};

module.exports.help = {
  name : "warnings",
  aliases :['warncount', 'list-warnings', 'list-warning'],
  description: "voir les sanction d'un membre",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : true 
};