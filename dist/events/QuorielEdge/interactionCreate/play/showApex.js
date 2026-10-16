"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_showApexes",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]

    $jsonLoad[apexData;$getCurrentApexData[playData]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$jsonGet[apexData;content]]
    ;$getBiomeColor[playData]]
    $ephemeral
    $interactionReply
  `,
});
//# sourceMappingURL=showApex.js.map