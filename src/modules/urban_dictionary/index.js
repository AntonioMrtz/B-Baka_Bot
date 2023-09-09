
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

    fetchResponse: async function (msg) {



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
        }*/

        let word;


        if(msg.content.split(" ")[0]==="!wordoftheday"){

            let res = await (axios.get("https://www.urbandictionary.com/"))

    
                let re_wordoftoday_title = new RegExp(/<title>.*<\/title>/);
    
                let result_re = re_wordoftoday_title.exec(res.data)[0]
    
                word = result_re.split(":")[1];
                word = word.trim();
                word = word.replace("</title>","");
          
        }

        else{

            word = msg.content.split(" ");
            word = word.slice(1);
            word = word.join().trim().replaceAll(",", " ");

        }



        let url = 'https://api.urbandictionary.com/v0/define?term=' + word;


        axios.get(url)
            .then((res) => {

                let max_upvotes = -1;
                let index_max_upvotes = -1;

                for (let i = 0; i < res.data.list.length; i++) {


                    if (max_upvotes == -1 || max_upvotes < res.data.list[i].thumbs_up) {
                        max_upvotes = res.data.list[i].thumbs_up;
                        index_max_upvotes = i;
                    }

                }

                if (max_upvotes != -1) {

                    let definition = res.data.list[index_max_upvotes].definition;
                    definition = definition.replaceAll("[", "");
                    definition = definition.replaceAll("]", "");

                    let example = res.data.list[index_max_upvotes].example;
                    example = example.replaceAll("[", "");
                    example = example.replaceAll("]", "");

                    let url = res.data.list[index_max_upvotes].permalink;



                    let urbanDictionaryEmbeded = new Discord.MessageEmbed()
                        .setTitle("Definition of " + word)
                        .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png")
                        .setColor('DARK_BLUE')
                        .addField("\u200B", definition)
                        .addField("\u200B", "Example/s: ")
                        .addField("\u200B", example)
                        .addField("\u200B", "\u200B")
                        .setFooter({ text: 'Urban Dictionary API', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png" })
                        .setTimestamp()
                        .setURL(url)



                    msg.reply({ embeds: [urbanDictionaryEmbeded] });

                }
                else {

                    let urbanDictionaryEmbeded = new Discord.MessageEmbed()
                        .setTitle("*Definition not found*")
                        .setThumbnail("https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png")
                        .setColor('DARK_RED')
                        .setFooter({ text: 'Urban Dictionary API', iconURL: "https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png" })
                        .setTimestamp()



                    msg.reply({ embeds: [urbanDictionaryEmbeded] });


                }

            })





    }

}