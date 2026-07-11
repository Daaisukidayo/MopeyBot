import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'checkLobbyExistence',
  description: "Checks if the lobby message exist in the channel.",
  code: `
    $let[l;$env[userProfile;language]]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]];
      $sendMessage[$channelID;
        $lobbyInfoMessage[$tl[ui.lobby.missingMessage.$get[l]]]
      ]
      $removeChallengeProgressForEveryone[$env[lobby;allPlayers]]
    ]
  `
})