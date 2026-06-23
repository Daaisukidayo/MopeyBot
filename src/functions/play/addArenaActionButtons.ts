export default {
  name: 'addArenaActionButtons',
  code: `
    $let[l;$env[userProfile;language]]
    $addActionRow
    $arrayForEach[$getGlobalVar[arenaActions];elem;
      $addButton[play_arenaAction-$env[elem;id]-$authorID;$tl[data.arenaActions.$env[elem;id].$get[l]];Success;$env[elem;emoji]]
    ]
  `
}