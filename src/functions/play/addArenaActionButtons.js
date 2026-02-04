export default {
  name: 'addArenaActionButtons',
  code: `
    $jsonLoad[arenaActions;$getGlobalVar[arenaActions]]
    $addActionRow
    $arrayForEach[arenaActions;elem;
      $addButton[$env[elem;id]-arenaAction_play-$authorID;$tl[data.arenaActions.$env[elem;id]];Success;$env[elem;emoji]]
    ]
  `
}