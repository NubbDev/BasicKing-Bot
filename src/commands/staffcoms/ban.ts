import { GuildMember, User } from "discord.js";
import { ICommand } from "wokcommands";
import punishmentSchema from "../../models/punishment-schema";

export default {
    category: 'moderation',
    description: 'ban a user',

    requireRoles: true,

    slash: "both",
    testOnly: true,
    guildOnly: true,

    minArgs: 3,
    expectedArgs: `<user> <period> <reason>`,
    expectedArgsTypes: ["USER", "STRING", "STRING"],

    callback: async ({message, interaction, args, guild, member: staff, client}) => {
        if (!guild) return {custom: true, content: "Command only executable in a server" , ephemeral: true}
        let userId = args.shift()!
        const duration = args.shift()!
        const reason = args.join(" ")
        let user: User | undefined

        if (message){
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser("user") as User
        }
        if (!user) {
            userId = userId.replace(/[<@!>]/g,'')
            user = await client.users.fetch(userId)

            if (!user) {
                return {custom: true, content: "User not found" , ephemeral: true}
            }
        }
        userId = user.id
        let time 
        let type

        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLowerCase()
        } catch (e) {
            return {custom: true, content: "Invalid time format\n`10d` where `d = days`\n`h = hours`\n`m = minutes`" , ephemeral: true}
        }

        if (type === "h") {
            time *= 60
        } else if (type === "d") {
            time *= 60 * 24
        } else if (type !== "m") {
            return {custom: true, content: "Invalid time format\n`10d` where `d = days`\n`h = hours`\n`m = minutes`" , ephemeral: true}
        }

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)

        const result = await punishmentSchema.findOne({
            guildId: guild.id,
            userId,
            type: "ban",
        })

        if (result) {
            return {custom: true, content: `${user} is already banned` , ephemeral: true}
        }

        try {
            await guild.members.ban(userId, {days:7, reason})
            await new punishmentSchema({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'ban'
            }).save()
        } catch (ignored) {
            return {custom: true, content: "Cannot ban user" , ephemeral: true}
        }
        return {custom: true, content: `<@${userId}> has been banned for ${duration}`}
    },
} as ICommand