import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'addSoccerActionsMenu',
  deacription: "Adds soccer action menu for a player's play session",
  brackets: false,
  params: [
    {
      name: "_replaceIgnoreAction",
      description: "Whether to replace the ignore action when a user is holding the soccer item.",
      type: ArgType.Boolean,
      required: false,
    }
  ],
  code: `
    $let[replaceIgnoreAction;$nullish[$env[_replaceIgnoreAction];false]]
    $jsonLoad[soccerActions;$getGlobalVar[soccerActions]]

    $let[l;$env[userProfile;language]]

    $addActionRow
    $addStringSelectMenu[play_soccerActions-$arrayJoin[data;___]-$authorID;$tl[ui.play.selectMenuPlaceholderActions.$get[l]]]

    $arrayForEach[soccerActions;_elem;
      $if[$and[$env[_elem]==1;$get[replaceIgnoreAction]];
        $jsonSet[_elem;3]
      ]
    
      $addOption[$tl[data.soccerActions.$env[_elem].$get[l]];;$env[_elem]]
    ]
  `
})