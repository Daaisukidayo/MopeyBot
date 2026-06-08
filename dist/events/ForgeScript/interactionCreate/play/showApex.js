"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'interactionCreate',
    allowedInteractionTypes: ['button'],
    code: `
    $arrayLoad[IID;-;$customID]

    $onlyIf[$arrayIncludes[IID;showApex_play]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[apexData;$getCurrentApexData]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]

    $let[color;$env[biomeColors;$env[playData;currentBiome]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$env[apexData;content]]
    ;$get[color]]
    $ephemeral
    $interactionReply
  `
};
//# sourceMappingURL=showApex.js.map