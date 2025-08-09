module.exports = [{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;acceptedRules]==false]

    $arrayLoad[interactionID;-;$customID]
    $onlyIf[$arrayIncludes[interactionID;acceptrules]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $if[$env[userProfile;MUID]==-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $arrayPush[allUserIDs;$authorID]

      $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]]
      $setGlobalVar[allUserIDs;$env[allUserIDs]]
      $!jsonSet[userProfile;acceptedRules;true]
      $!jsonSet[userProfile;MUID;$getGlobalVar[maxID]]  
      $!jsonSet[userProfile;ID;$authorID]  
      $setUserVar[userProfile;$env[userProfile]]
    ]

    $callFunction[rulesEmbeds]
    $color[$getGlobalVar[luckyColor]]
    $footer[You have successfully accepted the rules! Enjoy using the bot!]
    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;acceptedRules]==false]

    $arrayLoad[interactionID;-;$customID]
    $onlyIf[$arrayIncludes[interactionID;declinerules]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $callFunction[rulesEmbeds]
    $color[$getGlobalVar[errorColor]]
    $footer[You have chosen to decline the rules.]
    $interactionUpdate
  `
}]