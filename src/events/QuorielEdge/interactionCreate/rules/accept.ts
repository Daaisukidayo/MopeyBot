import { Command } from "@quoriel/edge"

export default new Command({
  name: "acceptrules",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    $onlyIf[$jsonGet[userProfile;verified]==false;$!deleteMessage[$channelID;$messageID]]

    $if[$jsonGet[userProfile;muid]==-1;
      $let[MUID;$math[$getGlobalVar[maxID] + 1]]
      $setGlobalVar[maxID;$get[MUID]]
      $objectMerge[userProfile;$objectOf[muid;$get[MUID];user_id;"$authorID"]]
    ]

    $!jsonSet[userProfile;verified;true]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.accepted.$get[l]]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `,
})
