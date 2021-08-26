const { discord, MessageEmbed } = require('discord.js')

const db = require('quick.db')

module.exports.run = (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply('Whom Do You Want To UnWanr?') // If No User Is Provided

        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username}`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.id}> Was UnWarned By <@${message.author.id}>
        `)
        message.channel.send(embed)
        db.subtract(`warns_${message.guild.id}_${user.id}`, 1) // 
};

module.exports.help = {
  name : "unwarn",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : true 
};