
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {


   const Role = message.guild.roles.cache.find(r => r.name == message.content) || message.mentions.roles.first();
const captcharole = await db.get(`captchaRole_${message.guild.id}`)
                  
  if(args[0] === 'on' || args[0] === 'off') {



     if(args[0] === 'on' ) {


if(!Role) return   message.channel.send(':x: **Veuillez Mentionner un role pour la verification ** eg : `!set-autorole on  @notVerified` ') ; 

if(Role == captcharole) return   message.channel.send(':x: **Essayer un autre role , ce role est deja étulisée pour le captcha** eg : `!set-autorole on  @notVerified` ') ; 

if (db.has(`Autorole_${message.guild.id}`)) {
 message.channel.send( new MessageEmbed() .setTitle(' ✅  Parametres mit a jour  ') .setDescription(' ⚙️ **New settings : **') .addField('`👥` Role :',`${Role}`, true) )  
db.set(`role_${message.guild.id}`, Role.id)

} 
else {
            db.set(`Autorole_${message.guild.id}`,true)
            await db.set(`role_${message.guild.id}`, Role.id)
            message.channel.send(' ` ✅ ` L\'autoRole a été activé ')
}
        } else if(args[0] === 'off') {
            await db.delete(`Autorole_${message.guild.id}`)
             db.delete(`role_${message.guild.id}`)
            message.channel.send('` ✅ `L\'autoRole a été désactivé')
        }
  } else return message.channel.send(':x: **Veuillez entrer une option valid on/off**') ;


  
};

module.exports.help = {
  name : "setup-autorole",
  aliases :['set-autorole', 'autorole'],
  description: "activer l'autoRole",
  usage: '<on/off> <#channel> <@role>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};




