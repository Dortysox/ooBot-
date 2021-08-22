
module.exports.run = (client, message, args) => {

    const role = message.mentions.roles.first()
    if (!role) return message.channel.send('Veuillez mentionner le rôle dont vous voulez voir les infos.')
    message.channel.send(new Discord.MessageEmbed()
        .addField('Rôle', role, true)
        .addField('Membres le possédant', role.members.size, true)
        .addField('Couleur', role.hexColor, true)
        .addField('Date de création', moment(role.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
        .addField('Affiché séparément', role.hoist ? 'Oui' : 'Non', true)
        .addField('Mentionnable', role.mentionable ? 'Oui' : 'Non', true)
        .setFooter(`ID : ${role.id}`)
        .setColor(role.hexColor))
};

module.exports.help = {
  name : "userinfo",
  aliases :['ui', 'user-info'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};