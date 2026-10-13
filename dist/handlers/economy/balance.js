"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleBalance",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $let[packs;$arrayJoin[$arrayMap[$jsonGet[userProfile;userPacks];pack;$return[$tl[data.shopSkinPacks.$env[pack].$get[l]]]];\n]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.balance.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.balance.mc.$get[l];$separate[$jsonGet[userProfile;MC]]]]
      $addTextDisplay[$tl[ui.balance.purchased.$get[l]]]
      $addTextDisplay[$codeBlock[$default[$get[packs];$tl[ui.balance.none.$get[l]]]]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=balance.js.map