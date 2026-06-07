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
    $addStringSelectMenu[$arrayJoin[data;_]-play_soccer_actions-$authorID;$tl[$get[l];ui;play.selectMenuPlaceholderActions]]

    $arrayForEach[soccerActions;_elem;
      $if[$and[$env[_elem]==1;$get[replaceIgnoreAction]];
        $jsonSet[_elem;3]
      ]
    
      $addOption[$tl[$get[l];data;soccerActions.$env[_elem]];;$env[_elem]]
    ]
  `
}