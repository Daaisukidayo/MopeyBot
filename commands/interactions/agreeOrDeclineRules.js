module.exports = [
  {
    type: "interactionCreate",
    allowedInteractionTypes: ["button"],
    code: `
      $onlyIf[$getUserVar[acceptedRules]==false]
      $onlyIf[$customID==acceptrules-$authorID]

      $!editMessage[$channelID;$messageID;
        $callFunction[rulesEmbeds;]
        $color[$getGlobalVar[luckyColor]]
        $footer[You have successfully accepted the rules! Enjoy using the bot.]
      ]

      $setUserVar[acceptedRules;true]

      $if[$getUserVar[MUID]==-1;
        $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]] 
        $setUserVar[MUID;$getGlobalVar[maxID]]

        $callFunction[logSchema;$description[Added id \`$getUserVar[MUID]\`]]
               
        ]
      ]
    `
  },
  {
    type: "interactionCreate",
    allowedInteractionTypes: ["button"],
    code: `
      $onlyIf[$getUserVar[acceptedRules]==false]
      $onlyIf[$customID==declinerules-$authorID]

      $!editMessage[$channelID;$messageID;
        $callFunction[rulesEmbeds;]
        $color[$getGlobalVar[errorColor]]
        $footer[You have chosen to decline the rules.]
      ]
    `
  }
];