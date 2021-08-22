const { MessageEmbed, Discord } =require('discord.js');
const { inspect } = require('util');
module.exports.run = (client, message, args) => {

    if(message.author.id !== '747564232500969588') return message.channel.send("désolé, cette commande n'est autorisé qu'au développeur du bot");



    
    const command = args.join(" ");
    if(!command) return message.channel.send("vous devez écrire du code a évaluer")

    try {
        const evaled = eval(command)
        const words = ["token", "destroy"]
       
        const embed = new MessageEmbed()
        embed.setColor("GREEN")
        embed.setTitle("Correctement évaluée")
        embed.addField(`**Type :**`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
        embed.addField("**Évaluée en :**", `\`\`\`yaml\n${Date.now()-message.createdTimestamp} ms\`\`\``, true)
        embed.addField("**📥Entrée**", `\`\`\`js\n${command}\`\`\``)
        embed.addField("**📤Sortie**", `\`\`\`js\n${inspect(evaled, {depth: 0})} \`\`\``)

        message.channel.send(embed)

    } catch (error) {
        const embedErreur = new MessageEmbed
        embedErreur.setColor("RED")
        embedErreur.addField(`📥**Entrée**`, `\`\`\`js\n${command}\`\`\``)
        embedErreur.addField(`⚠️**Erreur**`, `\`\`\`js\n${error}\`\`\` `)

        message.channel.send(embedErreur)
    }
};

module.exports.help = {
  name : "evaluer",
  aliases :['eval', 'ev'],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : true 
};