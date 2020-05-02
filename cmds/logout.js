const Discord = require('discord.js');
const logins = require('./login.js');
const nicknameFile = require('./JSONS/nickname.json');
const fs = require('fs');
const ms = require('ms');

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);

    let role = message.member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");
    if (!message.member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to login and out as ATC!");

    let TimeEnd = new Date().toISOString()

    await postgres.query(`UPDATE login_logs SET status = 'FIN_DUTY', time_end = '${TimeEnd}', duration = '${ms(nicknameFile[message.author.id].timer, { long: true })}', durationUNIX = ${nicknameFile[message.author.id].timer}, time_end_unix = ${Date.now()} WHERE username = '${nicknameFile[message.author.id].username}' AND time_start = '${nicknameFile[message.author.id].timeStart}'`, (err, res) => {
        if (err) console.log(err)

        if (message.member.manageable) {
            message.member.setNickname(`${nicknameFile[message.author.id].originNick}`).catch(console.error)
        }

        let username = nicknameFile[message.author.id].username

        

        postgres.query(`SELECT SUM(durationunix) FROM login_logs WHERE username = '${username}' UNION SELECT durationunix FROM login_logs WHERE time_end = '${TimeEnd}';`, (e, r) => {

            if (e) {
                message.channel.send("Database error. Please contact Supra for more information.");
                console.error(e);
            }

            let tHours = r.rows[0].sum;

            if (tHours === null) {
                tHours = 0;
            }

            let info = {
                username: username,
                totalHours: ms(parseInt(tHours), { long: true }),
                currentSessionLength: ms(parseInt(r.rows[1].sum))
            }

            message.author.send(`Current Statistics for ATC: ${username} \n \n Total Service Time: ${info.totalHours} \n Session Duration: ${info.currentSessionLength}`)

        });
        
        delete nicknameFile[message.author.id]

        fs.writeFile('./cmds/JSONS/nickname.json', JSON.stringify(nicknameFile, null, 2), err => {
            if (err) console.log(err)
        })

        message.author.send("Logout successful!");
    });
}

module.exports.help = {
    name: "logout",
    format: "logout",
    description: "Logs you out of your session that you are logged into.",
    moderation: false,
    atc: true
}