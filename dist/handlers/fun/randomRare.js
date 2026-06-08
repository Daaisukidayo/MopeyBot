"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleRandomrare',
    code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $getCache[raresContent;raresContent]

    $addTextDisplay[# $arrayRandomValue[raresContent]]
  `
};
//# sourceMappingURL=randomRare.js.map