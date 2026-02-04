export default [{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;acceptrules]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]


    $if[$env[userProfile;MUID]==-1;

      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $arrayPush[allUserIDs;$authorID]
      $setGlobalVar[allUserIDs;$env[allUserIDs]]

      $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]]
      $!jsonSet[userProfile;acceptedRules;true]
      $!jsonSet[userProfile;MUID;$getGlobalVar[maxID]]
      $!jsonSet[userProfile;ID;"$authorID"]
      $saveProfile
    ]

    $jsonLoad[usernames;$getGlobalVar[usernames]]
    $!jsonSet[usernames;$get[id];$username]
    $setGlobalVar[usernames;$env[usernames]]

    $rulesEmbed[true]
    $color[$getGlobalVar[luckyColor]]
    $footer[$tl[ui.rules.accepted]]
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


    $rulesEmbed[true]
    $color[$getGlobalVar[errorColor]]
    $footer[$tl[ui.rules.declined]]
    $interactionUpdate
  `
}]