const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const fetch = require("node-fetch")
module.exports.run = async (client, message, args) => {


       try {

  if (!args[0]) return message.channel.send(`Please Give Me A Username!`)
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`User Not Found | Please Give Me A Valid Username!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login} GitHub's Information!`, 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
            .setColor(`#211F1F`)
            .setThumbnail(`${avatar_url}`)
            .addField(`🔥 Username`, `${login}`)
            .addField(`🆔 ID`, `${id}`)
            .addField(`💬 Bio`, `${bio || "No Bio"}`)
            .addField(`👁️ Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`👥 Followers`, `${followers}`, true)
            .addField(`👤 Following`, `${following}`, true)
            .addField(`🗺️ Location`, `${location || "No Location"}`)
            .addField(`⏰ Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setFooter(`Merci D'avoir choisis ooBot ! ${message.author.username}`)

            message.channel.send(embed)

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return message.channel.send(`Something Went Wrong Try Again Later!`)
        }
    
  
};

module.exports.help = {
  name : "github-info",
  aliases :['GitInfo', 'git'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : true
};