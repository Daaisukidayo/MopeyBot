module.exports = [{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;acceptedRules]==false]

    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$splitText[0]==acceptrules]

    $!editMessage[$channelID;$messageID;
      $callFunction[rulesEmbeds;]
      $color[$getGlobalVar[luckyColor]]
      $footer[You have successfully accepted the rules! Enjoy using the bot!]
    ]

    $if[$env[userProfile;MUID]==-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $arrayPush[allUserIDs;$authorID]

      $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]]
      $setGlobalVar[allUserIDs;$trimLines[$env[allUserIDs]]]
      $!jsonSet[userProfile;acceptedRules;true]
      $!jsonSet[userProfile;MUID;$getGlobalVar[maxID]]  
      $!jsonSet[userProfile;ID;$authorID]  
      $setUserVar[userProfile;$env[userProfile]]
    ]       
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;acceptedRules]==false]

    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$splitText[0]==declinerules]

    $!editMessage[$channelID;$messageID;
      $callFunction[rulesEmbeds;]
      $color[$getGlobalVar[errorColor]]
      $footer[You have chosen to decline the rules.]
    ]
  `
}]