import { Client, Guild, GuildMember, VoiceChannel } from "discord.js";

const vc = '996460777131212820'
const guildId = '986976198108254218'
export default async(client: Client) => {
    const channel = client.channels.cache.get(vc) as VoiceChannel 
    let guild = client.guilds.cache.get(guildId) as Guild

    await guild.members.fetch()
    setInterval(async() => {
        channel.setName(`👥│Members: ${guild.members.cache.filter(member => !member.user.bot).size}`); 
    }, 300000)


    client.on('guildMemberAdd', (member)=> {
        channel.setName(`👥│Members: ${member.guild.members.cache.filter(member => !member.user.bot).size}`)
        console.log(`${guild.name} has ${guild.members.cache.filter(member => !member.user.bot).size} members`)
    })
    client.on('guildMemberRemove', (member)=> {
        channel.setName(`👥│Members: ${member.guild.members.cache.filter(member => !member.user.bot).size}`)
        console.log(`${guild.name} has ${guild.members.cache.filter(member => !member.user.bot).size} members`)

    })
    console.log(`${guild.memberCount} members in counting`)
    
}