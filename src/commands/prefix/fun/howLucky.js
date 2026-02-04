export default {
  name: "howlucky",
  aliases: ['hl'],
  type: "messageCreate",
  code:` 
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $let[lastHLUsed;$env[userProfile;limiters;lastHLUsed]]
    $let[r;$env[userProfile;limiters;HLRandom]]

    $if[$get[lastHLUsed]!=$day;

      $let[r;$random[0;100]]
      $!jsonSet[userProfile;limiters;lastHLUsed;$day]
      $!jsonSet[userProfile;limiters;HLRandom;$get[r]]

      $jsonLoad[data;${data()}]

      $loop[$arrayLength[data];
        $let[i;$math[$env[i] - 1]]
        $jsonLoad[d;$arrayAt[data;$get[i]]]

        $if[$get[r]>=$env[d;num];
          $!jsonSet[userProfile;limiters;luckDesc;$env[d;desc]]
          $saveProfile
          $break
        ]
      ;i;true]
    ]

    $let[luckI;$env[userProfile;limiters;luckDesc]]
    $let[luckDesc;$tl[data.$commandName.$get[luckI]]]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.$commandName.description;$get[r];$get[luckDesc]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.$commandName.footer]]
    ;$getGlobalVar[luckyColor]]
  `
}

function data () {
  return `
    [
      {
        "num": 100,
        "desc": 0
      },
      {
        "num": 95,
        "desc": 1
      },
      {
        "num": 80,
        "desc": 2
      },
      {
        "num": 60,
        "desc": 3
      },
      {
        "num": 40,
        "desc": 4
      },
      {
        "num": 20,
        "desc": 5
      },
      {
        "num": 5,
        "desc": 6
      },
      {
        "num": 0,
        "desc": 7
      }
  \\]
  `
}