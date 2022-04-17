const Discord = require('discord.js');
const fs = require('fs');

const opgg = require('./modules/opgg/index.js')

//const fetch = require('node-fetch');

const axios = require('axios');
//import fetch from "node-fetch";

require('dotenv').config();


async function fetchResponse(msg){

    let url = 'https://api.urbandictionary.com/v0/define?term=stonks';
    //let url="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD"

    axios.get(url)
    .then((res) => {

        console.log(res.data.list)
        msg.reply(JSON.stringify(res.data.list[0]))

    })
  
    
    //TODO ordenar respuestas por valoracion
    
}



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
            .addField("!coinflip ","\u200B")
            .addField("!bloodtrail ","\u200B")
            .addField("!rampas ","\u200B")
            .addField("!bye ","\u200B");
    
    
            msg.reply({ embeds : [helpEmbeded] });
        
    }
    else if(msg.content=="!coinflip"){

        //https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/t_logo.png

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
    else if(msg.content=="!p"){ //!PRUEBAS

        //let url = 'https://api.urbandictionary.com/v0/define?term=take%20it%20easy';
        //let url = 'https://api.urbandictionary.com/v0/define?term=a';

        //let response;

        /*
        fetch(url).then(r=> r.json())
            .then(j=>response=j)
            .then(j=> prueba = new Discord.MessageEmbed()
                .setTitle("prueba")
                .setColor('RED')
                .addField("\u200B",j)),

                msg.reply({ embeds: [j] })
            
        */

        fetchResponse(msg);




        //console.log(response);
        /*
        (async()=> 
        console.log('\nREQUEST 3', await(await fetch(url)).json()) 
        )();*/


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

