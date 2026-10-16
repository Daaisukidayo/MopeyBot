import { Command } from "@quoriel/edge"

export default new Command({
  name: "quitLobby",
  type: "interactionCreate",
  description: "When pressing Quit",
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $checkLobby

    $jsonLoad[lobby;$getLobby]

    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $callMethod[lobby;quit;$authorID;$jsonGet[IID;1]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `,
})
