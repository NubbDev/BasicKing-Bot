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
const welcome_1 = __importDefault(require("../../../canvas/welcome"));
exports.default = {
    category: "test",
    description: "welcome image test command",
    ownerOnly: true,
    testOnly: true,
    slash: true,
    hidden: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<user>",
    expectedArgsTypes: ["USER"],
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const member = interaction.options.getMember('user');
        const img = yield (0, welcome_1.default)(member);
        return [img];
    })
};
