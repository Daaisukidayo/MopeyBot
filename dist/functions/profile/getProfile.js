"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "getProfile",
    description: "Returns the user's profile in JSON format.",
    params: [
        {
            name: "_userId",
            description: "ID of the user.",
            required: false,
        }
    ],
    brackets: false,
    output: "Json",
    code: `
    $return[$getUserVar[userProfile;$findUser[$env[_userId];true]]]
  `
};
//# sourceMappingURL=getProfile.js.map