import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: "showRares",
  description: "Displays the user's count of total rares from the 1 hour luck challenge in content format.",
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "The user ID to show the rares for.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $let[rares;$env[$getProgress[$get[userId]];rares]]
    $let[styled;$if[$arrayIncludes[$env[$getProfile[$get[userId]];challenge;settings];hideRares];||$get[rares]||;\`$get[rares]\`]]

    $return[$tl[ui.challenge.rares.$env[userProfile;language];$get[styled]]]
  `
})