export default {
  name: 'addSkinpacksMenu',
  params: [
    {
      name: '_menuId',
      required: true
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userSkinPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userSkinPacks;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSkinPacks;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSkinPacks;$get[legacyWinterPackI];0;legacySPw]
    ]

    $addActionRow
    $addStringSelectMenu[$env[_menuId]-$authorID;$tl[$get[l];ui;wardrobe.menuTitleSelectSkinPack]]

    $arrayForEach[userSkinPacks;id;
      $addOption[$tl[$get[l];data;shopSkinPacks.$env[id]];;$env[id]]
    ]
  `
}