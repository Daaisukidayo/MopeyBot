import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addSkinpacksMenu",
  description: "Creates a menu with skins pack options for one or all animal tiers.",
  params: [
    {
      name: "tier",
      description: 'Tier number or "all" argument',
      type: ArgType.String
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[userSkinPacks;$jsonGet[userProfile;userPacks]]
    $arrayUnshift[userSkinPacks;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSkinPacks;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSkinPacks;$get[legacyWinterPackI];0;legacySPw]
    ]

    $addActionRow
    $addStringSelectMenu[wardrobe-tier-$env[tier]-$authorID;$tl[ui.wardrobe.menuTitleSelectSkinPack.$get[l]]]

    $arrayForEach[userSkinPacks;id;
      $addOption[$tl[data.shopSkinPacks.$env[id].$get[l]];;$env[id]]
    ]
  `
})
