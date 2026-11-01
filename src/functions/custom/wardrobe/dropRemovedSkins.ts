import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "dropRemovedSkins",
  description:
    "one-time: wardrobe picks of skins gone from skins.json (the USSR skins) go back to the default skin. migrateProfiles calls it",
  code: `
    $c[once a start logs 0, drop this file and its call]
    $c[own id list bc clientReady cmds run side by side, the animal index cache may not be there yet]
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]
    $arrayLoad[ids]
    $arrayForEach[animals;animal;
      $arrayForEach[$default[$jsonGet[animal;skins];$arrayOf];skin;$arrayPush[ids;$jsonGet[skin;id]]]
    ]

    $let[dropped;0]
    $arrayForEach[$searchDB[userWardrobe];record;
      $jsonLoad[wardrobe;$jsonGet[record;value]]
      $let[changed;false]
      $arrayForEach[$jsonKeys[wardrobe];animal;
        $let[skin;$jsonGet[wardrobe;$env[animal]]]
        $c[old index picks stay, only ids that are gone drop]
        $if[$and[$isNumber[$get[skin]]==false;$arrayIncludes[ids;$get[skin]]==false];
          $!jsonDelete[wardrobe;$env[animal]]
          $let[changed;true]
          $letSum[dropped;1]
        ]
      ]
      $if[$get[changed];$setUserVar[userWardrobe;$env[wardrobe];$jsonGet[record;id]]]
    ]
    $logger[Info;Dropped $get[dropped] removed skins from wardrobes]
  `,
})
