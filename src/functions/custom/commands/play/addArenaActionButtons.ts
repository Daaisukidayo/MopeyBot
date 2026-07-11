import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'addArenaActionButtons',
  deacription: "Adds arena action buttons for a player's play session",
  code: `
    $let[l;$env[userProfile;language]]
    $addActionRow
    $arrayForEach[$getGlobalVar[arenaActions];elem;
      $addButton[play_arenaAction-$env[elem;id]-$authorID;$tl[data.arenaActions.$env[elem;id].$get[l]];Success;$env[elem;emoji]]
    ]
  `
})