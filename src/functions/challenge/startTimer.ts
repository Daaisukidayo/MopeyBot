export default {
  name: "startTimer",
  description: "Starts 1 hour luck timer for the provided user.",
  params: [
    {
      name: "_userId",
      description: "ID of the user.",
      type: "User",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $jsonLoad[userProfile;$getProfile[$get[userId]]]
    $let[l;$env[userProfile;language]]


    $fn[timeLeft;
      $sendMessage[$channelID;
        $addTextDisplay[$tl[ui.challenge.timeLeft_$env[designation].$get[l];<@$get[userId]>;$env[time]]]
      ]
    ;time;designation]


    $setInterval[
      $setTimer[$math[$getTimer[$get[userId]] + 1];$get[userId]]

      $switch[$getTimer[$get[userId]];
        $case[1800;     $callFn[timeLeft;30;m]]
        $case[3540;     $callFn[timeLeft;1;m]]
        $case[3597;     $callFn[timeLeft;3;s]]
        $case[3598;     $callFn[timeLeft;2;s]]
        $case[3599;     $callFn[timeLeft;1;s]]
        $case[3600;
          $sendMessage[$channelID;
            $addContainer[
              $addAuthorDisplay
              $addTextDisplay[$tl[ui.challenge.completed.$get[l]]]
              $addSeparator[Large]
              $addTextDisplay[$tl[ui.challenge.completedDescription1.$get[l]]]
              $addTextDisplay[$tl[ui.challenge.completedDescription2.$get[l]]]
              $addSeparator
              $addActionRow
              $addButton[confirmEndingChallenge-$get[userId];$tl[ui.challenge.buttonLabelConfirm.$get[l]];Success;✅]
            ;$getGlobalVar[luckyColor]]
          ]
        ]
      ]
      
      $if[$getTimer[$get[userId]]>=3600; 
        $stopTimer[$get[userId]]
        $return
      ]

    ;1s;challengeTimer-$get[userId]|$channelID]
  `
}