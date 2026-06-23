export default {
  name: 'addSoccerActionsMenu',
  params: [
    {
      name: "_replaceIgnoreAction",
      type: "Boolean",
      required: false
    }
  ],
  brackets: false,
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
}