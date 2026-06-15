export default {
  name: 'addArenaActionButtons',
  code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[arenaActions;$getGlobalVar[arenaActions]]
    $addActionRow
    $arrayForEach[arenaActions;elem;
      $addButton[play_arenaAction-$env[elem;id]-$authorID;$tl[$get[l];data;arenaActions.$env[elem;id]];Success;$env[elem;emoji]]
    ]
  `
}