
const { Guild, MessageEmbed } = require("discord.js");
const fs = require("fs");

const db = require('quick.db')
const botdash = require('botdash.pro');
var dashboard = ""
dashboard = new botdash.APIclient("f236ce40-4db5-40c3-84f7-f3a646828d1f");
module.exports.run = async (client, message, args, guild) => {
    

    const { ReactionCollector } = require('discord.js-collector')


    const pages = {
      'ā': {
          embed: {
              title: 'Verify member Config',
              description: `React below embed to configure channel or message of welcome settings.\n\nš Channel settings\nš¢ Message settings`,
          },
          reactions: ['š', 'š¢'],
          pages: {
              'š': {
                  backEmoji: 'ā©ļø',
                  embed: {
                      description: 'Please mention or use channel id to set as welcome channel.'
                  },
                  onMessage: async (controller, message) => {
                      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                      if (!channel)
                      
                          return message.reply('š« | You\'ve forgot mention a channel or use their id.').then((m) => m.delete({ timeout: 3000 }));
            
                         db.set("Hello", "World");                    
                      // Do what you want here, like set it on database...
                      return await message.reply(`ā | Success! You've settled welcome channel as ${channel}.`).then(m => m.delete({ timeout: 3000 }));
                  }
              },
              'š¢': {
                  backEmoji: 'ā©ļø',
                  embed: {
                      description: 'Make the message used when a member join in the server.',
                  },
                  onMessage: async (controller, message) => {
                      bdd["messagewlcm"] = message
                      // Do what you want here, like set it on database..
                      return await message.reply('ā | Success!').then(m => m.delete({ timeout: 3000 }));
                  }
              }
          }
      },
    };

   const roleid = await dashboard.getVal(message.guild.id, "verifrole");
    const channelname = await dashboard.getVal(message.guild.id, "vrifvhnl");
       const enabled = await dashboard.getVal(message.guild.id, "cmdenabled");
     
    if  (enabled === 'off') return message.channel.send('la command est desactivĆ© pour l\'activer veuilez lire la docs');
    if(enabled === 'on') {
    
            const embed = new MessageEmbed()
                .setTitle('Config verify system')
                .setDescription('Pour configurer.\n\nš„ Welcome module')
            const botMessage = await message.reply(embed);
            ReactionCollector.menu({ botMessage, user: message.author, pages });

            
            const Verificationembed = new MessageEmbed()
            
            const channelsend =  client.channels.cache.find(channel => channel.name === "Rules" || channelname);
                Verificationembed.setColor('#0099ff')
                .setTitle(`Accepter le reglement ${guild.name}`)
                .setDescription(`cliquer sur ā Acepter le reglement de **${guild.name}** `)
            channelname.send(Verificationembed)
            
        
    }
      

};

module.exports.help = {
  name : "verify",
  aliases :['repeat', 'rep'],
  description: "rĆ©pete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};