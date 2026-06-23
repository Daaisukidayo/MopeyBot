export default {
  name: 'addActionsMenu',
  code: `
    $if[$env[playData]==;$return]
    $let[l;$env[userProfile;language]]
    $let[biome;$env[playData;currentBiome]]
    $jsonLoad[apexData;$getCurrentApexData]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $addActionRow
    $addStringSelectMenu[play_actions-$authorID;$tl[ui.play.selectMenuPlaceholderActions.$get[l]]]

    $if[$env[playData;isDead];
      $addOption[$tl[ui.play.optionNameRespawn.$get[l]];;respawn;🔄]
      $return
    ]

    $if[$env[apexData;hasAllApex];
      $addOption[$tl[ui.play.optionNameUpgrade.$get[l]];;kingDragonUpg;⬆️]
      $return
    ]

    $if[$and[$env[playData;XP]>=$env[xpPerTier;$env[playData;tier];1];$env[playData;tier]!=17];
      $addOption[$tl[ui.play.optionNameUpgrade.$get[l]];;upgrade;⬆️]
      $return
    ]
    
    $addOption[$tl[ui.play.optionNameFarmXp.$get[l]];;farmXP;🍴]

    $if[$env[playData;tier]>=15;
      $addOption[$tl[ui.play.optionNameArena.$get[l]];;arena;⚔️]
    ]
      
    $addOption[$tl[ui.play.optionNameDowngrade.$get[l]];;downgrade;⬇️]


    $addActionRow
    $addStringSelectMenu[play_moveToBiome-$authorID;$tl[ui.play.selectMenuPlaceholderSwitchBiome.$get[l]]]

    $if[$get[biome]!=0;
      $addOption[$tl[data.biomes.0.$get[l]];;0;⛰️]
    ;
      $addOption[$tl[data.biomes.5.$get[l]];;5;🌋]
    ]
    $if[$isOneOf[$get[biome];2;5];;
      $addOption[$tl[data.biomes.2.$get[l]];;2;🌊]
    ]
    $if[$isOneOf[$get[biome];1;3;5];;
      $addOption[$tl[data.biomes.1.$get[l]];;1;🏜️]
      $addOption[$tl[data.biomes.3.$get[l]];;3;❄️]
    ]
    $if[$isOneOf[$get[biome];4;5];;
      $addOption[$tl[data.biomes.4.$get[l]];;4;🌲]
    ]
    
    

    $if[$and[$env[playData;tier]==17;$isOneOf[$env[playData;currentAnimal];kingDragon;rareKingDragon]==false];
      $addActionRow
      $addButton[play_showApexes-$authorID;$tl[ui.play.buttonLabelShowApex.$get[l]];Primary;👑]
    ]
  `
}