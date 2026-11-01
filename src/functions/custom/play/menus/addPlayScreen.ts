import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addPlayScreen",
  description:
    "adds the game's current screen to a container: the fight, the first animal pick, or the animal w/ its menus",
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
    {
      name: "wardrobeVar",
      description: "var w/ the user's wardrobe",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]

    $addAuthorDisplay
    $if[$jsonGet[playData;arena;opponent;animal_id]!=;
      $addArenaStatus[playData;wardrobe]
      $addSeparator
      $addArenaActionButtons[playData]
      $addArenaDevMenu[playData]
    ;$if[$and[$jsonGet[playData;animal_id]==;$jsonGet[playData;is_dead]==false];
      $addTextDisplay[$tl[ui.play.chooseAnimal.$get[l]]]
      $addUpgradeMenu[playData;wardrobe]
    ;
      $c[lost the fight = no animal, just respawn]
      $if[$jsonGet[playData;animal_id]!=;
        $displayAnimalStats[playData;wardrobe]
      ]
      $if[$and[$jsonGet[playData;held_soccer]!=;$jsonGet[playData;is_dead]==false];
        $addHeldSoccerMenu[playData]
      ;
        $addActionsMenu[playData]
      ]
    ]]
    $addSeparator
    $addExitButton[playData]
    $addCheats[playData]
  `,
})
