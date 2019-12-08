const botSettings = require("./botSettings.json");
const Discord = require("discord.js");
const setAtis = require('./cmds/setatis.js');
const windFile = require('./cmds/wind.js');
const { Client } = require('pg')
const fs = require('fs')
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
module.exports.commands = bot.commands
const postgres = new Client({
    user: 'flightline',
    host: 'localhost',
    database: 'flightlinebotdb',
    password: 'bebsi152',
    port: 5432
})

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
		console.log("No commands to load!");
		return;
	}

	console.log("--------------------------------------------------------------------------------------------");
	console.log(`Loading ${jsfiles.length} commands:`)
	console.log("                                   ")

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`)
		console.log(`${i + 1}: ${f} loaded!`)
		bot.commands.set(props.help.name, props)
	});
	console.log("--------------------------------------------------------------------------------------------");

});

postgres.connect(err => {
	if(err) throw err;  
	console.log(`Connecting to database: ${postgres.database}`)
  	console.log(`Connecting as: ${postgres.user}`)
	console.log(`Connecting to ${postgres.host}:${postgres.port}`)
	console.log("                        ")
    console.log("Connected to Database...")
});

const prefix = botSettings.prefix

// bot.on('guildMemberAdd', async member => {
//    member.addRoles(['594441271871799296', '593830876035416164', '594440125359063050'])
// });

bot.on("ready", async () => {
    try {
        var link = await bot.generateInvite(["ADMINISTRATOR"]);
    } catch (e) {
        console.log(e.stack)
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log(`Bot is ready! Logged in as: ${bot.user.username}`);
    console.log(`Logged in on: ${botSettings.token}`);
    console.log(`Time Logged on: ${new(Date)}`);
    console.log(`The prefix is: ${prefix}`);
    console.log("Below find the invite link should it be needed for the bot to be invited to another server:");
    console.log(link);
    console.log("--------------------------------------------------------------------------------------------");

});

bot.on("message", async message => {
    if (message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, postgres, message, args);

// -------------------------------------------------------------

	if(command === `${prefix}setatis`){

        let AirChose = setAtis.airportSelected

        if(AirChose === "JTPH"){
            newAtisJTPH = setAtis.atisJTPHRawObj
            newAtisEmbedJTPH = setAtis.atisJTPH

            module.exports.atisJTPHRawObj = newAtisJTPH
            module.exports.atisJTPH = newAtisEmbedJTPH
        }
        
        if(AirChose === "JSLL"){
            newAtisJSLL = setAtis.atisJSLLRawObj
            newAtisEmbedJSLL = setAtis.atisJSLL

            module.exports.atisJSLLRawObj = newAtisJSLL
            module.exports.atisJSLL = newAtisEmbedJSLL
        }

        if(AirChose === "JCO4"){
            newAtisJCO4 = setAtis.atisJCO4RawObj
            newAtisEmbedJCO4 = setAtis.atisJCO4

            module.exports.atisJCO4RawObj = newAtisJCO4
            module.exports.atisJCO4 = newAtisEmbedJCO4
        }
    }

    if(command === `${prefix}wind`){
       
       let AirChose = args[0] 

       if(AirChose === "JTPH"){
            if(!setAtis.atisJTPHRawObj) return message.channel.send("There is no ATIS set for JTPH so the bot cannot just change the wind of this Airport!")
            
            newAtis = windFile.atisJTPHRawObj
            newAtisEmbed = windFile.atisJTPH

            module.exports.atisJTPHRawObj = newAtis
            module.exports.atisJTPH = newAtisEmbed
       }

       if(AirChose === "JSLL"){
            if(!setAtis.atisJSLLRawObj) return message.channel.send("There is no ATIS set for JSLL so the bot cannot just change the wind of this Airport!")
            
            newAtis = windFile.atisJSLLRawObj
            newAtisEmbed = windFile.atisJSLL

            module.exports.atisJSLLRawObj = newAtis
            module.exports.atisJSLL = newAtisEmbed
        }

        if(AirChose === "JCO4"){
            if(!setAtis.atisJCO4RawObj) return message.channel.send("There is no ATIS set for JTPH so the bot cannot just change the wind of this Airport!")
            
            newAtis = windFile.atisJCO4HRawObj
            newAtisEmbed = windFile.atisJCO4

            module.exports.atisJCO4RawObj = newAtis
            module.exports.atisJCO4 = newAtisEmbed
       }
   } 
});

bot.login(botSettings.token);
