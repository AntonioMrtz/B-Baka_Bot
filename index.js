const Discord = require('discord.js');

require('dotenv').config();

//const mySecret = process.env['TOKEN'];

const client = new Discord.Client({

    intents: [

        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES

    ]


});

client.on("ready", () => {


    console.log("hola");

})


client.on("messageCreate",msg => {

    //* FORMATO = https://euw.op.gg/champions/jhin/top/build

    //TODO checkear si existe campeon en pool campeones 

    if(msg.content=="!bloodtrail"){


        msg.reply({files: [{ attachment: "bloodtrail.png" }] });
        
    }

    else if(msg.content.startsWith("!opgg")){


        //TODO transform jgl -> jungla etc
        let command = msg.content.split(" ");
    
        let url = "https://euw.op.gg/champions/";
    
        url+=command[1]+"/"+command[2]+"/"+"build";
    
       
        console.log(url);
    
        msg.reply(url);
            
        



    }
    else if(msg.content=="!help"){

        let help_commands = "```!opgg champion_name role```"; 
        msg.reply(help_commands);
        
    }



})




client.login(process.env['TOKEN'])
