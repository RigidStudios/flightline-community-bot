const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {

        let username = args[0]
        let password = args[1]

        if(!args[0]) return message.channel.send("You did not provide a username!")
        if(!args[1]) return message.channel.send("You did not set a password!")
        
        const filter = m => m.content === "thirst152"
        const channel = await message.author.send(`If there is no response from the bot after you have entered the password, it means the password is incorrect! \nEnter main password:`)
        const collector = channel.channel.createMessageCollector(filter, { max: 1 });

        collector.on('collect', m => {
        });

        collector.on('end', collected => {
            if(collected.get(channel.channel.lastMessageID).content === "thirst152"){
                message.author.send(`Sucessfully authorised!`)        
                postgres.query(`INSERT INTO login_details (username, password) VALUES ('${username}','${password}');`, (err, res) => {
                    console.log(err)
                    if(err) return message.channel.send("ERROR: An error occured while entering your details into the database. If this continues, contact JusSupra#0962.")
                    message.channel.send("Sucessfully added your details into the database. Make sure you save them somewhere safe and don't give these details to anyone!")
                });
            }
        });

}

module.exports.help = {
    name: "register",
    description: "Registers a new ATC account.",
    moderation: false,
    atc: false,
    ownerOnly: true
}
