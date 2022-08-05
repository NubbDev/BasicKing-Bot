import { Client, Guild, VoiceChannel } from "discord.js";
import fetch from 'node-superfetch'
import dotenv from 'dotenv';
dotenv.config();

import abbrNum from './../../abbrNum.js'

const vc = '996257057235795968'
const guildId = '986976198108254218'
export default async(client: Client) => {
    const channel = client.channels.cache.get(vc) as VoiceChannel 
    const name = "UC0UetqANVOipDeOLx08dffg"
    let data:any = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBE_API}`)
    let subCount = abbrNum((data.body.items[0].statistics.subscriberCount), 2)
    channel.setName(`📌│Youtube: ${subCount.toString()}`); 
    setInterval(async() => {
        let data:any = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBE_API}`)
        let subCount = abbrNum((data.body.items[0].statistics.subscriberCount), 2)
        channel.setName(`📌│Youtube: ${subCount.toString()}`); 
    }, 300000)
    console.log(`Subscriber Count: ${subCount.toString()} subs`)
    
}

// https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBEAPI}