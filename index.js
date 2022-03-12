const Discord = require('discord.js');
require('dotenv').config();

const mySecret = process.env['TOKEN'];

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


    if(msg.content=="ping"){

        msg.reply("Pong");
    }

})



//console.log(mySecret)
client.login(mySecret)
//client.login(process.env.TOKEN)
//client.login("ODg4NDEzNDI2OTc0NjAxMjE3.YUSVeg.L93LRPFL6xDKmG7iDcMH8A5EJ7A")