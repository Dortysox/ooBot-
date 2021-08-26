const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = async (client, message, args) => {
  try {
            const embdchannel  = message.mentions.channels.first()
            if(!embdchannel) return message.channel.send(':x: **Veuillez Mentionner un salon Pour envoyer l\'embed !** eg : `!create-embed #announce` ');
            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };
            //skip/cancel===============================================================================================
            // Getting Started
            const embed = new Discord.MessageEmbed();
            message.channel.send( new MessageEmbed() .setTitle(`Generateur d'embed | ooBot`).setDescription(` ${message.author} Bienvenue sur le Generateur D'embed, Voici comment lutiliser : \n  \` - \` **Vous devez répondre à la question posée par le Bot** \n  \` - \`** Utiliser : **`) .addField('```Skip```',' Pour passer a la question suivante ').addField('```Cancel```',' Pour Annuler la command '));
            
    
            //===============================================================================================
            // Getting Title
            message.channel.send(new MessageEmbed() .setTitle(":one: Question numero 1/6 !").setDescription(' ` - ` Question 1/6 \n `🖊️` **Quelle Titre shouaitais vous metre a votre embed**'));
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send( new MessageEmbed() .setTitle('✅ Command annulée'))
            if (title.first().content !== 'skip' && title.first().content !== 'cancel') embed.setTitle(title.first().content);
    
            //===============================================================================================
            // Getting Description
             message.channel.send(new MessageEmbed() .setTitle(":two: Question numero 2/6 !").setDescription(' ` - ` Question 2/6 \n `📎` **Quelle Description shouaitais vous donner a votre embed ? **'));
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send( new MessageEmbed() .setTitle('✅ Command annulée'))
            if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') embed.setDescription(Description.first().content);
    
            //===============================================================================================
            // Getting Footer
            message.channel.send(new MessageEmbed() .setTitle(":three: Question numero 3/6 !").setDescription(' ` - ` Question 3/6 \n `✒` **Voulez-vous que votre Embed ait un Footer ?**'));
            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send( new MessageEmbed() .setTitle('✅ Command annulée'))
            if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel') embed.setFooter(Footer.first().content); 
    
            //===============================================================================================
          
    
            //===============================================================================================
            // Getting Color
            message.channel.send(new MessageEmbed() .setTitle(":four: Question numero 4/6 !").setDescription(' ` - ` Question 4/6 \n `🪁` **Quelle Coulleur voulez vous pour votre embed ? default = black **'));
            let Color = await message.channel.awaitMessages(filter, options);//⬛ ⬜ 🟥 🟦 🟧
            if (Color.first().content == 'cancel') return message.channel.send(new MessageEmbed() .setTitle('✅ Command annulée'))
            if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') embed.setColor(Color.first().content.toUpperCase() || "2f3136")
    
            //===============================================================================================
            // Getting Author Field
             message.channel.send(new MessageEmbed() .setTitle(":five: Question numero 5/6 !").setDescription(' ` - ` Question 5/6 \n `✒` **Voulez-vous que votre Embed ait un Author Field ? ?**'));
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send(new MessageEmbed() .setTitle('✅ Command annulée'))
            if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') embed.setAuthor(Author.first().content);
    
            //===============================================================================================
            // Getting TimeStamp
             message.channel.send(new MessageEmbed() .setTitle(":six: Question numero 6/6 !").setDescription(' ` - ` Question 6/6 \n `✒` **Voulez-vous que votre Embed ait un TimeStamp ?**') .addField('```Yes```','Pour Oui ', true).addField('```No```',' Pour Non ', true));
            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send(new MessageEmbed() .setTitle('✅ Command annulée'))
            if (TimeStamp.first().content !== 'yes') embed.setTimestamp();
    message.channel.send(`✅ **Embed créé et envoyé avec succès ${embdchannel} !**`)
            embdchannel.send(embed)
        } catch (error) {
            console.error(error);
        }
};

module.exports.help = {
  name : "create-embed",
  aliases :['make-embed', 'embed'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : true,
  args : false 
};