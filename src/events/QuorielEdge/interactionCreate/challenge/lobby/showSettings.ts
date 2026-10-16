import { Command } from "@quoriel/edge"

export default new Command({
  name: "showLobbySettings",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $jsonLoad[userProfile;$getProfile]

    $checkLobby

    $jsonLoad[lobby;$getLobby]
    $onlyIf[$messageID==$jsonGet[lobby;messageID];
      $!deleteMessage[$channelID;$messageID]
    ]

    $ephemeral
    $lobbySettingsEmbed[lobby]
    $interactionReply
  `,
})
