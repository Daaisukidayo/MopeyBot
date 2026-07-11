import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'lobbyInfoMessage',
  description: 'Creates and sends a formatted lobby information message with author and content.',
  params: [
    {
      name: "_content",
      description: "The content text to display in the lobby info message.",
      type: ArgType.String,
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author.$get[l];$username[$env[lobby;host]]]]
        $addThumbnail[$userAvatar[$env[lobby;host]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$env[_content]]
    ;Orange]
  `
})