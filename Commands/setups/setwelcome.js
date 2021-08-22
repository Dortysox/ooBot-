const fs = require('fs')
const botdash = require('botdash.pro')
var dashboard = ""
dashboard = new botdash.APIclient("f236ce40-4db5-40c3-84f7-f3a646828d1f");

const Database = require("easy-json-database");
const guildsDB = new Database("C:/Users/Fatsah/Desktop/Wizzy Bot/Database/guilds.json", {
  snapshots: {
      enabled: true,
      interval: 24 * 60 * 60 * 1000,
      folder: './backups/'
  }
});
const db = new Database("C:/Users/Fatsah/Desktop/Wizzy Bot/Database/bdd.json", {
    snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './backups/'
    }
});

module.exports.run = async (client, message, args) => {

   

   
    
  const { ReactionCollector } = require('discord.js-collector')


  const pages = {
    '📥': {
      embed: {
          title: 'Welcome Join Config',
          description: `React below embed to configure channel or message of welcome settings.\n\n📜 Channel settings\n📢 Message settings`,
      },
      reactions: ['📜', '📢'],
      pages: {
          '📜': {
              backEmoji: '🔙',
              embed: {
                  description: 'Please mention or use channel id to set as welcome channel.'
              },
              onMessage: async (controller, message) => {
                  const wlcmchannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                  if (!channel)
                      return message.reply('🚫 | You\'ve forgot mention a channel or use their id.').then((m) => m.delete({ timeout: 3000 }));
                      guildsDB.set(`welcomeChannel_${message.guild.id}`, wlcmchannel.id)
                      
                  // Do what you want here, like set it on database...
                  return await message.reply(`✅ | Success! You've settled welcome channel as ${channel}.`).then(m => m.delete({ timeout: 3000 }));
              }
          },
          '📢': {
              backEmoji: '🔙',
              embed: {
                  description: 'Make the message used when a member join in the server.',
              },
              onMessage: async (controller, message) => {
                  // Do what you want here, like set it on database..
                  guildsDB.set(`welcomeMessage_${message.guild.id}`, message.content)
                  const msg = guildsDB.set(`welcomeMessage_${message.guild.id}`, message.content)

                  return await message.reply('✅ | Success!, your message'+ msg).then(m => m.delete({ timeout: 3000 }));
              }
          }
      }
  },
  }

 const roleid = await dashboard.getVal(me.id, "verifrole");
  const channelname = await dashboard.getVal(message.guild.id, "vrifvhnl");
     const enabled = await dashboard.getVal(message.guild.id, "cmdenabled");
   
  if  (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
  if(enabled === 'on') {
  
          const embed = new MessageEmbed()
              .setTitle('Config Greeting system')
              .setDescription('Pour configurer.\n\n📥 Welcome module')
          const botMessage = await message.reply(embed);
          ReactionCollector.menu({ botMessage, user: message.author, pages });
          message.channel.send(embed)

  
    
  }
};

module.exports.help = {
  name : "set-welcome",
  aliases :['config-welcome', 'set-greeting'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : true 
};