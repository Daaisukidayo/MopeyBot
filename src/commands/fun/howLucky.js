import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "howlucky",
  aliases: ['hl'],
  type: "messageCreate",
  code:` 
    $reply
    ${universalSnippets.checkProfile({addCooldown: false})}

    $let[lastHLUsed;$env[userProfile;limiters;lastHLUsed]]
    $let[r;$env[userProfile;limiters;HLRandom]]

    $if[$get[lastHLUsed]!=$day;

      $let[r;$randomNumber[0;101]]
      $!jsonSet[userProfile;limiters;lastHLUsed;$day]
      $!jsonSet[userProfile;limiters;HLRandom;$get[r]]

      $jsonLoad[data;${data()}]

      $loop[$arrayLength[data];
        $let[i;$math[$env[i] - 1]]
        $jsonLoad[d;$arrayAt[data;$get[i]]]

        $if[$get[r]>=$env[d;num];
          $!jsonSet[userProfile;limiters;luckDesc;$env[d;desc]]
          $setUserVar[userProfile;$env[userProfile]]
          $break
        ]
      ;i;true]
    ]
    
    $getGlobalVar[author]
    $description[## 🍀 Today your luck is $get[r]%, $env[userProfile;limiters;luckDesc]]
    $color[$getGlobalVar[luckyColor]]
    $footer[The result updates every day at 12:00 AM UTC+0]
  `
}

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