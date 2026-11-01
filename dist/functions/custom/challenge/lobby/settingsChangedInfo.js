"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "settingsChangedInfo",
    description: "a 'lobby settings changed' notice",
    params: [
        {
            name: "content",
            description: "the notice text",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsChange.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$env[content]]
    ;$getGlobalVar[luckyColor]]
    $let[messageId;$sendMessage[$channelID;;true]]
    $setTimeout[
      $!deleteMessage[$channelID;$get[messageId]]
    ;10s]
  `,
});
//# sourceMappingURL=settingsChangedInfo.js.map