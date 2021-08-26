const Discord = require("discord.js");
const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms-js");
module.exports.run = async (client, message, args) => {

 
  let user = message.author;

  let timeout = 60000;
  
    let author = await db.fetch(`money_${user.id}_${message.guild.id}`);
    let multiplier = await db.fetch(`multiplier_${user.id}_${message.guild.id}`);
    if(!multiplier) multiplier = 1;
    let randoma = Math.floor(Math.random() * 200) + 1;
    let random = randoma * multiplier;
        
    if (author < 250) {
          return message.channel.send('<a:false:737764891657633814> You need at least 250$ to commit a crime')
      }

      let crime = await db.fetch(`crime_${user.id}_${message.guild.id}`)

      if (crime !== null && timeout - (Date.now() - crime) > 0) {
        
        let time = ms_2(timeout - (Date.now() - crime));
        
        message.channel.send(`You already commited a crime! Try again in ${time.seconds} seconds!`)

      } else {
       
        const result = [
          "WINWIN",
          "LOOSELOOSE"
        ] 

     let awnser = result[Math.floor(Math.random() * result.length)];
        
     if (awnser === "LOOSELOOSE") {
          
      message.channel.send("You were caught and had to pay `$250` to stay out of jail");
         
      await db.subtract(`money_${user.id}_${message.guild.id}`, 250);
         
      await db.set(`crime_${user.id}_${message.guild.id}`, Date.now());
        } else {

    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("You Have Just Commited A Crime!")
      .addField("Amount Robbed:", random)
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send(embed)
    await db.add(`crimecommited_${user.id}`, 1);
    await db.add(`money_${user.id}_${message.guild.id}`, random);
    await db.set(`crime_${user.id}_${message.guild.id}`, Date.now());

      }
    } 
  

};

module.exports.help = {
  name : "crime",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};