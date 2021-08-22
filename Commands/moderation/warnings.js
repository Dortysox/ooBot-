
module.exports.run = (client, message, args) => {
const db = require('quick.db')
    const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
    if(!user) return message.reply('vous voulez voir les Advertisement de quelle membre ?') // If No User Is Provided

    let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`) // Get Users Warning
    if(warnings === null || warnings === 0) warnings = '0' // If No Warning Are Their

    const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} Warnings`, user.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor('RANDOM')
    .setDescription(`
<@${user.id}> a **${warnings}** Advertisement
    `)
    message.channel.send(embed)
};

module.exports.help = {
  name : "warnings",
  aliases :['warncount', 'list-warnings', 'list-warning'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};