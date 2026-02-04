export default {
  name: "tornado",
  aliases: ["td"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[20s]

    $jsonLoad[allTornadoes;$readFile[src/json/tornadoes.json]]

    $let[r;$randomNumber[1;31]]
    $if[$and[$isNumber[$message];$env[userProfile;devMode]];
      $let[r;$message]
    ]
    
    $if[1==$get[r];
      $let[type;devil]
      $let[MC;$randomNumber[2500;4000]]
    ;
      $let[type;normal]
      $let[MC;$randomNumber[300;601]]
    ]

    $jsonLoad[tornadoes;$env[allTornadoes;$get[type]]]
    $jsonLoad[tornado;$arrayRandomValue[tornadoes]]

    $let[color;$env[tornado;color]]
    $let[display;$tl[data.$get[type].$env[tornado;name]]]
    $let[thum;$env[tornado;thumbnail]]

    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[
          $tl[ui.tornado.saw;$get[display]]
          $tl[ui.tornado.earned;$separate[$get[MC]]]
        ]
        $addThumbnail[$get[thum]]
      ]
    ;$get[color]]
  `
}