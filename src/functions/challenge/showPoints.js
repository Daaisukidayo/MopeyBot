export default {
  name: "showPoints",
  description: "Shows the user's total points of 1 hour luck challenge in content format.",
  params: [
    {
      name: "user_id",
      description: "The user ID to show the points for.",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]

    $let[points;$dump[$getProgress[$get[id]];points]]
    $let[styled;$if[$advArrayIncludes[$dump[$getProfile[$get[id]];challenge;settings];hidePoints];||$get[points]||;\`$get[points]\`]]
    
    $return[$tl[ui.challenge.points;$get[styled]]]
  `
}