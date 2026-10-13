"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = [
    new forgescript_1.ForgeFunction({
        name: "handleChangelog",
        code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[changelog;$jsonGet[$readFile[res/locale/changelog.json];$get[l]]]

    $changelogEmbed
  `
    }),
    new forgescript_1.ForgeFunction({
        name: "changelogEmbed",
        code: `
    $addContainer[
      $addTextDisplay[$arrayJoin[changelog;\n]]
    ;$getGlobalVar[defaultColor]]
  `
    })
];
//# sourceMappingURL=changelog.js.map