

const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = (client, message, args) => {

  const channels = message.guild.channels.cache.filter((ch) => ch.type !== 'category');
		if (args[0] === 'on') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
				}).then(() => {
					channel.setName(channel.name += '🔒');
				});
			});
			return message.channel.send('locked all channels');
		} if (args[0] === 'off') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: true,
				}).then(() => {
					channel.setName(channel.name.replace('🔒', ''));
				});
			});
			return message.channel.send('unlocked all channels');
		}
		return '';
};

module.exports.help = {
  name : "lockdown",
  aliases :['raidmode', 'rep'],
  description: "répete le message d'un utulisateur ",
  usage: ' <on/off>',
  isUserAdmin : false ,
  permissions : false,
  args : true
};