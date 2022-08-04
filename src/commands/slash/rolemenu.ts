import { Client, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'RoleMenu Add',
    description: 'Adds a role to the menu',

    hidden: true,
    ownerOnly: true,
    testOnly: true,
    slash: true,

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    callback: async({client, message, interaction, args}) => {message
        const channel = (interaction.options.getChannel('channel')) as TextChannel;
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }

        const messageId =  args[1]
        const role = (interaction.options.getRole('role')) as Role

        if (!role) {
            return 'role not found'
        }
        
        const targetMessage = await  channel.messages.fetch(messageId, {
            cache: true,
            force:true
        })
        if (!targetMessage) {
            return "Unknow message ID."
        }
        if (targetMessage.author.id !== client.user?.id) {
            return `Please provide a message ID that was sent from <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if(!row){
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]
        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value){ return{
                    custom: true,
                    content: `<@&${o.value} is already part of this menu`,
                    allowedMentions: {
                        roles:[]
                    },
                    ephemeral: true
                    }
                }
            }
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_role')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select your roles...')
                    .addOptions(option)
            )
        }
        targetMessage.edit({
            components: [row]
        })

        return{
            custom: true,
            content: `added <@${role.id}>`,
            allowedMentions: {
                role:[]
            },
            ephemeral: true
        }
    },

} as ICommand