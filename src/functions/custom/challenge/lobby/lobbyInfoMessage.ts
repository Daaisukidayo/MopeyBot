import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "lobbyInfoMessage",
  description: "Creates and sends a formatted lobby information message with author and content.",
  params: [
    {
      name: "lobbyVar",
      description: "The name of the variable that holds the lobby.",
      type: ArgType.String,
    },
    {
      name: "content",
      description: "The content text to display in the lobby info message.",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author.$get[l];$username[$jsonGet[lobby;host]]]]
        $addThumbnail[$userAvatar[$jsonGet[lobby;host]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$env[content]]
    ;Orange]
  `,
})
