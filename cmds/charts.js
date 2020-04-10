const Discord = require('discord.js');
const password = require('./JSONS/password.json');

function embedMsgChart() {
    return new Discord.MessageEmbed()
        .setTimestamp(Date.now())
        .setDescription("This is the map for all airports!")
        .addField("Below find the link for the Aerodrome map of all airports!", " https://flightlinecharts.weebly.com/charts.html")
        .addField("Password:", "")
        .setFooter("This link redirects you straight to the password prompt.")
        .setColor("#00FF00");
}

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedMsgChart());

}

module.exports.help = {
    name: "charts",
    format: "charts",
    description: "Gives you link to the chart page.",
    moderation: false,
    atc: false
}
