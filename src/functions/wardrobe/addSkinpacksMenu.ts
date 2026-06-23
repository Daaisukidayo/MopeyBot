export default {
  name: 'addSkinpacksMenu',
  params: [
    {
      name: '_tier',
      description: "Creates a menu with skins pack options for one or all animal tiers.",
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[userSkinPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userSkinPacks;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSkinPacks;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSkinPacks;$get[legacyWinterPackI];0;legacySPw]
    ]

    $addActionRow
    $addStringSelectMenu[wardrobe-tier-$env[_tier]-$authorID;$tl[ui.wardrobe.menuTitleSelectSkinPack.$get[l]]]

    $arrayForEach[userSkinPacks;id;
      $addOption[$tl[data.shopSkinPacks.$env[id].$get[l]];;$env[id]]
    ]
  `
}