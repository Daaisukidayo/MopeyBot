export default {
  name: 'addSkinpacksMenu',
  params: [
    {
      name: 'menu_id',
      required: true
    }
  ],
  code: `
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userSPs;$env[userProfile;userPacks]]
    $arrayUnshift[userSPs;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSPs;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSPs;$get[legacyWinterPackI];0;legacySPw]
    ]

    $addActionRow
    $addStringSelectMenu[$env[menu_id]-$authorID;$tl[ui.wardrobe.menuTitleSelectSkinPack]]

    $arrayForEach[userSPs;id;
      $addOption[$tl[data.shopSkinPacks.$env[id]];;$env[id]]
    ]
    
  `
}