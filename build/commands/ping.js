"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'testing',
    description: 'replies with pong',
    slash: "both",
    testOnly: true,
    callback: ({}) => {
        return 'Pong';
    }
};
