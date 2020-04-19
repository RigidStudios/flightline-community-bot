const Discord = require('discord.js');
const bcrypt = require('bcrypt');

module.exports.run = async (bot, postgres, message, args) => {

    let discord_id = args[0]
    let username = args[1]
    let password = args[2]

    if (message.author.id === "367722931993968650" || message.author.id === "371470625799274508") {
        if (!args[0]) return message.channel.send("You did not provide a username!")
        if (!args[1]) return message.channel.send("You did not set a password!")

        const filter = m => m.content
        const userChannel = await message.author.send(`Enter authorisation password:`)
        const collector = userChannel.channel.createMessageCollector(filter, { max: 1 });

        collector.on('collect', m => {
        });

        collector.on('end', collected => {
            if (collected.first().content === "roverisdownagain420") {
                message.author.send(`Sucessfully authorised!`)
                bcrypt.hash(password, 10, function (err, hash) {
                    postgres.query(`INSERT INTO login_details (username, password, discord_id) VALUES ('${username}','${hash}', ${discord_id});`, (err, res) => {
                        console.log(err)
                        if (err) return message.channel.send("ERROR: An error occured while entering your details into the database. If this continues, contact JusSupra#6561.")
                        message.channel.send("Sucessfully added your details into the database. Make sure you save them somewhere safe and don't give these details to anyone!")
                    });
                });
            } else return message.author.send("Unauthorised!")
        });

    } else return message.channel.send("You do not have permission to execute this command. Please contact Supra or DKBowsermaster for more information!")


}

module.exports.help = {
    name: "register",
    format: "register [username] [password]",
    description: "Registers a new ATC account.",
    moderation: false,
    atc: false,
    ownerOnly: true
}
