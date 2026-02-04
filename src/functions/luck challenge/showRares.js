export default {
  name: "showRares",
  description: "Shows the user's count of total rares of 1 hour luck challenge in content format.",
  params: [
    {
      name: "user_id",
      description: "The user ID to show the rares for.",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]
    
    $let[rares;$dump[$getProgress[$get[id]];rares]]
    $let[styled;$if[$advArrayIncludes[$dump[$getProfile[$get[id]];challenge;settings];hideRares];||$get[rares]||;\`$get[rares]\`]]

    $return[$tl[ui.challenge.rares;$get[styled]]]
  `
}