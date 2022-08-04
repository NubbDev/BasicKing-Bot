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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
exports.default = {
    description: "Ping Role Menu selection",
    category: "RoleMenu",
    hidden: true,
    ownerOnly: true,
    testOnly: true,
    slash: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<channel>',
    expectedArgsTypes: ['CHANNEL'],
    init: (client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return;
            }
            const { customId, values, member } = interaction;
            if (customId === "PingMenu" && member instanceof discord_js_1.GuildMember) {
                const component = interaction.component;
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value);
                });
                for (const id of removed) {
                    member.roles.remove(id.value);
                }
                for (const id of values) {
                    member.roles.add(id);
                }
                interaction.reply({
                    content: "Roles Updated",
                    ephemeral: true
                });
            }
        });
    },
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = (interaction.options.getChannel('channel'));
        let pingroles = JSON.parse(fs.readFileSync('./build/embeds/pingroles.json').toString());
        let row = new discord_js_1.MessageActionRow;
        row.addComponents(new discord_js_1.MessageSelectMenu()
            .setCustomId("PingMenu")
            .setPlaceholder("Select your notification roles...")
            .setMinValues(0)
            .setMaxValues(4)
            .addOptions([
            {
                label: 'Update Notifications',
                description: 'Receive server update pings!',
                emoji: '📆',
                value: '996248807916445739'
            },
            {
                label: 'Event Ping',
                description: 'Receive event notifications for server fun times!',
                emoji: '🎉',
                value: '996248566362284042'
            },
            {
                label: 'Giveaway Notifications',
                description: 'Receive giveaway pings for free items!',
                emoji: '🎁',
                value: '996248853990875206'
            },
            {
                label: 'Social Notifications',
                description: 'Get alerted to twitter and livestream notifications!',
                emoji: '🐦',
                value: '1000646675989266532'
            }
        ]));
        channel.send({ embeds: [pingroles], components: [row] });
        yield interaction.reply("Message Sent");
    })
};
