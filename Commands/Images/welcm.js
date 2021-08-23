module.exports.run = (client, message, args) => {
const  ultrax = require('ultrax')
// Getting registerFont() from canvas
const { registerFont } = require('canvas')
// Registering the custom font
registerFont('ShadowsIntoLight-Regular.ttf', { family:  "Shadows Into Light" });
// Event
Client.on('guildMemberAdd', async  member  => {
// defining the background as bg
let  bg = 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png'
// defining the member's avatar with "PNG" as format.
let  avatar = message.author.user.displayAvatarURL({ format:  "png" })
// defining text_1 (title)
let  text1 = "welcome"
// defining text_2 (subtitle)
let  text2 = message.author.user.tag
// defining text_3 (footer)
let  text3 = `You're the ${message.guild.memberCount}th member`
// defining the color, here its white
let  color = '#ffffff'
// defining the options and setting them (Those are optional)
const  options = {
	font:  "Shadows Into Light",
	attachmentName:  `welcome-${message.author.id}`,
	text1_fontSize: 80,
	text2_fontSize: 50,
	text3_fontSize: 30
}

// creating the image
const  image = await  ultrax.welcomeImage(bg, avatar, text1, text2, text3, color, options)

//channel#send(image)
})
};

module.exports.help = {
  name : "wlcmimg",
  aliases :[],
  description: "répete le message d'un utulisateur ",
  usage: '<votre_message>',
  isUserAdmin : false ,
  permissions : false,
  args : false 
};