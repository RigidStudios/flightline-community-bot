const Discord = require('discord.js');
const logins = require('./login.js');
const nicknameFile = require('./JSONS/nickname.json')
const fs = require('fs')

module.exports.run = async (bot, postgres, message, args) => {

    let role = message.member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!message.member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to login and out as ATC!");

        let TimeEnd = new Date().toISOString()

        postgres.query(`UPDATE login_logs SET status = 'FIN_DUTY', time_end = '${TimeEnd}' WHERE username = '${nicknameFile[message.author.id].username}' AND time_start = '${nicknameFile[message.author.id].TimeStart}'`, (err, res) => {
            if(err) console.log(err)
            message.channel.send("Logged out sucessfully!")

            message.guild.fetchMember(message.author).then(message.member.setNickname(`${nicknameFile[message.author.id].originNick}`)).catch(e => console.log(e))
            delete nicknameFile[message.author.id]

            fs.writeFile('./cmds/JSONS/nickname.json', JSON.stringify(nicknameFile, null, 2), err => {
                if(err) console.log(err)
            })
        });
}

module.exports.help = {
    name: "logout",
    description: "Logs you out of your session that you are logged into.",
    moderation: false,
    atc: true
}
