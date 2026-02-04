export default {
  name: "startTimer",
  description: "Sets the luck challenge timer for the user.",
  params: [
    {
      name: "user_id",
      description: "The ID of the user.",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]

    $setInterval[
      $setUserVar[1htime|$channelID;$math[$getUserVar[1htime|$channelID;$get[id]] + 1];$get[id]]

      $switch[$getUserVar[1htime|$channelID;$get[id]];
        $case[1800;   $timeLeft[30;m]  ]
        $case[3540;   $timeLeft[1;m]   ]
        $case[3597;   $timeLeft[3;s]   ]
        $case[3598;   $timeLeft[2;s]   ]
        $case[3599;   $timeLeft[1;s]   ] 
        $case[3600;
          $stopTimer[$get[id]]
          $sendMessage[$channelID;
            $jsonLoad[UP;$getProfile[$get[id]]]
            $addContainer[
              $addAuthorDisplay
              $addTextDisplay[$tl[ui.challenge.completed]]
              $addSeparator[Large]
              $addTextDisplay[$tl[ui.challenge.completedDescription1]]
              $addTextDisplay[$tl[ui.challenge.completedDescription2]]
              $addSeparator
              $addActionRow
              $addButton[confirmEndingChallenge-$get[id];$tl[ui.challenge.buttonLabelConfirm];Success;✅]
            ;$getGlobalVar[luckyColor]]
          ]
        ] 
      ]
    ;1s;clg_timer-$get[id]|$channelID]
  `
}