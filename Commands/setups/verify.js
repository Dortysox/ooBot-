
const { Guild, MessageEmbed } = require("discord.js");
const fs = require("fs");
const Database = require("easy-json-database");
const db = new Database("C:/Users/Fatsah/Desktop/Wizzy Bot/Database/bdd.json", {
    snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './backups/'
    }
});

module.exports.run = async (client, message, args, guild) => {
    

    const { ReactionCollector } = require('discord.js-collector')


    const pages = {
      '✅': {
          embed: {
              title: 'Verify member Config',
              description: `React below embed to configure channel or message of welcome settings.\n\n📜 Channel settings\n📢 Message settings`,
          },
          reactions: ['📜', '📢'],
          pages: {
              '📜': {
                  backEmoji: '↩️',
                  embed: {
                      description: 'Please mention or use channel id to set as welcome channel.'
                  },
                  onMessage: async (controller, message) => {
                      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                      if (!channel)
                      
                          return message.reply('🚫 | You\'ve forgot mention a channel or use their id.').then((m) => m.delete({ timeout: 3000 }));
            
                         db.set("Hello", "World");                    
                      // Do what you want here, like set it on database...
                      return await message.reply(`✅ | Success! You've settled welcome channel as ${channel}.`).then(m => m.delete({ timeout: 3000 }));
                  }
              },
              '📢': {
                  backEmoji: '↩️',
                  embed: {
                      description: 'Make the message used when a member join in the server.',
                  },
                  onMessage: async (controller, message) => {
                      bdd["messagewlcm"] = message
                      // Do what you want here, like set it on database..
                      return await message.reply('✅ | Success!').then(m => m.delete({ timeout: 3000 }));
                  }
              }
          }
      },
    };

   const roleid = await dashboard.getVal(me.id, "verifrole");
    const channelname = await dashboard.getVal(message.guild.id, "vrifvhnl");
       const enabled = await dashboard.getVal(message.guild.id, "cmdenabled");
     
    if  (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
    if(enabled === 'on') {
    
            const embed = new MessageEmbed()
                .setTitle('Config verify system')
                .setDescription('Pour configurer.\n\n📥 Welcome module')
            const botMessage = await message.reply(embed);
            ReactionCollector.menu({ botMessage, user: message.author, pages });

            
            const Verificationembed = new MessageEmbed()
            
            const channelsend =  client.channels.cache.find(channel => channel.name === "Rules" || channelname);
                Verificationembed.setColor('#0099ff')
                .setTitle(`Accepter le reglement ${guild.name}`)
                .setDescription(`cliquer sur ✅ Acepter le reglement de **${guild.name}** `)
            channelname.send(Verificationembed)
            
        
    }
      

};

module.exports.help = {
  name : "verify",
  aliases :['repeat', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};