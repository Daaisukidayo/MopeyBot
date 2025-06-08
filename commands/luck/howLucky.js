module.exports = ({
  name: "howlucky",
  aliases: ['hl'],
  type: "messageCreate",
  code:` 
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $let[lastHLUsed;$env[userProfile;limiters;lastHLUsed]]

    $if[$get[lastHLUsed]!=$day;

      $!jsonSet[userProfile;limiters;lastHLUsed;$day]
      $!jsonSet[userProfile;limiters;HLRandom;$randomNumber[0;101]]

      $jsonLoad[data;${data()}]

      $arrayForEach[data;d;
        $if[$get[stop];;
          $log[loop]
          $if[$get[r]>=$env[d;num];
            $!jsonSet[userProfile;limiters;luckDesc;$env[d;desc]]
            $let[stop;true]
          ]
        ]
      ]
    ]

    $let[r;$env[userProfile;limiters;HLRandom]]

    
    $sendMessage[$channelID;
        $getGlobalVar[author]
        $description[## 🍀 Today your luck is $get[r]%, $env[userProfile;limiters;luckDesc]]
        $color[$getGlobalVar[luckyColor]]
        $footer[The result updates every day at 0 AM UTC+0]
    ]
    $setUserVar[userProfile;$env[userProfile]]
  `
})

function data () {
  return `
    [
      {
        "num": 100,
        "desc": "legendary luck 🌟"
      },
      {
        "num": 95,
        "desc": "unbelievable fortune 🍀"
      },
      {
        "num": 80,
        "desc": "great luck 🎉"
      },
      {
        "num": 60,
        "desc": "decent luck 👍"
      },
      {
        "num": 40,
        "desc": "mediocre luck 🤔"
      },
      {
        "num": 20,
        "desc": "poor luck 😟"
      },
      {
        "num": 5,
        "desc": "terrible luck 😭"
      },
      {
        "num": 0,
        "desc": "abysmal luck 💀"
      }
  \\]
  `
}