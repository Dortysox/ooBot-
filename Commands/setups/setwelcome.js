
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
  
                  
const wlcmchannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
const byechannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                  
  if(args[0] === 'on' || args[0] === 'off') {



     if(args[0] === 'on' ) {

if(!wlcmchannel || !byechannel) return   message.channel.send(':x: **Veuillez Mentionner un salon pour le bienvenue est le au revoire ** eg : `!set-captcha on #bienvenue #byebye` ') ; 

if (db.has(`wlcmChannel_${message.guild.id}`) ||db.has(`byeChannel_${message.guild.id}`)) {
 message.channel.send( new MessageEmbed() .setTitle(' ✅  Parametres mit a jour  ') .setDescription(`** ⚙️ Nouveau parametres :**`).addField('`📥` Salon de bienvenue : ',` ${wlcmchannel}`, true).addField('`📤` Salon de byebye : ',` ${byechannel}`, true))  
db.set(`wlcmChannel_${message.guild.id}`, wlcmchannel.id)
db.set(`byeChannel_${message.guild.id}`, byechannel.id)
} 
else {
            await db.set(`greeting-${message.guild.id}`, true)
              db.set(`wlcmChannel_${message.guild.id}`, wlcmchannel.id)
              db.set(`byeChannel_${message.guild.id}`, byechannel.id)
            message.channel.send(' `✅`** Turned on welcome/goodbye messages !**')
}
        } else if(args[0] === 'off') {
            await db.delete(`greeting-${message.guild.id}`)
            message.channel.send('`✅` Turned off welcome/goodbye messages')
        }
  } else return message.channel.send(':x: **Veuillez entrer une option valid on/off**') ;


  
};

module.exports.help = {
  name : "set-greeting",
  aliases :['config-greeting', 'set-welcome'],
  description: "configurer le ststem de salutastion",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : true 
};