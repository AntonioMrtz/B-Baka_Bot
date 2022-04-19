const Discord = require('discord.js');
const fs = require('fs');

const opgg = require('./modules/opgg/index.js')
const urban_dictionary = require('./modules/urban_dictionary/index.js')

const axios = require('axios');

require('dotenv').config();


const client = new Discord.Client({
    
    intents: [
        
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
        
    ]
    
    
});



client.on("ready", () => {
    
    client.user.setActivity('!help', { type: 'COMPETING' });
    console.log("B-Baka Bot started! :)");
    
})


client.on("messageCreate",msg => {
    
    //* FORMATO = https://euw.op.gg/champions/jhin/top/build
    
    
    if(msg.content=="!bloodtrail"){
        
        msg.reply({files: [{ attachment: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/bloodtrail.png" }] });
        
    }
    
    else if(msg.content.startsWith("!opgg")){
        
       
        opgg.queryOpgg(msg,lol_champions,lol_roles);
    }
    else if(msg.content=="!help"){
        
        let helpEmbeded = new Discord.MessageEmbed()
            .setTitle(" *COMMANDS *")
            .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/help_logo.png")
            .setColor('GREEN')
            .addField("\u200B","\u200B")
            .addField("!opgg [champion_name] [role] ","\u200B")
            .addField("!definition [word or phrase] ","\u200B")
            .addField("!wordoftheday ","\u200B")
            .addField("!coinflip ","\u200B")
            .addField("!bloodtrail ","\u200B")
            .addField("!rampas ","\u200B")
            .addField("!bye ","\u200B")
            .addField("\u200B","\u200B")
            .setFooter({ text: 'B-Baka Bot by Ye4h', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/baka_bot_profile_img.jpg" })
    
    
            msg.reply({ embeds : [helpEmbeded] });
        
    }
    else if(msg.content=="!coinflip"){

        

       let coinflip;

        if( Math.random() > 0.49){

            coinflip = new Discord.MessageEmbed()
                .setTitle("Coinflip -> CARA")
                .setColor('AQUA')
                .setImage("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ct_logo.png")
                .addField("\u200B","\u200B" )
        }

        else{

            coinflip = new Discord.MessageEmbed()
                .setTitle("Coinflip -> CRUZ")
                .setColor('RED')
                .setImage("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/t_logo.png")
                .addField("\u200B","\u200B" )


        }

        msg.reply({ embeds : [coinflip] });

    }
    else if(msg.content=="!p"){ //!TEST ONLY

    }
    else if(msg.content.startsWith("!definition")){

        let command = msg.content.split(" ");
        command = command.slice(1);
        command = command.join().trim().replaceAll(","," ");

        urban_dictionary.fetchResponse(msg,command)

    }
    else if(msg.content=="!wordoftheday"){

        axios.get("https://www.urbandictionary.com/")
        .then( (res) =>{

            let re_wordoftoday_title = new RegExp(/<title>.*<\/title>/);

            let result_re = re_wordoftoday_title.exec(res.data)[0]

            word = result_re.split(":")[1];
            word = word.trim();
            word = word.replace("</title>","");


            urban_dictionary.fetchResponse(msg,word);

        } )


    }
    else if(msg.content=="!rampas"){

        msg.reply("https://www.youtube.com/watch?v=qbEfxaIxzQg");
    }

    else if(msg.content=="!bye"){ 

        msg.reply("Bye Bye 👋👋")
        console.log("B-Baka Bot stopped! :(");
        process.exit();
       

    }
    
    
    
})




var lol_champions = fs.readFileSync("./data/lol_champs.txt").toString('utf-8').toLowerCase();
var lol_roles = fs.readFileSync("./data/lol_roles.txt").toString('utf-8').toLowerCase();
client.login(process.env['TOKEN'])

