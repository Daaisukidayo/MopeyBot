import { Command } from "@quoriel/edge"

export default new Command({
  name: "participantReady",
  type: "interactionCreate",
  code: `
    $jsonLoad[userProfile;$getProfile]

    $checkLobby

    $jsonLoad[lobby;$getLobby]

    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $callMethod[lobby;toggleReady;$authorID]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `,
})
