import playSnippets from '#snippets/playSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "exit",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;messagemissing,quit]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;play]]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $onlyif[$env[playData;started];
      $description[## You don't have an active game session!]
      $callFunction[embed;error]
      $interactionUpdate
    ]

    $let[earned;-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]

    $switch[$env[IID;0];
      $case[$env[passKeys;0];
        $description[## You have been disconnected from the game!\n$get[earned]]
        $try[$!disableComponentsOf[$env[playData;ChannelID];$env[playData;MessageID]]]
      ]
      $case[$env[passKeys;1];
        $onlyIf[$env[playData;MessageID]==$messageID]
        $description[## You have exited the game!\n$get[earned]]
      ]
    ]
    $callFunction[embed;default]
    $interactionUpdate
    ${playSnippets.removeAllProgress()}
  `
}