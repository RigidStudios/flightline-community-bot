const Discord = require('discord.js');
const password = require('./JSONS/password.json');
const fs = require('fs');

module.exports.run = async (bot, postgres, message, args) => {
    
    return message.channel.send("This command is currently unavailable.")

    if (!message.member.roles.cache.find(r => r.name === "WebsitePass")) return message.channel.send("You cannot change the website password!")
    if (message.content == password.webPassword) return message.channel.send("This password is already in use!")
    let newPassObj = {
        webPassword: args[0]
    }
    
    let newPassJSON = JSON.stringify(newPassObj)
    fs.writeFile("./cmds/JSONS/password.json", newPassJSON, function (err){
        if(err) throw err;
        console.log("Saved");
    });

    message.channel.send(`The password for the website is now ${args[0]} `);

}

module.exports.help = {
    name: "updpass",
    format:"updpass [password]",
    description: "Updates the password for the flightline website",
    moderation:true,
    atc:false
}
