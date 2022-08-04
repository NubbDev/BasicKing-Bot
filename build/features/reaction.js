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
exports.config = void 0;
exports.default = (client) => {
    client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.content.toLowerCase().includes("cool")) {
            yield message.react("😎");
        }
        if (message.content.toLowerCase().includes("minecraft")) {
            yield message.react("<a:jumpingblock:996540350111952979>");
        }
        if (message.content.toLowerCase().includes("king")) {
            yield message.react("👑");
        }
        if (message.content.toLowerCase().includes("nubb")) {
            yield message.react("<:typescript:1003168956770701355>");
            yield message.react("<a:developerbot:1003168955088769085>");
        }
    }));
};
exports.config = {
    dbName: 'REACTIONMESSAGES',
    displayName: 'Reaction Messages',
};
