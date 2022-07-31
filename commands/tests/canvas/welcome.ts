import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import welcomeImage from '../../../canvas/welcome'
export default {
    category: "test",
    description: "welcome image test command",

    ownerOnly: true,
    testOnly: true,
    slash: true,
    hidden: true,

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<user>",
    expectedArgsTypes: ["USER"],

    callback: async ({interaction})=>{
        const member = interaction.options.getMember('user') as GuildMember
        const img = await welcomeImage(member)
        return [img]
    }
} as ICommand