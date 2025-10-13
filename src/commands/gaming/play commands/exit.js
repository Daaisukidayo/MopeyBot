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
      $addContainer[
        $callFunction[newAuthor]
        $addSeparator[Large]
        $addTextDisplay[## You don't have an active game session!]
      ;$getGlobalVar[errorColor]]      
      $interactionUpdate
    ]

    $let[earned;-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]

    $switch[$env[IID;0];
      $case[$env[passKeys;0];
        $let[content;## You have been disconnected from the game!]
        $try[$!deleteMessage[$env[playData;ChannelID];$env[playData;MessageID]]]
      ]

      $case[$env[passKeys;1];
        $onlyIf[$env[playData;MessageID]==$messageID]
        $let[content;## You have exited the game!]
      ]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[$get[content]]
      $addTextDisplay[$get[earned]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
    ${playSnippets.removeAllProgress()}
  `
}