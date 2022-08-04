"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
let rules = JSON.parse(fs.readFileSync('./build/embeds/rules.json').toString());
let staff = JSON.parse(fs.readFileSync('./build/embeds/staff.json').toString());
exports.default = {
    category: "embeds",
    description: "send Embeds",
    hidden: true,
    ownerOnly: true,
    testOnly: true,
    slash: true,
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<channel> <name>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    callback: ({ interaction, args }) => {
        const channel = (interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel';
        }
        const text = args[1];
        if (text === 'rules') {
            let embed = new discord_js_1.MessageEmbed(rules);
            channel.send({ embeds: [embed] });
            return 'sent';
        }
        else if (text === 'staff') {
            let embed = new discord_js_1.MessageEmbed(staff);
            channel.send({ embeds: [embed] });
            return 'sent';
        }
        else {
            return `Unable to find ${text}`;
        }
    }
};
