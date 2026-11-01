import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "lobbyInfoMessage",
  description: "sends a lobby info msg w/ the author and some text",
  params: [
    {
      name: "lobbyVar",
      description: "var w/ the lobby",
      type: ArgType.String,
    },
    {
      name: "content",
      description: "the text to show",
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
