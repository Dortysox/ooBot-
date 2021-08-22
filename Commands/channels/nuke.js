module.exports.run = (client, message, args) => {

    message.react('✅');
    message.react('❌');

const filter = (reaction, user) => {
    return ['✅','❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    
};

message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '✅') {
            if(!message.content.startsWith('!'))return; 
            if(!message.member.hasPermission("MANAGE_CHANNELS")) 
              return message.channel.send("Vous n'avez pas les permissions nécesaire pour effectuer cette command !")
            let channel = client.channels.cache.get(message.channel.id)
          var pos = channel.position;
            
            
            channel.clone().then((channel2) => {
              channel2.setPosition(pos)
              channel.delete()
              channel2.send("Channel Nuked !",{
              files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
              })
            })
        }
        if (reaction.emoji.name === '❌') {
            message.delete()
        }
    })
    .catch(collected => {
        return message.delete();
    });

     
};

module.exports.help = {
  name : "nuke",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};