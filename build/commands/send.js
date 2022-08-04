"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'send',
    description: 'Send User Message',
    hidden: true,
    ownerOnly: true,
    testOnly: true,
    slash: true,
    minArgs: 2,
    expectedArgs: "<channel> <name>",
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    callback: ({ message, interaction, args }) => {
        message;
        const channel = (interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel';
        }
        args.shift();
        const text = args.join(" ");
        channel.send(text);
        if (interaction) {
            interaction.reply({
                content: "Message Sent",
                ephemeral: true,
            });
        }
    }
};
