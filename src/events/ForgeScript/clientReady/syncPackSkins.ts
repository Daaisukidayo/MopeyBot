import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $c[a bought pack hands over all its skins, even ones added after the purchase. writes only when something's new]
    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[profile;$getProfile[$env[id]]]
      $jsonLoad[packs;$default[$jsonGet[profile;user_packs];$arrayOf]]
      $if[$jsonSize[packs]>0;
        $jsonLoad[skins;$getUserVar[userSkins;$env[id]]]
        $if[$grantPackSkins[skins;packs]>0;$setUserVar[userSkins;$env[skins];$env[id]]]
      ]
    ]
  `,
})
