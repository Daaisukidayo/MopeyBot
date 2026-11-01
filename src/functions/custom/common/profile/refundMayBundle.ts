import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "refundMayBundle",
  description: "one-time refund, may2022SP got sold empty and isn't a pack anymore",
  code: `
    $c[once a start logs 0, drop this file and its call]
    $let[refunded;0]
    $arrayForEach[$searchDB[userProfile];record;
      $jsonLoad[profile;$getProfile[$jsonGet[record;id]]]
      $jsonLoad[packs;$default[$jsonGet[profile;user_packs];$arrayOf]]
      $if[$arrayIncludes[packs;may2022SP];
        $arrayFilter[packs;pack;$env[pack]!=may2022SP;packs]
        $!jsonSet[profile;user_packs;$env[packs]]
        $c[the price it was sold at]
        $callMethod[profile;addCoins;749000]
        $callMethod[profile;save]
        $letSum[refunded;1]
      ]
    ]
    $logger[Info;Refunded May Bundle 2022 to $get[refunded] users]
  `,
})
