import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: "showTime",
  description: "Displays the user's timer from the 1 hour luck challenge in content format.",
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "The user ID to show the time for.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $let[l;$env[$getProfile[$get[userId]];language]]
    $let[time;$parseDigital[$getTimer[$get[userId]]000]]
    $return[$tl[ui.challenge.time.$get[l];$inline[$get[time]]]]
  `
})