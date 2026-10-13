"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "acceptrules",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    $onlyIf[$jsonGet[userProfile;acceptedRules]==false;$!deleteMessage[$channelID;$messageID]]

    $if[$jsonGet[userProfile;MUID]==-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $arrayPush[allUserIDs;$authorID]
      $setGlobalVar[allUserIDs;$env[allUserIDs]]

      $let[MUID;$math[$getGlobalVar[maxID] + 1]]
      $setGlobalVar[maxID;$get[MUID]]
      $objectMerge[userProfile;$objectOf[MUID;$get[MUID];ID;"$authorID"]]
    ]

    $!jsonSet[userProfile;acceptedRules;true]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.accepted.$get[l]]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
});
//# sourceMappingURL=accept.js.map