const Discord = require('discord.js');
const fs = require('fs');
const nicknameFile = require('./JSONS/nickname.json')

module.exports.run = async (bot, postgres, message, args) => {

    let guildID = "593830690777333770";
    let guild = bot.guilds.cache.get(guildID);
    let member = message.guild.member(message.author);
    let role = member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");
    let accAirports = ["JTPH", "JSLL", "JC04"]

    if (!member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to login as ATC!");
    if (!args[0]) return message.channel.send("No username provided!");
    if (!args[1]) return message.channel.send("No airport provided!");
    if (!args[2]) return message.channel.send("No position provided!");

    nicknameFile[message.author.id] = {
        username: args[0],
        AirportServed: args[1],
        PositionServed: args[2],
        TimeStart: new Date().toISOString(),
        originNick: message.member.nickname || message.author.username
    }

    module.exports.loginDet = nicknameFile[message.author.id]

    const jsonString = JSON.stringify(nicknameFile, null, 2)

    fs.writeFileSync('./cmds/JSONS/nickname.json', jsonString, err => {
        if (err) {
            console.log('Error writing to nickname.json', err)
        }
    })

    postgres.query(`SELECT * FROM login_details WHERE username = '${nicknameFile[message.author.id].username}'`, async (err, res) => {
        if (err) return message.channel.send("Error connecting to the Database. Contact JusSupra#0962 for help if this error continues to arise.")
        if (res.rows.length === 0) return message.channel.send(`There is no entry in the database with the username: ${nicknameFile[message.author.id].username}`)

        message.channel.send("Go to DM's to enter your password!")

        const filter = m => m.content === `${res.rows[0].password}`
        const channel = await message.author.send(`If there is no response from the bot after you have entered the password, it means the password is incorrect! \nEnter password for ${nicknameFile[message.author.id].username}:`)
        const collector = channel.channel.createMessageCollector(filter, { max: 1 });

        collector.on('collect', m => {
        });

        collector.on('end', collected => {
            if (collected.get(channel.channel.lastMessageID).content === `${res.rows[0].password}`) {
                message.author.send(`Sucessfully logged in as ${nicknameFile[message.author.id].username}!`)

                if (member.manageable) {
                    member.setNickname(`${nicknameFile[message.author.id].AirportServed} ${nicknameFile[message.author.id].PositionServed} - ${nicknameFile[message.author.id].originNick}`)
                }

                postgres.query(`INSERT INTO login_logs(staff_user_id, username, airport_served, position_served, time_start, status) VALUES (${message.author.id}, '${nicknameFile[message.author.id].username}', '${nicknameFile[message.author.id].AirportServed}', '${nicknameFile[message.author.id].PositionServed}', '${nicknameFile[message.author.id].TimeStart}', 'ON_DUTY');`, (e, r) => {
                    console.log(e)
                    if (e) return message.author.send("ERROR: Error while entering data into Database. If this continues, contact JusSupra#6561.")
                })
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
