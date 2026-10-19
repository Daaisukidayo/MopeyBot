import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addActionsMenu",
  description: "Adds action and biome selection menus for a player's play session",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
  ],
  code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]

    $let[l;$jsonGet[userProfile;language]]
    $let[animalId;$jsonGet[playData;animal_id]]
    $let[biome;$jsonGet[playData;biome]]
    $let[tier;$jsonGet[playData;tier]]

    $jsonLoad[apexData;$getCurrentApexData[playData]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $addActionRow
    $addStringSelectMenu[play_actions-$authorID;$tl[ui.play.selectMenuPlaceholderActions.$get[l]]]

    $if[$jsonGet[playData;is_dead];
      $addOption[$tl[ui.play.optionNameRespawn.$get[l]];;respawn;🔄]
      $return
    ]

    $if[$and[$get[tier]==17;$jsonGet[apexData;hasAllApex];$get[animalId]==black_dragon];
      $addOption[$tl[ui.play.optionNameUpgrade.$get[l]];;kingDragonUpg;⬆️]
      $return
    ]

    $if[$and[$jsonGet[playData;xp]>=$jsonGet[xpPerTier;$get[tier];1];$get[tier]!=17];
      $addOption[$tl[ui.play.optionNameUpgrade.$get[l]];;upgrade;⬆️]
      $return
    ]
    
    $addOption[$tl[ui.play.optionNameFarmXp.$get[l]];;farmXP;🍴]

    $if[$get[tier]>=15;
      $addOption[$tl[ui.play.optionNameArena.$get[l]];;arena;⚔️]
    ]
      
    $addOption[$tl[ui.play.optionNameDowngrade.$get[l]];;downgrade;⬇️]

    $if[$and[$get[tier]==17;$get[animalId]==black_dragon];
      $addOption[$tl[ui.play.optionNameShowApex.$get[l]];;showApex;👑]
    ]

    $addBiomeMenu[playData]
    
    $if[$jsonGet[userProfile;testerMode];
      $addActionRow
      $addStringSelectMenu[play_devActions-$authorID;Dev tools]
      $addOption[Spawn soccer;;spawnSoccer;⚽]
      $addOption[Force next soccer outcome;;forceSoccer;🎯]
      $addOption[Force next farm event;;forceEvent;🎲]
      $addOption[Toggle immortality;Currently: $if[$jsonGet[playData;dev;immortal];on;off];toggleImmortal;🛡️]
      $addOption[Fill XP;Up to the tier maximum;fillXP;📈]
      $addOption[Give coins;;giveMC;💰]
      $addOption[Teleport;To any biome;teleport;🌀]
      $addOption[Summon animal;Become any animal or rare;summonAnimal;🪄]
      $addOption[Arena with opponent;;arena;⚔️]
      $addOption[Get all apex;;getAllApex;👑]
      $addOption[Remove all apex;;removeAllApex;🚫]
      $addOption[Show play data;;showPlayData;🧾]
    ]
  `,
})
