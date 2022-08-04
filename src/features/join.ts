import { Client, TextChannel } from 'discord.js';
import welcomeImage from '../canvas/welcome'

export default (client: Client) => {
    const channelId = '996891767188230194'
    const memberRole = '988684522839212113'

    client.on("guildMemberAdd", async (member) => {
        const img = await welcomeImage(member)
        const i = Math.floor(Math.random() * (20 - 0 + 1))
        const text = [`${member} just joined the server - glhf!`, `${member} just joined. Everyone, look busy!`, `${member} just joined. Can I get a heal?`, `${member} joined your party.`, `${member} joined. You must construct additional pylons.`, `Ermagherd. ${member} is here.`, `Welcome, ${member}. Stay awhile and listen.`, `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, ${member}. We hope you brought pizza.`, `Welcome ${member}. Leave your weapons by the door.`, `A wild ${member} appeared.`, `Swoooosh. ${member} just landed.`, `Brace yourselves. ${member} just joined the server.`, `${member} just joined. Hide your bananas.`, `${member} just arrived. Seems OP - please nerf.`, `${member} just slid into the server.`, `A ${member} has spawned in the server.`, `Big ${member} showed up!`, `Where’s ${member}? In the server!`, `${member} hopped into the server. Kangaroo!!`, `${member} just showed up. Hold my beer.`,]

        console.log(text[i])
        const channel = (client.channels.cache.get(channelId)) as TextChannel;
        channel.send({content: text[i], files: [img]})
        member.roles.add(memberRole)
    })
}
export const config = {
    dbName: 'MEMBERS',
    displayName: 'Joined Members',
}
