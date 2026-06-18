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

    $getCache[usernames;usernames]
    $!jsonSet[usernames;$authorID;$username]
    $setCache[usernames;$env[usernames]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;rules.accepted]]
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

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;rules.declined]]
    ;$getGlobalVar[errorColor]]
    $interactionUpdate
  `
}]