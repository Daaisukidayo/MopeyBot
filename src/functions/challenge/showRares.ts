export default {
  name: "showRares",
  description: "Shows the user's count of total rares of 1 hour luck challenge in content format.",
  params: [
    {
      name: "_userId",
      description: "The user ID to show the rares for.",
      type: "User",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $let[rares;$dump[$getProgress[$get[userId]];rares]]
    $let[styled;$if[$arrayIncludes[$dump[$getProfile[$get[userId]];challenge;settings];hideRares];||$get[rares]||;\`$get[rares]\`]]

    $return[$tl[$env[userProfile;language];ui;challenge.rares;$get[styled]]]
  `
}