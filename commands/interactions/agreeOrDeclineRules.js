module.exports = [{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$getUserVar[acceptedRules]==false]

    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$splitText[0]==acceptrules]

    $!editMessage[$channelID;$messageID;
      $callFunction[rulesEmbeds;]
      $color[$getGlobalVar[luckyColor]]
      $footer[You have successfully accepted the rules! Enjoy using the bot!]
    ]

    $setUserVar[acceptedRules;true]

    $if[$getUserVar[MUID]==-1;
      $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]] 
      $setUserVar[MUID;$getGlobalVar[maxID]]               
    ]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$getUserVar[acceptedRules]==false]

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