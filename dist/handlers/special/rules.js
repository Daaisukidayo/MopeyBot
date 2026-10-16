"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleRules",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.information.$get[l];$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[ui.rules.tos.$get[l];$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[ui.rules.privacyPolicy.$get[l];$getGlobalVar[privacyLink]]]
      $addTextDisplay[$tl[ui.rules.usage.$get[l];$getGlobalVar[usageLink]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=rules.js.map