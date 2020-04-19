const Discord = require('discord.js');
const bcrypt = require('bcrypt');
const fs = require('fs');
const nicknameFile = require('./JSONS/nickname.json')

module.exports.run = async (bot, postgres, message, args) => {

    let guildID = "593830690777333770";
    let guild = bot.guilds.cache.get(guildID);
    let member = message.guild.member(message.author);
    let role = member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");

    if (!member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to login as ATC!");

    if (!args[0]) return message.channel.send("No username provided!");
    if (!args[1]) return message.channel.send("No airport provided!");
    if (!args[2]) return message.channel.send("No position provided!");

    let username = args[0];
    let airport = args[1];
    let pos = args[2];

    if (airport === "JTPH" || airport === "JSLL") {
        if (pos === "CLR" || pos === "GND" || pos === "TWR" || pos === "DIR" || pos === "CTR") {
            if (member.roles.cache.find(r => r.name === "Delivery ATC")) {
                if (pos === "CLR") {} else return message.channel.send("You are not ranked high enough to serve this position.")
            } else if (member.roles.cache.find(r => r.name === "Ground ATC")) {
                if (pos === "CLR" || pos === "GND") {} else return message.channel.send("You are not ranked high enough to serve this position.")
            } else if (member.roles.cache.find(r => r.name === "Tower ATC")) {
                if (pos === "CLR" || pos === "GND" || pos === "TWR") {} else return message.channel.send("You are not ranked high enough to serve this position.")
            } else if (member.roles.cache.find(r => r.name === "Director ATC")) {
                if (pos === "CLR" || pos === "GND" || pos === "TWR" || pos === "DIR") {} else return message.channel.send("You are not ranked high enough to serve this position.")
            } else if (member.roles.cache.find(r => r.name === "Center ATC")) {}
        } else return message.channel.send("Invalid Position!")
    } else return message.channel.send("Invalid Airport!")

    await postgres.query(`SELECT * FROM login_details WHERE username = '${username}'`, async (err, res) => {
        if (err) return message.channel.send("Error connecting to the Database. Contact JusSupra#6561 for help if this error continues to arise.")
        if (res.rows.length === 0) return message.channel.send(`There is no entry in the database with the username: ${username}`)

        message.channel.send("Go to DM's to enter your password!")

        const filter = m => m.content
        const channel = await message.author.send(`Enter password for ${username}:`)
        const collector = channel.channel.createMessageCollector(filter, { max: 1 });

        collector.on('collect', m => {
        });

        collector.on('end', async collected => {

            let password = await bcrypt.compare(collected.first().content, res.rows[0].password).then((result) => {
                return result
            }).catch(err => {
                message.author.send("Error when reading password. Please contact Supra immediately.")
                return console.log(err)
            })

        if (password) {
            message.author.send(`Sucessfully logged in as ${username}!`)

            nicknameFile[message.author.id] = {
                username: username,
                airport: airport,
                position: pos,
                timeStart: new Date().toISOString(),
                timer: 0,
                originNick: message.member.nickname || message.author.username
            }

            module.exports.logDetails = nicknameFile[message.author.id]

            if (member.manageable) {
                member.setNickname(`${nicknameFile[message.author.id].airport} ${nicknameFile[message.author.id].position} - ${nicknameFile[message.author.id].originNick}`)
            }

            postgres.query(`INSERT INTO login_logs(staff_user_id, username, airport_served, position_served, time_start, status) VALUES (${message.author.id}, '${nicknameFile[message.author.id].username}', '${nicknameFile[message.author.id].airport}', '${nicknameFile[message.author.id].position}', '${nicknameFile[message.author.id].timeStart}', 'ON_DUTY');`, (e, r) => {
                console.log(e)
                if (e) return message.author.send("ERROR: Error while entering data into Database. If this continues, contact JusSupra#6561.")
            })

            const jsonString = JSON.stringify(nicknameFile, null, 2)

            fs.writeFileSync('./cmds/JSONS/nickname.json', jsonString, err => {
                if (err) {
                    console.log('Error writing to nickname.json', err)
                }
            })

        } else {
            message.author.send("Password Incorrect. If you think this is an error, please contact Supra (JusSupra#6561).")
        }
    });
})

}

module.exports.help = {
    name: "login",
    format: "login [username] [AirportICAO] [Position]",
    description: "Logs you into an ATC session",
    moderation: false,
    atc: true
}
