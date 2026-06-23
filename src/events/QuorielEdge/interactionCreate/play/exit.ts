export default {
  name: "play_leave",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $onlyif[$env[playData;started];
      $newError[$tl[ui.play.noSession.$get[l]]]
    ]

    $switch[$env[IID;1];
      $case[disconnect;
        $let[content;$tl[ui.play.disconnected.$get[l]]]
        $if[$messageExists[$env[playData;ChannelID];$env[playData;MessageID]];
          $!deleteMessage[$env[playData;ChannelID];$env[playData;MessageID]]
        ]
      ]

      $case[quit;
        $onlyIf[$env[playData;MessageID]==$messageID]
        $let[content;$tl[ui.play.exited.$get[l]]]
      ]
    ]

    $let[MC;$env[playData;MC]]
    $removePlayProgress

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[content]]
      $addTextDisplay[$tl[ui.play.earned.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `
}