module.exports.run = (client, message, args) => {

   // If the member doesn't have enough permissions
   if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
    return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways.');
}

// If no message ID or giveaway name is specified
if(!args[0]){
    return message.channel.send(':x: You have to specify a valid message ID!');
}
    const messageID = args[0];
    client.giveawaysManager.delete(messageID).then(() => {
        message.channel.send('Giveaway deleted!');
    }).catch(() => {
        message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
    });
};

module.exports.help = {
  name : "delete",
  aliases :['supr', 'del'],
  description: "permet de suprimmer un giveaway",
  usage: ' <giveaway_message_ID>',
  isUserAdmin : false ,
  permissions : false,
  args : true
};