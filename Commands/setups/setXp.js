
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
 
const xpchannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                  
  if(args[0] === 'on' || args[0] === 'off') {



     if(args[0] === 'on' ) {

if(!xpchannel) return   message.channel.send(':x: **Veuillez Mentionner un salon pour les Messages d\'xp ** eg : `!set-captcha on #verify @membre` ') ; 


if (db.has(`xpChannel_${message.guild.id}`)) {
 message.channel.send( new MessageEmbed() .setTitle(' ✅  Parametres mit a jour  ') )  
db.set(`xpChannel_${message.guild.id}`, xpachannel.id)

}
else {
            await db.set(`xp-${message.guild.id}`, true)
              db.set(`xpChannel_${message.guild.id}`, xpchannel.id)
             
            message.channel.send(' ` ✅ ` Le system de d\'xp a été activé')
}
        } else if(args[0] === 'off') {
            await db.delete(`xp-${message.guild.id}`)
             db.delete(`xpChannel_${message.guild.id}`)
             
            message.channel.send('` ✅ ` Le system de d\'xp a été déactivée')
        }
  } else return message.channel.send(':x: **Veuillez entrer une option valid on/off**') ;


  
};

module.exports.help = {
  name : "setup-Levels",
  aliases :['set-xp', 'xp'],
  description: "configurer le system d'xp",
  usage: '<on/off> <#channel> <@role>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};




