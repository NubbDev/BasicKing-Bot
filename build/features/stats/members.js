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
Object.defineProperty(exports, "__esModule", { value: true });
const vc = '996460777131212820';
const guildId = '986976198108254218';
exports.default = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = client.channels.cache.get(vc);
    let guild = client.guilds.cache.get(guildId);
    yield guild.members.fetch();
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        channel.setName(`👥│Members: ${guild.members.cache.filter(member => !member.user.bot).size}`);
    }), 300000);
    client.on('guildMemberAdd', (member) => {
        channel.setName(`👥│Members: ${member.guild.members.cache.filter(member => !member.user.bot).size}`);
        console.log(`${guild.name} has ${guild.members.cache.filter(member => !member.user.bot).size} members`);
    });
    client.on('guildMemberRemove', (member) => {
        channel.setName(`👥│Members: ${member.guild.members.cache.filter(member => !member.user.bot).size}`);
        console.log(`${guild.name} has ${guild.members.cache.filter(member => !member.user.bot).size} members`);
    });
    console.log(`${guild.memberCount} members in counting`);
});
