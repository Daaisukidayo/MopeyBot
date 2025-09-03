import timeLeft from './timeLeftMessage.js'
export default function interval (id = '$authorID'){
  return `
    $setInterval[
      $setUserVar[1htime|$channelID;$math[$getUserVar[1htime|$channelID;${id}] + 1];${id}]

      $switch[$getUserVar[1htime|$channelID;${id}];
        $case[1800;   ${timeLeft('30m', id)}  ]
        $case[3540;   ${timeLeft('1m',id)}   ]
        $case[3597;   ${timeLeft('3s',id)}   ]
        $case[3598;   ${timeLeft('2s',id)}   ]
        $case[3599;   ${timeLeft('1s',id)}   ] 
        $case[3600;
          $!stopInterval[1HLUCK-${id}|$channelID]
          $sendMessage[$channelID;
            $jsonLoad[userProfile;$getUserVar[userProfile;${id}]]
            $author[$username[${id}] • MUID: $env[userProfile;MUID];$userAvatar[${id}]]
            $color[$getGlobalVar[luckyColor]]
            $description[# 1 Hour Luck Ended!\n## You can continue typing if you didn't manage to finish.\n### Press «Confirm» button to end your challenge whenever you want.]

            $addActionRow
            $addButton[confirmEndingChallenge-${id};Confirm;Success;✅]
          ]
        ] 
      ]
    ;1s;1HLUCK-${id}|$channelID]
  `
}