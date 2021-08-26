
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
   const CaptchaRole = message.guild.roles.cache.find(r => r.name == message.content) || message.mentions.roles.first();
                  
const wlcmchannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                  
  if(args[0] === 'on' || args[0] === 'off') {



     if(args[0] === 'on' ) {

if(!wlcmchannel) return   message.channel.send(':x: **Veuillez Mentionner un salon pour la verification ** eg : `!set-captcha on #verify @membre` ') ; 
if(!CaptchaRole) return   message.channel.send(':x: **Veuillez Mentionner un role pour la verification ** eg : `!set-captcha on #verify @membre` ') ; 

if (db.has(`captchaChannel_${message.guild.id}`) ||db.has(`captchaRole_${message.guild.id}`)) {
 message.channel.send( new MessageEmbed() .setTitle(' ✅  Parametres mit a jour  ') )  
db.set(`captchaChannel_${message.guild.id}`, wlcmchannel.id)
db.set(`captchaRole_${message.guild.id}`, CaptchaRole.id)
} 
else {
            await db.set(`captcha-${message.guild.id}`, true)
              db.set(`captchaChannel_${message.guild.id}`, wlcmchannel.id)
              db.set(`captchaRole_${message.guild.id}`, CaptchaRole.id)
            message.channel.send(' ` ✅ ` Turned on captcha feature')
}
        } else if(args[0] === 'off') {
            await db.delete(`captcha-${message.guild.id}`)
             db.delete(`captchaChannel_${message.guild.id}`)
             db.delete(`captchaRole_${message.guild.id}`)
            message.channel.send('` ✅ ` Turned off captcha feature')
        }
  } else return message.channel.send(':x: **Veuillez entrer une option valid on/off**') ;


  
};

module.exports.help = {
  name : "setup-captcha",
  aliases :['set-captcha', 'captcha'],
  description: "configurer le salon des tickets",
  usage: '<on/off> <#channel> <@role>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};




