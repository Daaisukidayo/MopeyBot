export default {
  name: 'addActionsMenu',
  code: `
    $let[biome;$env[playData;currentBiome]]
    $jsonLoad[apexData;$getCurrentApexData]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $addActionRow
    $addStringSelectMenu[play_actions-$authorID;$tl[ui.play.selectMenuPlaceholderActions]]

    $if[$env[apexData;hasAllApex];
      $addOption[$tl[ui.play.optionNameUpgrade];;kingDragonUpg;⬆️]
      $let[hideSwitchBiome;true]
    ;

      $if[$and[$env[playData;XP]>=$env[xpPerTier;$env[playData;tier];1];$env[playData;tier]!=17];
        $addOption[$tl[ui.play.optionNameUpgrade];;upgrade;⬆️]
        $let[hideSwitchBiome;true]
      ;
        $addOption[$tl[ui.play.optionNameFarmXp];;farmXP;🍴]
        $if[$env[playData;tier]>=15;
          $addOption[$tl[ui.play.optionNameArena];;arena;⚔️]
        ]
      ]
      
      $addOption[$tl[ui.play.optionNameDowngrade];;downgrade;⬇️]
    ]


    $if[$get[hideSwitchBiome];;
      $addActionRow
      $addStringSelectMenu[moveToBiome_play-$authorID;$tl[ui.play.selectMenuPlaceholderSwitchBiome]]

      $if[$get[biome]!=0;
        $addOption[$tl[data.biomes.0];;0;⛰️]
      ;
        $addOption[$tl[data.biomes.5];;5;🌋]
      ]
      $if[$includes[$get[biome];2;5];;
        $addOption[$tl[data.biomes.2];;2;🌊]
      ]
      $if[$includes[$get[biome];1;3;5];;
        $addOption[$tl[data.biomes.1];;1;🏜️]
        $addOption[$tl[data.biomes.3];;3;❄️]
      ]
      $if[$includes[$get[biome];4;5];;
        $addOption[$tl[data.biomes.4];;4;🌲]
      ]
    ]
    

    $if[$and[$env[playData;tier]==17;$includes[$toLowerCase[$env[playData;currentAnimal]];kingdragon]==false];
      $addActionRow
      $addButton[showApex_play-$authorID;$tl[ui.play.buttonLabelShowApex];Primary;👑]
    ]
  `
}