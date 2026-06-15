export default {
  name: "showPoints",
  description: "Shows the user's total points of 1 hour luck challenge in content format.",
  params: [
    {
      name: "_userId",
      description: "The user ID to show the points for.",
      type: "User",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[userId;$findUser[$env[_userId];true]]

    $let[points;$dump[$getProgress[$get[userId]];points]]
    $let[styled;$if[$arrayIncludes[$dump[$getProfile[$get[userId]];challenge;settings];hidePoints];||$get[points]||;\`$get[points]\`]]
    
    $return[$tl[$env[userProfile;language];ui;challenge.points;$get[styled]]]
  `
}