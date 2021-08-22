
module.exports.run = async (client, message, args) => {
const db = require('quick.db')
    const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
    if(!user) return message.reply('Qui voulez vous sanctionner ?') // If User Is Not Provided
    let reason = args.slice(1).join(' ') // For Reason
    if(!reason) reason = 'Acune raison' // If Reason Is Not Provided

    const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} Warned`, user.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor('RANDOM')
    .setDescription(`
<@${user.id}> à été warn pour **${reason}** par <@${message.author.id}>
    `)
    message.channel.send(embed)
    db.add(`warns_${message.guild.id}_${user.id}`, 1) // `warns_${message.guild.id}_${user.id}` Because Warning Will be Different In All Server, If We Keep `warns_${user.id}` Then It Will Show Same Warnings In All Servers // Add 1 Warning To User

};

module.exports.help = {
  name : "say",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};