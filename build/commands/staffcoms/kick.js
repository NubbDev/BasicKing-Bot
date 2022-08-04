"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'moderation',
    description: 'Kick a user',
    requireRoles: true,
    slash: "both",
    testOnly: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: `<user> <reason>`,
    expectedArgsTypes: ["USER", "STRING"],
    callback: ({ message, interaction, args }) => {
        var _a;
        const target = message ? (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first() : interaction.options.getMember("user");
        if (!target)
            return { custom: true, content: "Please tag a member", ephemeral: true };
        if (!target.kickable)
            return { custom: true, content: "Unable to ban user", ephemeral: true };
        args.shift();
        const reason = args.join(' ');
        target.kick(reason);
        return `<@${target.id}> was kicked from the server!`;
    }
};
