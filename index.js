const Discord = require('discord.js');
const fs = require('fs');

const opgg = require('./modules/opgg/index.js')

//const fetch = require('node-fetch');

const axios = require('axios');
//import fetch from "node-fetch";

require('dotenv').config();


async function fetchResponse(msg,word){


    /*
    {   INPUT FROM Urban dictionary API
    "list": [
      "definition": "A [set] of man [fruits], [love] spudsbollocksgooliesknackers",
      "permalink": "http://stonks.urbanup.com/1709089",
      "thumbs_up": 14,
      "sound_urls": [],
      "author": "Rudis",
      "word": "stonks",
      "defid": 1709089,
      "current_vote": "",
      "written_on": "2006-04-20T07:16:23Z",
      "example": "he had a [set] of stonks like a fighters [speed ball]",
      "thumbs_down": 29
      ]
    }
    */

    //word = "take it easy";  // ! QUITAR DSP 
    let url = 'https://api.urbandictionary.com/v0/define?term='+word;
    

    axios.get(url)
    .then((res) => {

        let max_upvotes = -1;
        let index_max_upvotes=-1;

        for(let i=0;i<res.data.list.length;i++){

            
            if(max_upvotes==-1 || max_upvotes<res.data.list[i].thumbs_up){
                max_upvotes=res.data.list[i].thumbs_up;
                index_max_upvotes=i;
            }

        }

        if(max_upvotes!=-1){

            let definition = res.data.list[index_max_upvotes].definition;
            definition=definition.replaceAll("[","");
            definition=definition.replaceAll("]","");

            let example = res.data.list[index_max_upvotes].example;
            example=example.replaceAll("[","");
            example=example.replaceAll("]","");

            let url=res.data.list[index_max_upvotes].permalink;



            let urbanDictionaryEmbeded = new Discord.MessageEmbed()
                .setTitle("Definition of "+word)
                .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png")
                .setColor('DARK_BLUE')
                .addField("\u200B",definition)
                .addField("\u200B","Example/s: ")
                .addField("\u200B",example)
                .addField("\u200B","\u200B")
                .setFooter({ text: 'Urban Dictionary Api', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png" })
                .setTimestamp()
                .setURL(url)
    
        
        
            msg.reply({ embeds : [urbanDictionaryEmbeded] });
    
            //msg.reply(JSON.stringify(res.data.list[index_max_upvotes]))
            
        }
        else{

            let urbanDictionaryEmbeded = new Discord.MessageEmbed()
            .setTitle("*Definition not found*")
            .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png")
            .setColor('DARK_RED')
            .setFooter({ text: 'Urban Dictionary Api', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png" })
            .setTimestamp()

    
    
            msg.reply({ embeds : [urbanDictionaryEmbeded] });


        }

    })
  
    
    
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
            .addField("!definition [word or phrase] ","\u200B")
            .addField("!coinflip ","\u200B")
            .addField("!bloodtrail ","\u200B")
            .addField("!rampas ","\u200B")
            .addField("!bye ","\u200B")
            .addField("\u200B","\u200B")
            .setFooter({ text: 'B-Baka Bot by Ye4h', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/baka_bot_profile_img.jpg" })
    
    
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

        let command = msg.content.split(" ");
        command = command.slice(1);
        console.log(command)
        //fetchResponse(msg,word);




        //console.log(response);
        /*
        (async()=> 
        console.log('\nREQUEST 3', await(await fetch(url)).json()) 
        )();*/


    }
    else if(msg.content.startsWith("!definition")){

        let command = msg.content.split(" ");
        command = command.slice(1);
        command = command.join().trim().replaceAll(","," ");

        fetchResponse(msg,command)

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

