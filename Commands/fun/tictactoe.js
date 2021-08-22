module.exports.run =  (client, message, args) => {
  const { tictactoe } = require('reconlx')
  const Discord = require('discord.js')
 
    // Here is an example on using it in banning members.
    message.channel.send('Confirmation for banning members').then(async msg => {
      // parameters used(which msg to react on, who can acess it, reactions, time(optional))
      const emoji = confirmation(msg, message.author, ['✅', '❌'], 30000)
      if(emoji === '✅') { //if author reacts on check
        //delete the confirmation message
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Montionner un membre avec qui vous voulez jouer !')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
       
      } 
      if(emoji === '❌') { // if author reacts on cross
      // delete the confirmation message
        msg.delete()
      }
    })
     
};

module.exports.help = {
  name : "tictactoe",
  aliases :['ttt', 'morpion'],
  description: "jouer un morpion avec un membre",
  usage: ' <@member>',
  isUserAdmin : false ,
  permissions : false,
  args : false
};