const Discord = require('discord.js')
const map = new Map
    module.exports.run = async (client, message, args) => {
    
 
        let pollreactions = { // For Multiple Choices
            1: '🇦',
            2: '🇧',
            3: '🇨',
            4: '🇩',
            5: '🇪',
            6: '🇫',
            7: '🇬',
            8: '🇭',
            9: '🇮',
            10: '🇯',
            11: '🇰',
            12: '🇱',
            13: '🇲',
            14: '🇳',
            15: '🇴',
            16: '🇵',
            17: '🇶',
            18: '🇷',
            19: '🇸',
            20: '🇹',
        }

        var questionRegex = /`(.*)`/gmi // Regex, So We Can Take Question For Multiple Poll Options
        const questionOriginal = args.join(' ').match(questionRegex) // Question Of Poll
        const questionEdited = questionOriginal[0].replace("`", "").replace("`", "") // To Remove `` From Question
        if (!questionOriginal || !questionEdited) return message.reply(`No Question Provided`) // If No Question Is Provided

        let options = args.join(' ').slice(questionOriginal[0].length).split(' | ') // To Seperate Every Answer
        let result = ''

        if (options.length <= 1) { // If Only Question Is Provided Without Answer
            result += '✅: Yes\n'
            result += '❌: No'
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${questionEdited}**
 ✅Yes
 ❌ No
            `)
            message.channel.send(embed).then(msg => {
                msg.react('✅') // React To Message
                msg.react('❌') // React To Message
            })
        } else {
            if (options.length > 20) return message.reply(`You Can't Have More Then 20 Options`) // Discord Limits
            result = options.map((c, i) => {
                return `${pollreactions[i + 1]} ${c}` // To Keep Description
            })

            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${questionEdited}**
${result.join('\n')}
            `)
            message.channel.send(embed).then(msg => {
                options.map(async (c, x) => {
                    msg.react(pollreactions[x + 1]) // React To Message
                })
            })
        }
    };
    
    module.exports.help = {
      name : "poll",
      aliases :['sondage', 'sndg'],
      description: "Créer un sondage",
      usage: '<question?> | [choix1] | [choix2] etc..',
      isUserAdmin : false ,
      permissions : true,
      args : true
    };