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
        $addTextDisplay[$tl[$get[l];ui;lobby.author;$username[$env[lobby;host]]]]
        $addThumbnail[$userAvatar[$env[lobby;host]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$env[_content]]
    ;Orange]
  `
}