"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handlePing",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addSection[
        $addTextDisplay[# $username[$botID]]
        $addThumbnail[$userAvatar[$botID]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.ping.ping.$get[l];$ping]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=ping.js.map