export default {
  name: 'infoMessage',
  params: [
    {
      name: "content",
      required: true
    }
  ],
  code: `
    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author;$username[$env[lobby;host]]]]
        $addThumbnail[$userAvatar[$env[lobby;host]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$env[content]]
    ;Orange]
  `
}