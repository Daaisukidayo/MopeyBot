"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleRules',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;rules.information;$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[$get[l];ui;rules.tos;$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[$get[l];ui;rules.rules;$getGlobalVar[rulesLink]]]
    ;$getGlobalVar[defaultColor]]
  `
};
//# sourceMappingURL=rules.js.map