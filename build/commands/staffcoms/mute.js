"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_schema_1 = __importDefault(require("../../models/player-schema"));
exports.default = {
    category: 'moderation',
    description: 'mute a user',
    requireRoles: true,
    slash: "both",
    testOnly: true,
    guildOnly: true,
    minArgs: 3,
    expectedArgs: `<user> <period> <reason>`,
    expectedArgsTypes: ["USER", "STRING", "STRING"],
    callback: ({ message, interaction, args, guild, member: staff, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!guild)
            return { custom: true, content: "Command only executable in a server", ephemeral: true };
        let userId = args.shift();
        const duration = args.shift();
        const reason = args.join(" ");
        let user;
        if (message) {
            user = (_a = message.mentions.users) === null || _a === void 0 ? void 0 : _a.first();
        }
        else {
            user = interaction.options.getUser("user");
        }
        if (!user) {
            userId = userId.replace(/[<@!>]/g, '');
            user = yield client.users.fetch(userId);
            if (!user) {
                return { custom: true, content: "User not found", ephemeral: true };
            }
        }
        userId = user.id;
        let time;
        let type;
        try {
            const split = duration.match(/\d+|\D+/g);
            time = parseInt(split[0]);
            type = split[1].toLowerCase();
        }
        catch (e) {
            return { custom: true, content: "Invalid time format\n`10d` where `d = days`\n`h = hours`\n`m = minutes`", ephemeral: true };
        }
        if (type === "h") {
            time *= 60;
        }
        else if (type === "d") {
            time *= 60 * 24;
        }
        else if (type !== "m") {
            return { custom: true, content: "Invalid time format\n`10d` where `d = days`\n`h = hours`\n`m = minutes`", ephemeral: true };
        }
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + time);
        const result = yield player_schema_1.default.findOne({
            guildId: guild.id,
            userId,
            type: "mute",
        });
        if (result) {
            return { custom: true, content: `${user} is already muted`, ephemeral: true };
        }
        try {
            const member = yield guild.members.fetch(userId);
            if (member) {
                const muteRole = guild.roles.cache.find((role) => role.name === 'mute');
                if (!muteRole)
                    return { custom: true, content: `Server is missing the mute role`, ephemeral: true };
                member.roles.add(muteRole);
            }
            yield new player_schema_1.default({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'mute'
            }).save();
        }
        catch (ignored) {
            return { custom: true, content: "Cannot mute user", ephemeral: true };
        }
        return { custom: true, content: `<@${userId}> has been muted for ${duration}` };
    }),
};
