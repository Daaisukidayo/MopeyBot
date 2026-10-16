import { Command } from "@quoriel/edge"

export default new Command({
  name: "declinerules",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    $onlyIf[$jsonGet[userProfile;acceptedRules]==false;$!deleteMessage[$channelID;$messageID]]

    $deleteUserVar[userProfile]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.declined.$get[l]]]
    ;$getGlobalVar[errorColor]]
    $interactionUpdate
  `,
})
