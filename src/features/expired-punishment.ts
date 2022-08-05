import punishmentSchema from "../models/player-schema"; 
import {Client} from 'discord.js'

export default (client: Client) => {
    client.on('guildMemberAdd',async (member) => {
        const result = await punishmentSchema.findOne({
            guildId: member.guild.id,
            userId: member.id,
            type: 'mute',
        })
        if (result) {
            const mutedRole = member.guild.roles.cache.find((role) => role.name === "mute")
            if (mutedRole) member.roles.add(mutedRole)
        }
    })
    const check = async () => {
        const query = {
            expires: {$lt: new Date() },
        }
        const results = await punishmentSchema.find(query)

        for (const result of results) {
            const {guildId, userId, type} = result
            const guild = await client.guilds.fetch(guildId)

            if (!guild) {
                console.log(`Guild "${guildId}" no longer uses this bot`)
                continue
            };
            if (type === 'ban') {
                guild.members.unban(userId, 'Ban Expired')
            } else if (type === 'mute'){
                const muteRole = guild.roles.cache.find((role) => role.name === 'mute')
                if (!muteRole) {
                    console.log(`Server is missing the mute role`)
                    continue
                }
                const member = guild.members.cache.get(userId)
                if (!member) {
                    continue
                }
                member.roles.remove(muteRole)
            }
        }
        setTimeout(check, 1000 * 60)
    }
    check()
}
export const config = {
    dbName: 'EXPIRED_PUNISHMENTS',
    displayName: 'Expired Punishments',
}