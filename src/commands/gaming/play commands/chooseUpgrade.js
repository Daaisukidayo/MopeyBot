import playSnippets from '#snippets/playSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu", "button"],
  description: "choose upgrade",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;devUpArrow,devDownArrow,devUpdateArrow,respawn,kingDragonUpg]

    $onlyIf[$or[$includes[$env[values];upgrade;kingDragonUpg];$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]]

    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}
    ${playSnippets.resetArena()}

    $!jsonSet[playData;isDead;false]

    $let[id;$default[$env[values;0];$env[IID;0]]]
    
    $if[$includes[$get[id];upgrade];
      ${playSnippets.setNewTier()}
      $if[$env[playData;tier]>17;
        $!jsonSet[playData;tier;1]
      ]
    ]
    $if[$includes[$get[id];devUpArrow];
      $!jsonSet[playData;tier;$math[$env[playData;tier] + 1]]
      $if[$env[playData;tier]>17;
        $!jsonSet[playData;tier;1]
      ]
    ]
    $if[$includes[$get[id];devDownArrow];
      $!jsonSet[playData;tier;$math[$env[playData;tier] - 1]]
      $if[$env[playData;tier]<1;
        $!jsonSet[playData;tier;17]
      ]
    ]
    $if[$includes[$get[id];devUpArrow;devDownArrow];
      $!jsonSet[playData;XP;$env[XPreq;$env[playData;tier];0]]
    ]

    $addContainer[
      $callFunction[newAuthor]

      $addSeparator[Large]
      
      $addTextDisplay[## Choose which animal to spawn as:]
      
      $if[$includes[$get[id];kingDragonUpg];
        $jsonLoad[KD;$env[animals;$env[animalsIndexes;kingDragon]]]
        $let[KDtrig;$env[KD;ID]-upgrade-animal-play-$authorID]
        $let[KDwr;$env[userWardrobe;kingDragon]]
        $let[KDname;$env[KD;variants;$get[KDwr];name]]
        $let[KDemoji;$env[KD;variants;$get[KDwr];emoji]]
        $let[emojisInDescription;$get[KDemoji]]
        $addActionRow
        $addButton[$get[KDtrig];$get[KDname];Secondary;$get[KDemoji]]
      ;
        ${playSnippets.animalsButtonsGenerator()}
      ]

      $addSeparator[Large]

      ${playSnippets.exitButton()}
    ;$default[$env[playData;color];$getGlobalVar[defaultColor]]]

    $interactionUpdate
    $setUserVar[userPlayData;$env[playData]]
  `
}