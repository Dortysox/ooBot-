//siteweb link
//dashboard link https://discord.com/oauth2/authorize?client_id=782893623271358465&redirect_uri=https%3A%2F%2Fbotdash.pro%2Fapi%2Fv1%2Fauth&response_type=code&scope=identify%20guilds
//Dpcs link https://oobot.gitbook.io/docs/
//invite link : https://discord.com/oauth2/authorize?client_id=875731124352090112&permissions=193273397111&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D782893623271358465%26redirect_uri%3Dhttps%253A%252F%252Fbotdash.pro%252Fapi%252Fv1%252Fauth%26response_type%3Dcode%26scope%3Didentify%2520guilds&scope=bot
const {Client, Collection, MessageEmbed, Message} = require('discord.js'); // Add This
const {TOKEN } = require('./config');
const fs = require('fs')

let client = new Client({partials: ["MESSAGE", "USER", "REACTION"]});

const {readdirSync} = require("fs");
const configs = require('./config')
const botdash = require('botdash.pro');
const { time } = require('console');
const DisTube = require('distube');
const { Playlist } = require('discord-player');
const { userDM, userBan, userKick, userMsgReact, maths, send, addRole, removeRole, dateAgo, timeout, chatBot } = require("discord-robots")
const { argv, config } = require('process');
const fetch = require('node-fetch')
const { channel } = require('diagnostics_channel');
const guild = require('./models/guild');
const { functions } = require('lodash');
const Database = require("easy-json-database");
const { db } = require('./models/guild');
const guildsDB = new Database("C:/Users/Fatsah/Desktop/Wizzy Bot/Database/guilds.json", {
    snapshots: {
        greetingon: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './backups/'
    }
});

var dashboard = ""
dashboard = new botdash.APIclient("f236ce40-4db5-40c3-84f7-f3a646828d1f");
const embed = new MessageEmbed();


  





["commands", "cooldowns"].forEach(x => client[x] = new Collection())
client.mongoose = require('./mongo')



function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
      if (err) message.channel.send("Une erreur est survenue.");
  });
}

const loadCommands = (dir = "./Commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands  = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Command chargé : ${getFileName.help.name} `);
    };
  });
};
 
loadCommands();

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on("message", async (message) => {

  const prefix = await dashboard.getVal(message.guild.id, "botprefix");
  if (message.author.bot) return;
  if (message.content === client.user.username || message.content === client.user.tag || message.content === 'help') {
    message.channel.send(new MessageEmbed().setDescription(`Mon Prefix pour ce serveur est \`${prefix}\``))
  }


  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();

 if (command == "suggest" || command == "suggestion" || command == "sugg"){
  const suggestchannel = await dashboard.getVal(message.guild.id, "sugchannel");
  const enabled = await dashboard.getVal(message.guild.id, "sugenabled");

       
      if  (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
      if(enabled === 'on') {


   
        let messageArgs = args.join(' ');
        const sugembed = new MessageEmbed()
        .setColor('FADF2E')
        .setTitle('**Une suggestion de la part de : **'+ message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

        message.channel.send(sugembed).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });

      }
    }
  if (command == "set-tickets" || command == "setTickets" || command == "ticket-setup"){
 
    // ticket-setup #channel
    const customFooter = await dashboard.getVal(message.guild.id, "footer");
const enabled = await dashboard.getVal(message.guild.id, "tktenabled");

console.log(enabled)
     
    if  (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
    if(enabled === 'on') {

  
    let channel = message.mentions.channels.first();
    if(!channel) return message.reply("Usage: `!ticket-setup #channel`");

    let sent = await channel.send(new MessageEmbed()
        .setTitle("Ticket System")
        .setDescription("React to open a ticket!")
        .setFooter(`ooBot ticket system | ${customFooter} `)
        .setColor("00ff00")
    );

    sent.react('🎫');
    guildsDB.set(`${message.guild.id}-ticket`, sent.id);
    

    message.channel.send("Ticket System Setup Done!")
}

if(command == "close" || command == "close-tkt" || command == "close-ticket") {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de fermer ce ticket.')
    if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
    message.channel.delete();
}}





  if (command == "play" || command == "p")
      distube.play(message, args.join(" "));

  if (["repeat", "loop"].includes(command))
      distube.setRepeatMode(message, parseInt(args[0]));
      

  if (command == "stop" || command == "stp") {
      distube.stop(message);
      message.channel.send("Stopped the music!");
  }
   if (command == "pause" || command == "ps") {
    message.channel.send(`** ⏸️ PAUSED !*`)
    return distube.pause(message); 
}
 if (command == "resume" || command == "r") {
  message.channel.send(`** ▶️ RESUME !*`)
    return distube.resume()
}
  if (command == "skip" ||command == "fs")
      distube.skip(message);

 if (command == "queue" || command == "list") {
      let queue = distube.getQueue(message);
      const queueembd = new MessageEmbed()
      .setTitle('🎶 Current queue :')
      .setDescription(queue.songs.map((song, id) =>
      `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
  ).slice(0, 10).join("\n"));

      message.channel.send(queueembd);
  }

  if (command == "queue" || command == "list") {
      let queue = distube.getQueue(message);
      const queueembd = new MessageEmbed()
      .setTitle('🎶 Current queue :')
      .setDescription(queue.songs.map((song, id) =>
      `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
  ).slice(0, 10).join("\n"));

      message.channel.send(queueembd);
  }

  if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
      let filter = distube.setFilter(message, command);
      message.channel.send("Current queue filter: " + (filter || "Off"));
  }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
//playing --------------------------

//----------------------------------
  .on("playSong", (message, queue, song) => message.channel.send(
      new MessageEmbed() .setTitle('🎶 Playing 🎶')  .addField('🎶 Song',`${song.name}`, true)   .addField('Duration', `${song.formattedDuration}`, true)  
    .addField('🎵 Queue status ', `${status(queue)}`) .setFooter(`requested by ${song.user} | ooBot Music`)

  ))
  
  .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed() .setTitle('🎶 Added to the queue 🎶')  .addField('🎶 Added Song',`${song.name}`, true)  .addField('Duration', `${song.formattedDuration}`, true)  
  .addField('🎵 Queue status ', `${status(queue)}`) .setFooter(`song added by ${song.user} | ooBot Music`)
  ))
  
  .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed() .setTitle('🎶 PlayList 🎶' , `${args}`)  .addField('🎶 PlayList name',`${playlist.name}`, true)  .addField('🎶 Playlist songs', `${song.formattedDuration}`, true)  
  .addField('🎶 Now playing', `${song.name} **-** ${song.formattedDuration}`, true) .addField('🎵 Queue status ', `${status(queue)}`, true) .setFooter(`Added playlist by ${song.user} `)
  ))
  
  .on("addList", (message, queue, playlist) => message.channel.send(
      `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
  ))
  // DisTubeOptions.searchSongs = true
  
  .on("searchResult", (message, result) => {
      let i = 0;
      message.channel.send(new MessageEmbed() .setTitle('🎶 select a song 🎶')  .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`) .setFooter(`Enter anything else or wait 60 seconds to cancel | ooBot Music`));
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) => message.channel.send(new MessageEmbed() .setDescription('☑️ **Canceled ! **')))
  .on("error", (message, e) => {
      console.error(e)
      message.channel.send(new MessageEmbed() .setDescription('⚠️ ** An error encountered:** ') .addField('ERORR :',`\`\`\`diff\n- ${e} \`\`\``));
  });


///j=bot added to a server

///----CAPTCHAAA----------------
client.on('messageReactionAdd', async (reaction, user, message) => {

  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  
  
  if(user.bot) return;
  
  let ticketid = await guildsDB.get(`${reaction.message.guild.id}-ticket`);
  
  
  if(!ticketid) return;
  
  if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
      reaction.users.remove(user);
  
      reaction.message.guild.channels.create(`ticket-${user.username}`, {
          permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "s"]
              },
           
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              }
          ],
          type: 'text'
      }).then(async channel => {
          channel.send(`<@${user.id}>`, new MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00").addField('Close the ticket',''))
      })
  }})


client.on("channelCreate", function (channel) {
  const LogChannel = client.channels.cache.get('873553765611999323')
  console.log(`channelCreate: ${channel}`);
  LogChannel.send(`New channel created ${channel}`)
});
 

  
client.on('guildMemberAdd', async (member, message) => {
  const LogChannel = client.channels.cache.find(
    channel => channel.name.toLowerCase() === "verify"
  )
  
  
  var role = member.guild.roles.cache.find(role => role.name == "member")


// Add role to the member

  const url = 'https://api.no-api-key.com/api/v2/captcha';
        try {
            fetch(url)
                .then(res => res.json())
                .then(async json => {
                    console.log(json)
                    const msg = await LogChannel.send(
                        new MessageEmbed()
                            .setTitle(member.user.tag + 'Please enter the captcha')
                            .setImage(json.captcha)
                            .setColor("RANDOM")
                    )
                    try {
                        const filter = (m) => {
                            if(m.author.bot) return;
                            if(m.author.id === member.id && m.content === json.captcha_text) return true;
                            else {
                                msg.channel.send("You have answered the captcha incorrectly!")
                                
                            }
                        };
                        const response = await msg.channel.awaitMessages(filter, {
                            max : 1,
                            time : 30000,
                            errors : ['time']
                        })
                        if(response) {
                           member.send('Congrats, you have answered the captcha.')
                            
                            
                            
                            msg.delete()
                            member.roles.add(role);
                        }
                    } catch (error) {
                        msg.channel.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
                        member.kick()
                    }
                })
        } catch (error) {
            console.log(error)
        }


})


    

///--------captcha----------------




//

  
client.on('messageDelete', message => {
  
  if(message.author.id = client.user.id) return ;

  const LogChannel = client.channels.cache.get('873553765611999323')
  const DeletedLog = new MessageEmbed()
  .setTitle("Deleted Message")
  .addField('Deleted by', `${message.author} - (${message.author.id})`)
  .addField("In", message.channel)
  .addField('Content', message.content, true)
  .setColor('RANDOM')
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  LogChannel.send(DeletedLog)

})

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.author.id = client.user.id) return ;
  const LogChannel = client.channels.cache.get('873553765611999323')
  const EditedLog = new MessageEmbed()
  .setTitle("Edited Message")
  .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
  .addField("In", oldMessage.channel,true)
  .addField('Old Message', oldMessage.content || "⚠️ERR", true)
  .addField('New Message', newMessage.content || "⚠️ERR",true)
  .setColor('RANDOM')
  .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
  await LogChannel.send(EditedLog)

})




  

client.on('message', async function(message)  {
  const prefix = await dashboard.getVal(message.guild.id, "botprefix");
  

const PREFIX = `${prefix}`

  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  console.log(args.splice(1).join(' '));
 
 const command = client.commands.get(commandName)  || client.commands.find(cmd => cmd.help.aliases
   && cmd.help.aliases.includes(commandName) );
   
 if (!command) return;

 const user = message.mentions.users.first();
 
 const embed = new MessageEmbed()
         .setColor("#2F3136")
         .setDescription(":x: *vous ne pouvez pas expulser ou banir un modérateur ou administrateur !**")
 
 if (command.help.isUserAdmin && !user) return;
 
 if (command.help.isUserAdmin && message.guild.member(user).hasRole) return message.channel.send(embed);

 if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS'))  return (
  embed.setColor('2F3136'),
  embed.setDescription(`:no_entry: Vous n'avez pas la permission pour executer cette command !`),
  message.channel.send(embed)
  )
  
 
if (command.help.args && !args.length) {
  let noArgsReply = `:x: **il faut des arguments pour cette commande, ${message.author} !**`;

 if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande:\`${PREFIX}${command.help.name}${command.help.usage}\``

  return message.channel.send(noArgsReply)
}

if (!client.cooldowns.has(command.help.name)) {
  client.cooldowns.set(command.help.name, new Collection());
}
const timenow = Date.now();
const tStamps = client.cooldowns.get(command.help.name);
const cdAmount = (command.help.cooldown || 5 ) * 1000;



if (tStamps.has(message.author.id)) {
  const cdEcpirationTime = tStamps.get(message.author.id) + cdAmount;



  if (timenow < cdEcpirationTime) {
    timeLeft = (cdEcpirationTime - timenow) / 1000;
      return (
      embed.setColor('2F3136'),
      embed.setDescription(`⏰ merci d'atendre  ${timeLeft.toFixed(0)} secende(s) avant d'ituliser la commande \`${command.help.name}\`.`),
      message.channel.send(embed)
      )
  }
}

tStamps.set(message.author.id, timenow)
setTimeout(() => tStamps.delete(message.author.id), cdAmount);

 command.run(client, message, args);
});


client.on('guildCreate', async (message, guild) => {
  
  const wlcmmsg = db.get(`welcomeChannel_${guild.id}`)
  guildsDB.set(`NewGuild_${guild.name}`, [ `${guild.id}` ])
  guildsDB.push(`NewGuild_${guild.name}`, `${wlcmmsg}`);
  
const embed1 = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(`Bot added to a new server !`)
  .addField ('Server Name',`\`\`\`${guild.name}\`\`\``, true)
  .addField ('Server Members',`\`\`\`${guild.memberCount}\`\`\``)
  .addField ('Total servers',`\`\`\`${client.guilds.cache.size}\`\`\``)
  .setDescription('Some description here')


   // [ "apple", "orange" ]
  //Your other stuff like adding to guildArray
})

//------CUSTOM VARIABLES--------------





  




client.on('ready', async () => {


  const mongoose = require('mongoose')
  const { Guild } = require("./models/index")
  module.exports = async (client, guild) => {
      const newGuild = {
          guildID: guild.id,
          guildName: guild.name
      };
      const merged = Object.assign({_id: mongoose.Types.ObjectId() },
      newGuild);
      const createGuild = await new Guild(merged);
      createGuild.Save().then(g => console.log(`Nouveau serveur ${g.guildName}`));
  };
  ///--------------MONGO CONNECTION
 client.mongoose.init()

  
  const statuses = [
/// status numéro 1
      () => ` En devlopment ! ${client.guilds.cache.size} serveurs ! 🎉`,
/// Status numero 2
      () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
  ]
  let i = 0
  setInterval(() => {
      client.user.setActivity(statuses[i](), {type: 'PLAYING'})
      i = ++i % statuses.length
  }, 1e4)});

  client.guilds.cache.forEach(guild => {
    console.log(`${guild.name} | ${guild.id}`);
  });


  
client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.login(TOKEN);

