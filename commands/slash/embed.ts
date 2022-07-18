import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as fs from 'fs';

let rules = JSON.parse(fs.readFileSync('./commands/embeds/rules.json').toString())
let staff = JSON.parse(fs.readFileSync('./commands/embeds/staff.json').toString())

export default {
    category: "embeds",
    description: "send Embeds",

    hidden: true,
    ownerOnly: true,
    testOnly: true,
    slash: true,

    minArgs: 1,
    expectedArgs:'<name>',

    callback: ({message, text}) => {
        let embed:any;
        if (text === 'rules') {
            embed = new MessageEmbed(rules)
        } else if (text === 'staff'){
            embed = new MessageEmbed(staff)
        }
        return embed
    }
} as ICommand