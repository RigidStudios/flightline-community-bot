const Discord = require('discord.js');
const password = require('./JSONS/password.json');

function embedMsgWebsite(){
    return new Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setTitle("Website of the Unofficial Flightline Community!")
    .addField("Link to website:", "https://flightlinecharts.weebly.com/")
    .setColor("#00FF00");
}

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedMsgWebsite());

}

module.exports.help = {
    name: "website",
    format: "website",
    description: "Displays the link to our website!",
    moderation: false,
    atc: false
}
