
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
  
                  
const invtchannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);

  if(args[0] === 'on' || args[0] === 'off') {



     if(args[0] === 'on' ) {

if(!invtchannel) return   message.channel.send(':x: **Please mention a channel for invitations ** eg : `!set-invites on #check-Invites` ') ; 

if (db.has(`invtChannel_${message.guild.id}`)) {
 message.channel.send( new MessageEmbed() .setTitle(' ✅  Parametres mit a jour  ') .setDescription(`** ⚙️ Nouveau parametres :**`).addField('`📥` Invites channel : ',` ${invtchannel}`, true))  
db.set(`invtChannel_${message.guild.id}`, wlcmchannel.id)
}
else {
            await db.set(`invites-${message.guild.id}`, true)
              db.set(`invtChannel_${message.guild.id}`, invtchannel.id)
              
            message.channel.send( new MessageEmbed() .setTitle(' `✅`** Turned on invites tracker system !**') .setDescription(` to customize the message go to the dashboard and modify the message . \n **Use these variables :** `) .addField("`${invites}\`",` for how many invites has the invitor `, true).addField("`${invitor.tag}``",` for the invitor tag  `, true).addField("`${member.user.tag}`",` for the new invited member tag  `, true).addField("`${invite.code}`",` for the invite code eg : .gg/\`XpfhYD\`  `, true).addField("`${invite.uses}`",`how many times the invitation has been used since it was created `, true) )
}
        } else if(args[0] === 'off') {
            await db.delete(`invites-${message.guild.id}`)
            db.delete(`invtChannel_${message.guild.id}`)
            message.channel.send('`✅` Turned off invites tracker system !')
        }
  } else return message.channel.send(':x: **Please Enter a valid option `on/off`**') ;


  
};

module.exports.help = {
  name : "set-invite",
  aliases :['setup-invites', 'set-invites'],
  description: "configurer le system de tracker d'invitation ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : true 
};