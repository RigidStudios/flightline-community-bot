const botSettings = require("./botSettings.json");
const Discord = require("discord.js");
const { Client } = require('pg')
const postgres = new Client({
    user: 'flightline',
    host: 'localhost',
    database: 'flightlinebotdb',
    password: 'bebsi152',
    port: 5432
})

postgres.connect(err => {
	if(err) throw err;  
	console.log(`Connecting to database: ${postgres.database}`)
  	console.log(`Connecting as: ${postgres.user}`)
	console.log(`Connecting to ${postgres.host}:${postgres.port}`)
	console.log("                        ")
    console.log("Connected to Database...")
});

const prefix = botSettings.prefix

const bot = new Discord.Client({ disableEveryone: true });

function embedMsgICAO(){
    return new Discord.RichEmbed()
        .setTimestamp(Date.now())
        .setDescription("All Airports in ICAOs in Flightline!")
        .addField("Airports:", "-------------------------------------------------")
        .addField("JTPH", "Tophon Bridge Intl.")
        .addField("JSLL", "Wellingsaul Square Intl.")
        .addField("JCO4", "Connerview Airfield")
        .setColor("#00FF00");
}

function embedMsgChart() {
    return new Discord.RichEmbed()
        .setTimestamp(Date.now())
        .setDescription("This is the map for all airports!")
        .addField("Below find the link for the Aerodrome map of all airports!","https://flightlinecharts.webnode.com/charts/")
        .setColor("#00FF00");
}

function embedMsgWebsite(){
    return new Discord.RichEmbed()
    .setTimestamp(Date.now())
    .setTitle("Website of the Unofficial Flightline Community!")
    .addField("Link to website:", "https://flightlinecharts.webnode.com/")
    .setColor("#00FF00");
}

function embedMsgHelp(){
    return new Discord.RichEmbed()
    .setTimestamp(Date.now())
    .setTitle("These are the available commands for this bot.")
    .addField("Commands:", "-------------------------------------------------------------------------------------------")
    .addField(`${prefix}ICAOS`, "Displays all the ICAOs for all the airports in Flightline.")
    .addField(`${prefix}charts`, "Displays a link of the maps for all the airports. (Only in Flightline!)")
    .addField(`${prefix}setatis {AirportICAO,Information,Time,Active Runways,Wind,Cloud,Temp,Altimeter/QNH,Remarks(Optional: If None, say "None".)}`, "Set an ATIS for a chosen Airports. ONLY FOR ATC USE!")
    .addField(`${prefix}atis {AirportICAO}`, "Displays the ATIS for the chosen airport.")
    .addField(`${prefix}website`, "Shows you the link to our website :D")
    .addField(`${prefix}holdqueue`, "Displays the aircraft that are waiting in a holding pattern. (ONLY AVAILABLE DURING ATC USE!")
    .addField(`${prefix}holdqueueadd ,{Aircraft Callsign}`, "Adds the Aircraft to the back of the queue. (ATC USE ONLY)")
    .addField(`${prefix}holdqueueremove`, "Removes the first aircraft from the queue.")
    .setFooter("These commands are subject to change should any occur.")
    .setColor("#FFFF66");
}

function embedMsgATIS(AirportReq, Information, Time, ActRun, Wind, Cloud, Visibility, Temp, Altimeter, Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq){
    return new Discord.RichEmbed()
    .setTitle(`ATIS for ${AirportReq}`)
    .addField("Information for Airport:", `${AirportReq}`)
    .addField("Information:", `${Information}`)
    .addField("Time:", `${Time}`)
    .addField("Active Runways:", `${ActRun}`)
    .addField("Wind:", `${Wind}`)
    .addField("Cloud:", `${Cloud}`)
    .addField("Visibility:", `${Visibility}`)
    .addField("Temperature:", `${Temp}`)
    .addField("Altimeter:", `${Altimeter}`)
    .addField("Remarks", `${Remarks}`)
    .addField("Delivery Frequency:", `${DeliveryFreq}`)
    .addField("Ground Frequency:", `${GroundFreq}`)
    .addField("Tower Frequency:", `${TowerFreq}`)
    .addField("Director Frequency:", `${DirectorFreq}`)
    .addField("Center Frequency:", `${CenterFreq}`)
    .setFooter("ATIS is constantly updated, beware of sudden weather changes!")
    .setColor("#00BFFF");
}
    
let finishedATISJTPH;
let finishedATISJSLL;
let finishedATISJCO4;

function embedMsgCommandHintSetATIS(){
    return new Discord.RichEmbed()
    .setDescription("Usage for /setatis:")
    .addField("/setatis ,Airport,Information,Time,ActiveRunways,Wind,Cloud,Visibility,Temp,Altimeter,Remarks", "Make sure that there is NO SPACES BETWEEN LETTER/NUMBERS AND COMMAS(,). The only Spaces that can be used ARE IN BETWEEN WORDS AND SEPERATING /setatis FROM THE AIRPORT. Also note that there is to be a comma right after /setatis: /setatis ,JTPH,Information B...")
    .addField("If there is any errors, please contact JusSupra#0962.","--------------------------------------------")
    .addField("Reason of error:", "Insufficent information for the ATIS!")
    .setTimestamp(Date.now())
    .setColor("#FF0000");
}

let queueJTPH = [];
let queueJSLL = [];
let queueJCO4 = [];

function embedMsgQueue(airportQueue){
    
    if(airportQueue.length == 0)return "There is no planes in a holding pattern!"
    
    let embed = new Discord.RichEmbed()
    
    airportQueue.forEach(function(item, index) {
        embed.addField(`Number ${index + 1} for landing:`, item);
    
    embed.setDescription("All the planes that are in a holding pattern.")
    embed.setColor("#FFF700")
    embed.setTimestamp(Date.now());
    
    
    });
    return embed
}

bot.on('guildMemberAdd', async member => {
    member.addRoles(['594441271871799296', '593830876035416164', '594440125359063050'])
});

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

    if(command === `${prefix}help`){
        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        message.channel.send(embedMsgHelp());
    }

    if(command === `${prefix}website`){
        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        message.channel.send(embedMsgWebsite());
    }

    if(command === `${prefix}ICAOS`){
        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        if(args[0] === "JTPH" || "JSLL" || "JCO4") return message.channel.send(embedMsgICAO());
        message.channel.send(embedMsgICAO());
    }

    if(command === `${prefix}charts`){
        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        message.channel.send(embedMsgChart());
    }
    
    if(command === `${prefix}setatis`){
        
        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to set ATIS'es");

            let messageArray = message.content.split(",");
            let args = messageArray.slice(0);
            let firArg = args[0].split(" ");
            let firstArg = firArg[1]

        
            let AirportReqIn = firstArg;
            let InformationIn = args[1];
            let TimeIn = args[2];
            let ActRunIn = args[3];
            let WindIn = args[4];
            let CloudIn = args[5];
            let VisibilityIn = args[6];
            let TempIn = args[7];
            let AltimeterIn = args[8];
            let RemarksIn = args[9];

            definedATISvarJTPH = {
                AirportReq: AirportReqIn,
                Information: InformationIn,
                Time: TimeIn,
                ActRun: ActRunIn,
                Wind: WindIn,
                Cloud: CloudIn,
                Visibility: VisibilityIn,
                Temp: TempIn,
                Altimeter: AltimeterIn,
                Remarks: RemarksIn,
            }
        
            
            if(args.length < 10) return message.channel.send(embedMsgCommandHintSetATIS());

            if(AirportReqIn === "JTPH"){

                let DeliveryFreq = "118.400MHz";
                let GroundFreq = "120.750MHz";
                let TowerFreq = "124.225MHz";
                let DirectorFreq = "126.825MHz";
                let CenterFreq = "132.600MHz";

                finishedATISJTPH =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Temp, definedATISvarJTPH.Altimeter, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);  
                message.channel.sendEmbed(finishedATISJTPH);
                
            }
           
            else if(AirportReqIn === "JSLL"){

                let DeliveryFreq = "122.225MHz";
                let GroundFreq = "119.600MHz";
                let TowerFreq = "123.775MHz";
                let DirectorFreq = "130.500MHz";
                let CenterFreq = "131.775MHz";

                finishedATISJSLL =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Temp, definedATISvarJTPH.Altimeter, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJSLL);
            }

            else if(AirportReqIn === "JCO4"){

                let DeliveryFreq = "None";
                let GroundFreq = "None";
                let TowerFreq = "124.225MHz (Controlled by JTPH Tower!)";
                let DirectorFreq = "None";
                let CenterFreq = "None";

                finishedATISJCO4 =  embedMsgATIS(definedATISvarJTPH.AirportReq, definedATISvarJTPH.Information, definedATISvarJTPH.Time, definedATISvarJTPH.ActRun, definedATISvarJTPH.Wind, definedATISvarJTPH.Cloud, definedATISvarJTPH.Visibility, definedATISvarJTPH.Temp, definedATISvarJTPH.Altimeter, definedATISvarJTPH.Remarks, DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJCO4);
            }
        
    }



    if(command === `${prefix}atis` || command === `${prefix}ATIS`){
        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")

        let AirportChosen = args[0];
        
        if (AirportChosen === "JTPH") {
            if(!finishedATISJTPH) return message.channel.send("No ATIS available for JTPH!")
            message.channel.sendEmbed(finishedATISJTPH);
        }

        if (AirportChosen === "JSLL") {
            if(!finishedATISJSLL) return message.channel.send("No ATIS available for JSLL!")
            message.channel.send(finishedATISJSLL);
        }

        if (AirportChosen === "JCO4") {
            if(!finishedATISJCO4) return message.channel.send("No ATIS available for JCO4!")
            message.channel.send(finishedATISJCO4);
        }
    }

    if(command === `${prefix}holdqueueadd`){

        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to add to Holding Pattern Queue!");

        let messageArray = message.content.split(",");
        let args = messageArray.slice(0);
        let firArg = args[0].split(" ");
        let firstArg = firArg[1]
        
        if(!firstArg) return message.channel.send("No airport specified!")
        if(!args[1]) return message.channel.send("No aircraft specified!")        

        let Aircraft = args[1];        
        
        if(firstArg === "JTPH"){
            queueJTPH.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJTPH));
        }

        if(firstArg === "JSLL"){
            queueJSLL.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJSLL));
        }

        if(firstArg === "JCO4"){
            queueJCO4.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJCO4));
        }

    }


    if(command === `${prefix}holdqueueremove`){

        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        if(!args[0]) return message.channel.send("No airport specified!")

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to remove from the Holding Pattern Queue.");
        
        if(args[0] === "JTPH"){
            queueJTPH.shift();
            if(queueJTPH.length === 0) return message.channel.send("No planes are in a holding pattern at JTPH!");
            message.channel.send(embedMsgQueue(queueJTPH));           
        }

        if(args[0] === "JSLL"){
            queueJSLL.shift();
            if(queueJSLL.length === 0) return message.channel.send("No planes are in a holding pattern at JSLL!");
            message.channel.send(embedMsgQueue(queueJSLL));           
        }

        if(args[0] === "JCO4"){
            queueJTPH.shift();
            if(queueJCO4.length === 0) return message.channel.send("No planes are in a holding pattern at JCO4!");
            message.channel.send(embedMsgQueue(queueJCO4));           
        }
    }

    if(command === `${prefix}holdqueue`){

        if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
        if(!args[0]) return message.channel.send("No airport specified!")

        if(args[0] === "JTPH"){
            message.channel.send(embedMsgQueue(queueJTPH));
        }

        if(args[0] === "JSLL"){
            message.channel.send(embedMsgQueue(queueJSLL))
        }

        if(args[0] === "JCO4"){
            message.channel.send(embedMsgQueue(queueJCO4));
        }
    }

    if(command === `${prefix}login`){

        let guildID = "593830690777333770";
        let guild = bot.guilds.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");

        if(!member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to login as ATC!");

        let mAuthor = message.author
        let mUsername = args[0]
        let mAirportServed = args[1]
        let mPositionServed = args[2]
        let mTimeStart = new Date().toISOString();

        message.author.loginDetails = {
            author: mAuthor,
            username: mUsername,
            AirportServed:  mAirportServed,
            PositionServed: mPositionServed,           
            TimeStart: mTimeStart,
        }
        
        if(!args[0]) return message.channel.send("No username provided!");
        if(!args[1]) return message.channel.send("No airport provided!");
        if(!args[2]) return message.channel.send("No position provided!");
        
        postgres.query(`SELECT * FROM login_details WHERE username = '${mUsername}'`, async (err, res) => {
            if(err) return message.channel.send("Error connecting to the Database. Contact JusSupra#0962 for help if this error continues to arise.")
            if(res.rows.length === 0) return message.channel.send(`There is no entry in the database with the username: ${mUsername}`)

            message.channel.send("Go to DM's to enter your password!")
            
            const filter = m => m.content === `${res.rows[0].password}`
            const channel = await message.author.send(`If there is no response from the bot after you have entered the password, it means the password is incorrect! \nEnter password for ${mUsername}:`)
            const collector = channel.channel.createMessageCollector(filter, { max: 1 });

            collector.on('collect', m => {
            });

            collector.on('end', collected => {
                if(collected.get(channel.channel.lastMessageID).content === `${res.rows[0].password}`){
                    message.author.send(`Sucessfully logged in as ${mUsername}!`)
                    
                    message.member.orgNick = {
                        originNick: message.member.nickname,
                    }
                   
                    member.setNickname(`${mAirportServed} ${mPositionServed} - ${message.member.orgNick.originNick}`)
                    postgres.query(`INSERT INTO login_logs(staff_user_id, username, airport_served, position_served, time_start, status) VALUES (${message.author.id}, '${mUsername}', '${mAirportServed}', '${mPositionServed}', '${mTimeStart}', 'ON_DUTY');`, (e, r) => {
                        console.log(e)
                            if(e) return message.author.send("ERROR: Error while entering data into Database. If this continues, contact JusSupra#0962.")       
                    })
                }  
            });
        })
    }

    if(command === `${prefix}logout`){
        
        let role = message.member.guild.roles.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!message.member.roles.has(role.id)) return message.channel.send("Only ATC's are allowed to login and out as ATC!");

        let TimeEnd = new Date().toISOString()        
        postgres.query(`UPDATE login_logs SET status = 'FIN_DUTY', time_end = '${TimeEnd}' WHERE username = '${message.author.loginDetails.username}' AND time_start = '${message.author.loginDetails.TimeStart}'`, (err, res) => {
            message.channel.send("Logged out sucessfully!")
            message.guild.fetchMember(message.author).then(message.member.setNickname(`${message.member.orgNick.originNick}`)).catch(e => console.log(e))
        });
    }

    if(command === `${prefix}register`){

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
    
    if(command === `${prefix}gsroles`){
            if(!message.member.roles.some(r => ['ATC Supervisors', 'Moderation Staff'].includes(r.name))) return message.channel.send("You do not have permission to give the starter roles!")

            let person = message.guild.members.get(message.mentions.users.first().id);

            person.addRoles(['594441271871799296', '593830876035416164', '594440125359063050']);
    }
});

bot.login(botSettings.token);