export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "exit",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;messagemissing,quit]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;play]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $onlyif[$env[playData;started];
      $newError[$tl[ui.play.noSession]]
    ]

    $switch[$env[IID;0];
      $case[$env[passKeys;0];
        $let[content;$tl[ui.play.disconnected]]
        $if[$messageExists[$env[playData;ChannelID];$env[playData;MessageID]];
          $!deleteMessage[$env[playData;ChannelID];$env[playData;MessageID]]
        ]
      ]

      $case[$env[passKeys;1];
        $onlyIf[$env[playData;MessageID]==$messageID]
        $let[content;$tl[ui.play.exited]]
      ]
    ]
    $let[MC;$env[playData;MC]]
    $removePlayProgress

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[content]]
      $addTextDisplay[$tl[ui.play.earned;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `
}