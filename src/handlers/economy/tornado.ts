export default {
  name: 'handleTornado',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[allTornadoes;$readFile[res/data/tornadoes.json]]

    $let[r;$random[1;30]]
    $if[$and[$isNumber[$message];$env[userProfile;devMode]==1];
      $let[r;$message]
    ]

    $if[1==$get[r];
      $let[type;devilTornadoes]
      $let[MC;$random[2500;4000]]
    ;
      $let[type;normalTornadoes]
      $let[MC;$random[300;600]]
    ]

    $jsonLoad[tornadoes;$env[allTornadoes;$get[type]]]
    $jsonLoad[tornado;$arrayRandomValue[tornadoes]]

    $let[color;$env[tornado;color]]
    $let[display;$tl[$get[l];data;$get[type].$env[tornado;name]]]
    $let[thum;$env[tornado;thumbnail]]

    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[
          $tl[$get[l];ui;tornado.saw;$get[display]]
          $tl[$get[l];ui;tornado.earned;$separate[$get[MC]]]
        ]
        $addThumbnail[$get[thum]]
      ]
    ;$get[color]]
  `
}