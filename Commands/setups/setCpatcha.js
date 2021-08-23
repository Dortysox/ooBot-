const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {
const { ReactionCollector } = require('discord.js-collector')


  const pages = {
    '✅': {
      embed: {
          title: 'Captcha system Config',
          description: `  📥 **verification chanel**  \n 🙋‍♂️ **Role after verification**`,
          
      },
    
      reactions: ['📥', '🙋‍♂️'],
      pages: {
          '📥': {
              backEmoji: '🔙',
              embed: {
                  description: 'Please mention or use channel id to set as welcome channel.'
              },
              onMessage: async (controller, message) => {
                  const wlcmchannel = message.mentions.channels.first() || message.guild.channels.cache.get(message.content);
                  if (!wlcmchannel)
                      return message.reply('🚫 | You\'ve forgot mention a channel or use their id.').then((m) => m.delete({ timeout: 3000 }));
                      db.set(`captchaChannel_${message.guild.id}`, wlcmchannel.id)
                      
                  // Do what you want here, like set it on database...
                  return message.reply(`✅ | Success! You've settled Captcha channel as ${wlcmchannel}.`).then(m => m.delete({ timeout: 3000 }));
              }
          },
          '🙋‍♂️': {
              backEmoji: '🔙',
              embed: {
                  description: 'Please mention a Role or give their valid name to give after solve captcha',
              },
              onMessage: async (controller, message) => {
                 const CaptchaRole = message.guild.roles.cache.find(r => r.name == message.content) || message.guild.roles.cache.find(r => r.id == message.content) || message.mentions.roles.first();
                  if (!CaptchaRole)
                      return message.reply('🚫 | You\'ve forgot mention a role or use their id/name.').then((m) => m.delete({ timeout: 3000 }));
                  db.set(`CaptchaRole_${message.guild.id}`, CaptchaRole)
                  
                  
                  //const msg = guildsDB.set(`welcomeMessage_${message.guild.id}`, message.content)

                  return  message.reply('✅ | Success!, '+ CaptchaRole).then(m => m.delete({ timeout: 3000 }));
              }
          }
      }
  },
  }



  if(args[0] === 'on') {
            await db.set(`captcha-${message.guild.id}`, true)
            message.channel.send('Turned on captcha feature')
        } else if(args[0] === 'off') {
            await db.delete(`captcha-${message.guild.id}`)
            message.channel.send('Turned off captcha feature')
        }

          const embed = new MessageEmbed()
              .setTitle('Config Captcha system')
              .setDescription('Pour configurer le system de captcha veuillez cliquer sur la reaction ✅')
          const botMessage = await message.reply(embed);
          ReactionCollector.menu({ botMessage, user: message.author, pages });
          

  
    
  
};

module.exports.help = {
  name : "setup-captcha",
  aliases :['set-captcha', 'captcha'],
  description: "configurer le salon des tickets",
  usage: '<on/off>',
  isUserAdmin : false ,
  permissions : true,
  args : true
};