"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleReport',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addAuthorDisplay
      $addSection[  
        $addTextDisplay[$tl[$get[l];ui;report.title]]
        $addButton[reportButton-$authorID;$tl[$get[l];ui;report.buttonLabel];Success;📢]
      ]
    ;$getGlobalVar[defaultColor]]

    $newCommandTimeout
  `
};
//# sourceMappingURL=report.js.map