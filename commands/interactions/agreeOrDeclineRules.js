module.exports = [{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `

    $onlyIf[$getUserVar[acceptedRules]==false]
    $onlyIf[$customID==acceptrules-$authorID]

    $!editMessage[$channelID;$messageID;
      $callFunction[rulesEmbeds;]
      $color[$getGlobalVar[luckyColor]]
      $footer[Thank you for agreeing to the rules!]
    ]

    $setUserVar[acceptedRules;true]

    $if[$getUserVar[MUID]==-1;
          
      $setGlobalVar[maxID;$sum[1;$getGlobalVar[maxID]]] 
      $setUserVar[MUID;$getGlobalVar[maxID];$authorID]

      $sendMessage[$getGlobalVar[channel];
        $description[Log: added id \`$getUserVar[MUID]\`]
        $color[2019b3]
        $author[$nickname • MUID: $getUserVar[MUID];$userAvatar]
        $if[$guildID!=;$footer[$guildName;$guildIcon]]     
      ]
    ]
  `},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
   
    $onlyIf[$getUserVar[acceptedRules]==false]
    $onlyIf[$customID==declinerules-$authorID]

    $!editMessage[$channelID;$messageID;
      $callFunction[rulesEmbeds;]
      $color[$getGlobalVar[errorColor]]
      $footer[You have declined the rules.]
    ]
  `
}]