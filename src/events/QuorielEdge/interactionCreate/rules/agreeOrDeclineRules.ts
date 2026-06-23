export default [{
  name: "acceptrules",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    $onlyIf[$env[userProfile;acceptedRules]==false;$!deleteMessage[$channelID;$messageID]]

    $if[$env[userProfile;MUID]==-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $arrayPush[allUserIDs;$authorID]
      $setGlobalVar[allUserIDs;$env[allUserIDs]]

      $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]]
      $!jsonSet[userProfile;MUID;$getGlobalVar[maxID]]
      $!jsonSet[userProfile;ID;"$authorID"]
    ]

    $!jsonSet[userProfile;acceptedRules;true]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.accepted.$get[l]]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
},{
  name: "declinerules",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    $onlyIf[$env[userProfile;acceptedRules]==false;$!deleteMessage[$channelID;$messageID]]

    $deleteUserVar[userProfile]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.declined.$get[l]]]
    ;$getGlobalVar[errorColor]]
    $interactionUpdate
  `
}]