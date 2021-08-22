const discord = require('discord.js')
const lyricsFinder = require("lyrics-finder")


module.exports.run = async (client, message, args) => {
    

    let singer;
    let song;
    let pages = []
    let current = 0

    const filter = msg => msg.author.id == message.author.id;
    let options = {
        max: 1
    };

    message.channel.send(new discord.MessageEmbed() .setTitle('Donnez plus d\'informations') .addField('Question 1/2','**qui est le chanteur ?**').setFooter(' Vous pouvez annulez la command en tappant `cancel` | **ooBot lyrics**'))
    let col = await message.channel.awaitMessages(filter, options)
    if(col.first().content == 'cancel') return message.channel.send("Cancelled");
    singer = col.first().content

    message.channel.send(new discord.MessageEmbed() .setTitle('Donnez plus d\'informations') .addField('**Question 2/2','Quelle est le titre de la chanson ?**').setFooter(' Vous pouvez annulez la command en tappant `cancel` | **ooBot lyrics**'))
    let col2 = await message.channel.awaitMessages(filter, options)
    if(col2.first().content == 'cancel') return message.channel.send("Cancelled");
    song = col2.first().content

    let res = await lyricsFinder(singer, song) || "**Aucun resultat :/**"

    for(let i = 0; i < res.length; i += 2048) {
        let lyrics = res.substring(i, Math.min(res.length, i + 2048))
        let page = new discord.MessageEmbed()
        .setDescription(lyrics)
        pages.push(page)
    }

    const filter2 = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id == user.id)
    const Embed = await message.channel.send(`Page: ${current+1}/${pages.length}`, pages[current])
    await Embed.react('⬅️')
    await Embed.react('➡️')

    let ReactionCol = Embed.createReactionCollector(filter2)

    ReactionCol.on("collect", (reaction, user) => {
        reaction.users.remove(reaction.users.cache.get(message.author.id))

        if(reaction.emoji.name == '➡️') {
            if(current < pages.length - 1) {
                current += 1
                Embed.edit(`Page: ${current+1}/${pages.length}`, pages[current])
            }
        } else {
            if(reaction.emoji.name === '⬅️') {
                if(current !== 0) {
                    current -= 1
                    Embed.edit(`Page: ${current+1}/${pages.length}`, pages[current])
                }
            }
        }
    })




};


module.exports.help = {
  name : "lyrics",
  aliases :['ly', 'paroles'],
  description: "voir les paroles d'une music",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};