export default [{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;acceptrules]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
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
    $saveProfile

    $jsonLoad[usernames;$getGlobalVar[usernames]]
    $!jsonSet[usernames;$get[id];$username]
    $setGlobalVar[usernames;$env[usernames]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.accepted]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;declinerules]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    $onlyIf[$env[userProfile;acceptedRules]==false;$!deleteMessage[$channelID;$messageID]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.declined]]
    ;$getGlobalVar[errorColor]]
    $interactionUpdate
  `
}]