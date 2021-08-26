//siteweb link
//dashboard link https://discord.com/oauth2/authorizeclient_id=782893623271358465&redirect_uri=https%3A%2F%2Fbotdash.pro%2Fapi%2Fv1%2Fauth&response_type=code&scope=identify%20guilds
//Dpcs link https://oobot.gitbook.io/docs/
//invite link : https://discord.com/oauth2/authorizeclient_id=875731124352090112&permissions=193273397111&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D782893623271358465%26redirect_uri%3Dhttps%253A%252F%252Fbotdash.pro%252Fapi%252Fv1%252Fauth%26response_type%3Dcode%26scope%3Didentify%2520guilds&scope=bot
const keepAlive = require('./server')
const { Client, Collection, MessageEmbed, Message } = require('discord.js'); // Add This
  const fs = require('fs')


let client = new Client({ partials: ["MESSAGE", "USER", "REACTION"] });

const { readdirSync } = require("fs");
const configs = require('./config')
const botdash = require('botdash.pro');
const { time } = require('console');
const discord = require('discord.js')
const DisTube = require('distube');
const { Playlist } = require('discord-player');
const { userDM, userBan, userKick, userMsgReact, maths, send, addRole, removeRole, dateAgo, timeout, chatBot } = require("discord-robots")
const { argv, config } = require('process');
const fetch = require('node-fetch')
const { channel } = require('diagnostics_channel');
const guild = require('./models/guild');
const { functions } = require('lodash');
const logs = require('discord-logs');
const invites = require('discord-invites')
const map = new Map();
const db = require('quick.db');
const InvitesTracker = require('@androz2091/discord-invites-tracker');
const canvacord = require("canvacord");
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});


const enmap = require('enmap');
const tktsettings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});
var dashboard = ""
dashboard = new botdash.APIclient("f236ce40-4db5-40c3-84f7-f3a646828d1f");
const embed = new MessageEmbed();








["commands", "cooldowns"].forEach(x => client[x] = new Collection())
client.mongoose = require('./mongo')
const EasyAntiSpam = require('easyantispam'); // Js
// TypeScript: import EasyAntiSpam from "easyantispam";

const Easy = new EasyAntiSpam.Config({
    urls: false, // Delete or not all URLS
    discordInvites: false, // Delete or not Discord Invites 
    allowUrlImages: true, // Delete or not Images provided by URL
    dm: true, // If true, send your message with URL to private message
    
    messageFlood: "Stop Spaming {author}!", // Message sent when a user is warned for flood
    messageKicked: "{author} a été kick pour spamm.", // Message sent when a user is kicked
    messageBanned: "{author} a été ban pour spam.", // Message sent when a user is banned
    allowBots: true, // Allow bots
    allowedPerms: [], // List of permissions allowed to do spam
    warnRow: 4, // Messages sent in a row to be warned
    kickRow: 6, // Messages sent in a row to be kicked
    banRow: 8, // Messages sent in a row to be banned
    rowInterval: 2000, // Amount of time in ms to consider spam (2s)
    warnDuplicates: 5, // Duplicated messages sent to be warned
    kickDuplicates: 10, // Duplicated messages sent to be kicked
    banDuplicates: 15, // Duplicated messages sent to be banned
    duplicatesInterval: 60000, // Amount of time in ms to consider spam (10m)
    canKick: true, // If false, the bot dont kick users
    canBan: true, // If false, the bot dont ban users
    banDays: 3, // Amount of days of Ban
}
); // And more config variables...





const loadCommands = (dir = "./Commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Command chargé : ${getFileName.help.name} `);
    };
  });
};

loadCommands();
logs(client);

invites.setup(client)
client.on('MemberJoin', async (member, invite, inviter) => {
if(db.has(`invites-${member.guild.id}`) === false) return;


  const invtchnl = db.get(`invtChannel_${member.guild.id}`)
  const inviteschannel = client.channels.cache.get(invtchnl)
  db.set(`${inviter.tag}_BONUS_${member.guild.id}`, 0)
   db.set(`${inviter.tag}_INVITES_${member.guild.id}`, 0)
   db.add(`${inviter.tag}_INVITES_${member.guild.id}`, 1)
  const invites = await db.get(`${inviter.tag}_INVITES_${member.guild.id}`)
  inviteschannel.send(`${member} joined using invite code \`${invite.code}\` by ${inviter}. has now **${invites}** invites !`)
 

});
tracker.on('guildMemberAdd', (member, type, invite) => {
const invtchnl = db.get(`invtChannel_${member.guild.id}`)
  const welcomeChannel = client.channels.cache.get(invtchnl)

    if(type === 'vanity'){
        welcomeChannel.send(`Welcome ${member}! You joined using a custom invite!`);
    }

    else if(type === 'permissions'){
        welcomeChannel.send(`Welcome ${member}! I can't figure out how you joined because I don't have the "Manage Server" permission!`);
    }

    else if(type === 'unknown'){
        welcomeChannel.send(`Welcome ${member}! I can't figure out how you joined the server...`);
    }

});

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on("message", async (message) => {
   Easy.run(message);


  const prefix = await dashboard.getVal(message.guild.id, "botprefix");
  if (message.author.bot) return;
  if (message.content === client.user.username || message.content === client.user.tag || message.content === 'help') {
    message.channel.send(new MessageEmbed().setDescription(`Mon Prefix pour ce serveur est \`${prefix}\``))
  }


  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();

  if (command == "suggest" || command == "suggestion" || command == "sugg") {
    const suggestchannel = await dashboard.getVal(message.guild.id, "sugchannel");
    const enabled = await dashboard.getVal(message.guild.id, "sugenabled");


    if (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
    if (enabled === 'on') {



      let messageArgs = args.join(' ');
      const sugembed = new MessageEmbed()
        .setColor('FADF2E')
        .setTitle('**Une suggestion de la part de : **' + message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

      message.channel.send(sugembed).then((msg) => {
        msg.react('👍');
        msg.react('👎');
        message.delete();
      }).catch((err) => {
        throw err;
      });

    }
  }
  if (command == "set-tickets" || command == "setTickets" || command == "ticket-setup" || command == "tickets") {

    // ticket-setup #channel
    const customFooter = await dashboard.getVal(message.guild.id, "footer");
    const enabled = await dashboard.getVal(message.guild.id, "tktenabled");

    console.log(enabled)

    if (enabled === 'off') return message.channel.send('la command est desactivé pour l\'activer veuilez lire la docs');
    if (enabled === 'on') {


      let channel = message.mentions.channels.first();
      if (!channel) return message.reply("Usage: `!ticket-setup #channel`");

      let ticketEmbd = await channel.send(new MessageEmbed()
        .setTitle("Ticket System")
        .setDescription("React to open a ticket!")
        .setFooter(`ooBot ticket system | ${customFooter} `)
        .setColor("00ff00")
      );

      ticketEmbd.react('🎫');
      db.set(`${message.guild.id}-ticket`, ticketEmbd.id);


      message.channel.send("Ticket System Setup Done!")
    }

    if (command == "close" || command == "close-tkt" || command == "close-ticket") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de fermer ce ticket.')
      if (!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
      message.channel.delete();
    }
  }





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
  if (command == "skip" || command == "fs")
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

xp(message)
    if(command == "rank" ) {
       if(db.has(`xp-${message.guild.id}`)  === false) return message.channel.send(` :x: **Le system d'xp est desactivé taper \`${prefix}set-xp\` Pour l'activer**`);
    
   const xpchnl = await db.get(`xpChannel_${message.guild.id}`)
    if(message.author.bot) return;
    var userlvl = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${userlvl.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${userlvl.id}`) || 0;
    var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
  var userlvl = message.mentions.users.first() || message.author;
  var level = db.fetch(`guild_${message.guild.id}_level_${message.author.id}`) 
        var xp = db.fetch(`guild_${message.guild.id}_xp_${userlvl.id}`)
   
   const rank = new canvacord.Rank()
    .setAvatar(userlvl.displayAvatarURL({format: 'png', dynamic: true}))
    .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${userlvl.id}`) || 0)
    .setRequiredXP(xpNeeded)
    .setStatus(userlvl.presence.status)
    .setLevel(db.fetch(`guild_${message.guild.id}_level_${userlvl.id}`) || 0)
    .setRank(1, 'RANK', false)
    .setProgressBar("#f5604c", "COLOR")
    .setOverlay("#242323")
    .setBackground("COLOR", "#1a1919")
    .setUsername(userlvl.username)
    .setDiscriminator(userlvl.discriminator);

    rank.build()
    
       .then(data => {
            const atta = new discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }

    async function  xp(message) {
         const xpchnl = await db.get(`xpChannel_${message.guild.id}`)
        xpchannel = client.channels.cache.get(xpchnl)
      if(db.has(`xp-${message.guild.id}`)  === false) return;
        if(message.author.bot) return;
        const randomNumber = Math.floor(Math.random() * 10) + 25;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            xpchannel.send( new discord.MessageEmbed() .setDescription(`**<:oo_LvlUp:880516002947928114> Congrats ${message.author}, you leveled UP <:oo_Up:880521813833187389>, you are now level ${newLevel}**`) .setColor("#f5604c"))
        }
    }
    
//--------------Anti SPAM EVENT ---------------------------------------------
 if(map.has(message.author.id)) {
        const data = map.get(message.author.id)
        const { lastmsg, timer } = data;
        const diff = message.createdTimestamp - lastmsg.createdTimestamp;
        let msgs = data.msgs
        if(diff > 2000) {
            clearTimeout(timer);
            data.msgs = 1;
            data.lastmsg = message;
            data.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, 5000)
            map.set(message.author.id, data)
        } else {
            ++msgs;
            if(parseInt(msgs) === 5) {
                const rolename = 'mute' || 'muted'
                const role = message.guild.roles.cache.find(roles => roles.name.toLowerCase() === rolename.toLowerCase())
                message.member.roles.add(role)
                message.channel.send(`Muted ${message.author.username}, for spamming`)
                setTimeout(() => {
                    message.member.roles.remove(role)
                    message.channel.send(`Unmuted ${message.author.username}`)
                }, 5000)
            } else {
                data.msgs = msgs;
                map.set(message.author.id, data)
            }
        }
    } else {
        let remove = setTimeout(() => {
            map.delete(message.author.id);
        }, 5000)
        map.set(message.author.id, {
            msgs: 1,
            lastmsg: message,
            timer: remove
        })
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode  ?queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
  //playing --------------------------

  //----------------------------------
  .on("playSong", (message, queue, song) => message.channel.send(
    new MessageEmbed().setTitle('🎶 Playing 🎶').addField('🎶 Song', `${song.name}`, true).addField('Duration', `${song.formattedDuration}`, true)
      .addField('🎵 Queue status ', `${status(queue)}`).setFooter(`requested by ${song.user} | ooBot Music`)

  ))

  .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed().setTitle('🎶 Added to the queue 🎶').addField('🎶 Added Song', `${song.name}`, true).addField('Duration', `${song.formattedDuration}`, true)
    .addField('🎵 Queue status ', `${status(queue)}`).setFooter(`song added by ${song.user} | ooBot Music`)
  ))

  .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed().setTitle('🎶 PlayList 🎶', `${args}`).addField('🎶 PlayList name', `${playlist.name}`, true).addField('🎶 Playlist songs', `${song.formattedDuration}`, true)
    .addField('🎶 Now playing', `${song.name} **-** ${song.formattedDuration}`, true).addField('🎵 Queue status ', `${status(queue)}`, true).setFooter(`Added playlist by ${song.user} `)
  ))

  .on("addList", (message, queue, playlist) => message.channel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
  ))
  // DisTubeOptions.searchSongs = true

  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(new MessageEmbed().setTitle('🎶 select a song 🎶').setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`).setFooter(`Enter anything else or wait 60 seconds to cancel | ooBot Music`));
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) => message.channel.send(new MessageEmbed().setDescription('☑️ **Canceled ! **')))
  .on("error", (message, e) => {
    console.error(e)
    message.channel.send(new MessageEmbed().setDescription('⚠️ ** An error encountered:** ').addField('ERORR :', `\`\`\`diff\n- ${e} \`\`\``));
  });


const Canvas = require('canvas')
const { registerFont, createCanvas } = require('canvas')
registerFont('/home/runner/ooBot-Bot/Urbanist-BlackItalic.ttf', { family: 'Urbanist' })



var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '20px "Urbanist"';
welcomeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage("https://wallpaperaccess.com/full/19276.jpg").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke()
    welcomeCanvas.context.fill()
})
//Bye canvas
var byeCanvas = {};
byeCanvas.create = Canvas.createCanvas(1024, 500)
byeCanvas.context = byeCanvas.create.getContext('2d')
byeCanvas.context.font = '20px "Urbanist"';
byeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage("https://cdn.discordapp.com/attachments/876554011958976522/880413318513307698/anime-street-road-buildings-scenery-night-stars-anime.png").then(async (img) => {
    byeCanvas.context.drawImage(img, 0, 0, 1024, 500)
    byeCanvas.context.beginPath();
    byeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    byeCanvas.context.stroke()
    byeCanvas.context.fill()
})


///j=bot added to a server
client.on('guildMemberAdd', async member => {
  const chnl = db.get(`wlcmChannel_${member.guild.id}`)
    const welcomechannel = client.channels.cache.get(chnl)
    let canvas = welcomeCanvas;
    canvas.context.font = '50px "Urbanist"',
    canvas.context.textAlign = 'center';
    canvas.context.fillText(`WELCOME To ${member.guild.name} 🥳 !`, 512, 357)
    canvas.context.font = '45px "Urbanist"',
    canvas.context.textAlign = 'center';
    canvas.context.fillText(`🎉 ${member.user.tag.toUpperCase()} !`, 512, 405)
    canvas.context.font = '35px "Urbanist"'
    canvas.context.fillText(`Vous etes le ${member.guild.memberCount}eme membre`, 512, 444)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    let atta = new discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
    try {
       
        welcomechannel.send(`:wave: Hello ${member}, welcome to ${member.guild.name}!`, atta)
    } catch (error) {
        console.log(error)
    }
})
//Bye image
client.on("guildMemberRemove", async (member) => {

  const chnl = db.get(`wlcmChannel_${member.guild.id}`)
    const welcomechannel = client.channels.cache.get(chnl)
    let canvas = byeCanvas;
    canvas.context.font = '50px "Urbanist"',
    canvas.context.textAlign = 'center';
    canvas.context.fillText(`AU REVOIR`, 512, 357)
    canvas.context.font = '45px "Urbanist"',
    canvas.context.textAlign = 'center';
    canvas.context.fillText(`${member.user.tag.toUpperCase()} !`, 512, 405)
    canvas.context.font = '35px "Urbanist"'
    canvas.context.fillText(`${member.username} a quitté le serveur 😔,`, 512, 444)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    let atta = new discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
    try {
       
        welcomechannel.send(`:wave: Hello ${member}, welcome to ${member.guild.name}!`, atta)
    } catch (error) {
        console.log(error)
    }
})
///----CAPTCHAAA----------------
client.on('messageReactionAdd', async (reaction, user) => {

  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();


  if (user.bot) return;

  let ticketmsg = await db.get(`${reaction.message.guild.id}-ticket`);


  if (!ticketmsg) return;

  if (reaction.message.id == ticketmsg && reaction.emoji.name == '🎫') {
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
      let msg = channel.send(`<@${user.id}>`, new MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00").addField('Close the ticket', ''))
    })
  }
})


client.on("channelCreate", function(channel) {
  const captchachnl = client.channels.cache.get('873553765611999323')
  console.log(`channelCreate: ${channel}`);
  captchachnl.send(`New channel created ${channel}`)
});



client.on('guildMemberAdd', async (member) => {
  const LogChannel = await dashboard.getVal(member.guild.id, "logchnl");
   if(db.has(`captcha-${member.guild.id}`)  === false) return;
    
   const captchachnl = await db.get(`captchaChannel_${member.guild.id}`)
   const role = await db.get(`CaptchaRole_${member.guild.id}`)


  // Add role to the member

  const url = 'https://api.no-api-key.com/api/v2/captcha';
  try {
    fetch(url)
      .then(res => res.json())
      .then(async json => {
        console.log(json)
        const msg = await client.channels.cache.get(captchachnl).send(
          new MessageEmbed()
            .setTitle(member.user.tag + 'Please enter the captcha')
            .setImage(json.captcha)
            .setColor("RANDOM")
        )
        try {
          const filter = (m) => {
            if (m.author.bot) return;
            if (m.author.id === member.id && m.content === json.captcha_text) return true;
            else {
              
              client.channels.cache.get(LogChannel).send(
          new MessageEmbed()
            .setTitle(member.user.tag + 'Failed the captcha')
            .addField('Captcha code : ',`${json.captcha_text}`, true)
            .addField('Member reply ',`${m.content}`)
            .setColor("RANDOM"))


            }
          };
          const response = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          if (response) {
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
// WELCOME MESSAGE ------------------------------


})




///--------captcha----------------

client.on("guildMemberAdd",  async (member) => {
   if(db.has(`greeting-${member.guild.id}`) === false) return;
 const welcomechnl = await db.get(`wlcmChannel_${member.guild.id}`)
    const byechnl = await db.get(`byeChannel_${member.guild.id}`)
   
  const wlcmmsg = await dashboard.getVal(member.guild.id, "embdtitle");
  
let canvas = welcomeCanvas;
    canvas.context.font = '60px sans-serif',
    canvas.context.textAlign = 'center';
    canvas.context.fillText('WELCOME '+member.user.tag.toUpperCase() + ' !', 512, 396)
    canvas.context.font = '50px sans serif'
    canvas.context.fillText(`You are the ${member.guild.memberCount}Th !`, 512, 446)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    let attach = new discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
    try {
   
        welcomechnl.send(new MessageEmbed() .setTitle(wlcmmsg) .setImage(attach))
    } catch (error) {
        console.log(error)
    }


  });




//


client.on('messageDelete', async message => {

  if (message.author.id = client.user.id) return;

  const LogChannel = await dashboard.getVal(message.guild.id, "logchnl");
  const DeletedLog = new MessageEmbed()
    .setTitle("Deleted Message")
    .addField('Deleted by', `${message.author} - (${message.author.id})`)
    .addField("In", message.channel)
    .addField('Content', message.content, true)
    .setColor('RANDOM')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  LogChannel.send(DeletedLog)

})

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.author.id = client.user.id) return;
 const LogChannel = await dashboard.getVal(oldMessage.guild.id, "logchnl");
  const EditedLog = new MessageEmbed()
    .setTitle("Edited Message")
    .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
    .addField("In", oldMessage.channel, true)
    .addField('Old Message', oldMessage.content || "⚠️ERR", true)
    .addField('New Message', newMessage.content || "⚠️ERR", true)
    .setColor('RANDOM')
    .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
  await LogChannel.send(EditedLog)

})






client.on('message', async function(message) {
  const prefix = await dashboard.getVal(message.guild.id, "botprefix");


  const PREFIX = `${prefix}`

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  console.log(args.splice(1).join(' '));

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases
    && cmd.help.aliases.includes(commandName));

  if (!command) return;

  const user = message.mentions.users.first();

  const embed = new MessageEmbed()
    .setColor("#2F3136")
    .setDescription(":x: *vous ne pouvez pas expulser ou banir un modérateur ou administrateur !**")

  if (command.help.isUserAdmin && !user) return;

  if (command.help.isUserAdmin && message.guild.member(user).hasRole) return message.channel.send(embed);

  if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return (
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
  const cdAmount = (command.help.cooldown || 5) * 1000;



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


  //xp levels



});


client.on('guildCreate', async (message, guild) => {

  const wlcmmsg = db.get(`welcomeChannel_${guild.id}`)
  guildsDB.set(`NewGuild_${guild.name}`, [`${guild.id}`])
  guildsDB.push(`NewGuild_${guild.name}`, `${wlcmmsg}`);

  const embed1 = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Bot added to a new server !`)
    .addField('Server Name', `\`\`\`${guild.name}\`\`\``, true)
    .addField('Server Members', `\`\`\`${guild.memberCount}\`\`\``)
    .addField('Total servers', `\`\`\`${client.guilds.cache.size}\`\`\``)
    .setDescription('Some description here')


  // [ "apple", "orange" ]
  //Your other stuff like adding to guildArray
})

//------CUSTOM VARIABLES--------------









client.on('ready', async () => {


  
  const statuses = [
    /// status numéro 1
    () => ` En devlopment ! ${client.guilds.cache.size} serveurs ! 🎉`,
    /// Status numero 2
    () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
  ]
  let i = 0
  setInterval(() => {
    client.user.setActivity(statuses[i](), { type: 'PLAYING' })
    i = ++i % statuses.length
  }, 1e4)
});

client.guilds.cache.forEach(guild => {
  console.log(`${guild.name} | ${guild.id}`);
});



client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`)),
keepAlive();
client.login(process.env.TOKEN);

