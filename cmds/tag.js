const Discord = require('discord.js');
const prefix = require("../config.json").botConfig.prefix;

module.exports.run = async (bot, postgres, message, args) => {

    function emb(){
        let embed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle(prefix + "tag")
            .addField(`${prefix}tag view [tagName]`, "Displays the tag")
            .addField(`${prefix}tag create [tagName] [content]`, "Creates a new tag. This is only available to Moderation Staff!")
            .addField(`${prefix}tag delete [tagName]`, "Deletes the tag from the database. This is only available to Moderation Staff!")
        return embed
    }

    if (args[0] === "view") {
        if(!args[1]) return message.channel.send("You did not provide a tag to view!")
        let tag = args[1];

        postgres.query(`SELECT content FROM tags WHERE tag = '${tag}';`, (err, res) => {
            if (err) {
                console.error(err)
                return message.channel.send("Error retrieving information from the database. Please contact Supra for more information.")
            }

            if (!res.rows[0]) {
                return message.channel.send("There is no tag named: " + tag)
            } 
            
            message.channel.send(res.rows[0].content)
        })

    } else if (args[0] === "create") {
        if (message.member.roles.cache.find(r => r.name === "Moderation Staff")) {

            if(!args[1]) return message.channel.send("You did not provide a tag name!")
            if(!args[2]) return message.channel.send("You did not provide content for the tag!")

            let tag = args[1];
            let content = args.slice(2).join(" ");

            postgres.query(`INSERT INTO tags(tag, content) VALUES ('${tag}', '${content}')`, (err, res) => {
                if (err) {
                    console.error(err);
                    return message.channel.send("There was an error entering the data into the database. Please contact Supra for more information.")
                }

                message.channel.send("Tag successfully created!")
            })
        } else return message.channel.send("You do not have permissions to create a tag.")
    } else if (args[0] === "delete") {
        if (message.member.roles.cache.find(r => r.name === "Moderation Staff")) {
            
            if(!args[1]) return message.channel.send("You did not provide the tag name to delete!")
            let tag = args[1];

            postgres.query(`DELETE FROM tags WHERE tag = '${tag}'`, (err, res) => {
                if (err) {
                    console.error(err)
                    return message.channel.send("There was an error while removing the tag from the database. Please contact Supra for more information.")
                }
            })
        } else return message.channel.send("You do not have permissions to create a tag.")
    } else message.channel.send(emb())

}

module.exports.help = {
    name: "tag",
    format: "tag",
    description: "Get or create a tag",
    moderation: false,
    atc: false
}
