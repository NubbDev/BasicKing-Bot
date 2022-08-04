import RSSParser from "rss-parser";
import { Client, MessageEmbed, TextChannel } from "discord.js";

const channelId = "988684565902159913"
const youtubeId = "UChSubjDL6iiqL-5hQ0BFw9g"
const request = new RSSParser
const urlRegexp = /(https?:\/\/[^ ]*)/

export default (client: Client) => {
    client.on('ready', async() => {
        const channel = (client.channels.cache.get(channelId)) as TextChannel

        setInterval(async() => {
            const req = (await request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeId}`)).items[0];

            let ifAlready:any = [...(await channel.messages.fetch({limit: 1})).values()]
            if(ifAlready.length > 0) ifAlready = ifAlready[0].content.match(urlRegexp) ;
            if(ifAlready != null) ifAlready = ifAlready[1];
            if(ifAlready == req?.link) return;

            const embed = new MessageEmbed()
                .setColor(15844367)
                .setDescription(`${req.summary}`)
                .setURL(`${req.link}`)
                .setTitle(`${req.title}`)

            channel.send({content: `More Extras from BasicKing's second channel, check it out! ${req.link}`, embeds: [embed]})
        }, 15000)
    })
}