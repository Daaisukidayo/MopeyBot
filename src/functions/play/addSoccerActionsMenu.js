export default {
  name: 'addSoccerActionsMenu',
  params: [
    {
      name: "replaceIgnoreAction",
      type: "Boolean",
      required: false
    }
  ],
  brackets: false,
  code: `
    $let[replaceIgnoreAction;$nullish[$env[replaceIgnoreAction];false]]
    $jsonLoad[soccerActions;$getGlobalVar[soccerActions]]

    $addActionRow
    $addStringSelectMenu[$arrayJoin[data;_]-play_soccer_actions-$authorID;$tl[ui.play.selectMenuPlaceholderActions]]

    $arrayForEach[soccerActions;elem;
      $if[$and[$env[elem]==1;$get[replaceIgnoreAction]];
        $jsonSet[elem;3]
      ]
    
      $addOption[$tl[data.soccerActions.$env[elem]];;$env[elem]]
    ]
  `
}