export default {
  name: 'lobbyInfoMessage',
  params: [
    {
      name: "_content",
      required: true
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
}