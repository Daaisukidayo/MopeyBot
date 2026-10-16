"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleReport",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addAuthorDisplay
      $addSection[  
        $addTextDisplay[$tl[ui.report.title.$get[l]]]
        $addButton[reportButton-$authorID;$tl[ui.report.buttonLabel.$get[l]];Success;📢]
      ]
    ;$getGlobalVar[defaultColor]]

    $newCommandTimeout
  `,
});
//# sourceMappingURL=report.js.map