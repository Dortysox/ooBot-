const Discord = require('discord.js')
const map = new Map
    module.exports.run = async (client, message, args) => {
    
 
        let pollreactions = { // For Multiple Choices
            1: '๐ฆ',
            2: '๐ง',
            3: '๐จ',
            4: '๐ฉ',
            5: '๐ช',
            6: '๐ซ',
            7: '๐ฌ',
            8: '๐ญ',
            9: '๐ฎ',
            10: '๐ฏ',
            11: '๐ฐ',
            12: '๐ฑ',
            13: '๐ฒ',
            14: '๐ณ',
            15: '๐ด',
            16: '๐ต',
            17: '๐ถ',
            18: '๐ท',
            19: '๐ธ',
            20: '๐น',
        }

        var questionRegex = /`(.*)`/gmi // Regex, So We Can Take Question For Multiple Poll Options
        const questionOriginal = args.join(' ').match(questionRegex) // Question Of Poll
        const questionEdited = questionOriginal[0].replace("`", "").replace("`", "") // To Remove `` From Question
        if (!questionOriginal || !questionEdited) return message.reply(`No Question Provided`) // If No Question Is Provided

        let options = args.join(' ').slice(questionOriginal[0].length).split(' | ') // To Seperate Every Answer
        let result = ''

        if (options.length <= 1) { // If Only Question Is Provided Without Answer
            result += 'โ: Yes\n'
            result += 'โ: No'
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${questionEdited}**
 โYes
 โ No
            `)
            message.channel.send(embed).then(msg => {
                msg.react('โ') // React To Message
                msg.react('โ') // React To Message
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
      description: "Crรฉer un sondage",
      usage: '<question?> | [choix1] | [choix2] etc..',
      isUserAdmin : false ,
      permissions : true,
      args : true
    };