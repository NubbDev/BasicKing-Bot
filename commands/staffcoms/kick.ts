import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'moderation',
    description: 'Kick a user',

    requireRoles: true,

    slash: "both",
    testOnly: true,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: `<user> <reason>`,
    expectedArgsTypes: ["USER", "STRING"],

    callback: ({message, interaction, args}) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember("user") as GuildMember
        if (!target) return {custom: true, content: "Please tag a member", ephemeral: true}

        if (!target.kickable) return {custom: true, content: "Unable to ban user", ephemeral: true};
        args.shift()

        const reason = args.join(' ')
        target.kick(reason)

        return `<@${target.id}> was kicked from the server!`
    }
} as ICommand