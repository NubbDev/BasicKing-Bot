import {MessageActionRow, MessageSelectMenu,TextChannel, Client, GuildMember, Interaction } from "discord.js";
import { ICommand } from "wokcommands";
import * as fs from 'fs';

export default {
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

    init: (client: Client) => {
        client.on('interactionCreate', interaction => { 
            if (!interaction.isSelectMenu()){
                return
            }
            const {customId, values, member} = interaction
            if (customId === "PingMenu" && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })
                for (const id of removed){
                    member.roles.remove(id.value)
                }
                for (const id of values){
                    member.roles.add(id)
                }
                interaction.reply({
                    content: "Roles Updated",
                    ephemeral: true
                })
            }
        })
    },

    callback: async ({interaction}) => {
        const channel = (interaction.options.getChannel('channel')) as TextChannel;
        let pingroles = JSON.parse(fs.readFileSync('./commands/embeds/pingroles.json').toString())
        let row = new MessageActionRow
        row.addComponents(
            new MessageSelectMenu()
                .setCustomId("PingMenu")
                .setPlaceholder("Select your notification roles...")
                .setMinValues(0)
                .setMaxValues(4)
                .addOptions([
                    {
                        label: 'Update Notifications',
                        description: 'Receive server update pings!',
                        value: '996248807916445739'
                    },
                    {
                        label: 'Event Ping',
                        description: 'Receive event notifications for server fun times!',
                        value: '996248566362284042' 
                    },
                    {
                        label: 'Giveaway Notifications',
                        description: 'Receive giveaway pings for free items!',
                        value: '996248853990875206'
                    },
                    {
                        label: 'Social Notifications',
                        description: 'Get alerted to twitter and livestream notifications!',
                        value: '1000646675989266532' 
                    }
                ])
        )
        channel.send({embeds: [pingroles], components: [row]})
        await interaction.reply("Message Sent")
        }
} as ICommand