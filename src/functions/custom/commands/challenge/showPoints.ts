import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showPoints",
  description: "Displays a user's total points from the 1 hour luck challenge in content format.",
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "The user ID to show the points for.",
      type: ArgType.User,
      required: false,
    }
  ],
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]

    $let[points;$env[$getProgress[$get[userId]];points]]
    $let[styled;$if[$arrayIncludes[$env[$getProfile[$get[userId]];challenge;settings];hidePoints];||$get[points]||;\`$get[points]\`]]
    
    $return[$tl[ui.challenge.points.$env[userProfile;language];$get[styled]]]
  `
})