"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleCredits",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addContainer[
      $addTextDisplay[$tl[ui.credits.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.credits.owner&devs.$get[l]]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $addTextDisplay[$tl[ui.credits.artists.$get[l]]]
      $addTextDisplay[$codeBlock[$username[502840819380912139]\n$username[254354531951837186]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.credits.madeWithLove.$get[l]]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=credits.js.map