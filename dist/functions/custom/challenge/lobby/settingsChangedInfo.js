"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "settingsChangedInfo",
    description: "Displays a lobby settings changed notification.",
    params: [
        {
            name: "content",
            description: "The content to display in the notification.",
            type: forgescript_1.ArgType.String
        }
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
  `
});
//# sourceMappingURL=settingsChangedInfo.js.map