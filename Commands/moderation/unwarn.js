
module.exports.run = (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('T\'a pas la perm pour faire ça mon brocoreuf.')

    const member = message.mentions.members.first()

  if (!member) return message.channel.send ('Met le @ du mec a avertir pour qu\'il se calme akhy.')

  if (member.id === message.guild.ownerID) return message.channel.send('Tu peux pas warn le proprio du serv !')
    
  if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Tu peux pas l\'warn mon reuf, chouine moins fort on entend que toi !')
    
    const reason = args.slice(1).join(' ')

  if (!reason) return message.channel.send('Un warn sans raison veux rien dire, donc dit moi tout bg').then(msg => msg.delete({timeout: 5000}))
    

  if (!client.db.warns[message.guild.id]) client.db.warns[message.guild.id] = new Object
  if (!client.db.warns[message.guild.id][member.id]) client.db.warns[message.guild.id][member.id] = new Array

  client.db.warns[message.guild.id][member.id].push({
    reason,
      date: Date.now(),
      mod: message.author.id
  })
  
  fs.writeFileSync("./db.json", JSON.stringify(client.db, null, 4), err => {
      if (err) console.error(err)
  })

    const embed = new MessageEmbed()

 
    .setAuthor(member.user.username + " a été averti !", member.user.avatarURL())
    .setDescription(`Raison : ${reason} `)
    .setColor('#000')

    message.channel.send(embed)
};

module.exports.help = {
  name : "unwarn",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};