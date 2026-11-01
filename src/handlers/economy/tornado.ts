import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleTornado",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $c[1 in 30 is a devil tornado (pays more), devs can force the roll]
    $let[devil;$checkCondition[$if[$and[$isNumber[$message];$isDev];$message;$random[1;30]]==1]]
    $let[type;$if[$get[devil];devilTornadoes;normalTornadoes]]
    $let[MC;$if[$get[devil];$random[2500;4000];$random[300;600]]]
    $jsonLoad[tornado;$arraySample[$jsonGet[$readFile[res/data/tornadoes.json];$get[type]]]]

    $callMethod[userProfile;addCoins;$get[MC]]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[
          $tl[ui.tornado.saw.$get[l];$tl[data.$get[type].$jsonGet[tornado;name].$get[l]]]
          $tl[ui.tornado.earned.$get[l];$separate[$get[MC]]]
        ]
        $addThumbnail[$jsonGet[tornado;thumbnail]]
      ]
    ;$jsonGet[tornado;color]]
  `,
})
