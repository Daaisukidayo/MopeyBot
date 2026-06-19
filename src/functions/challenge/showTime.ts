export default {
  name: "showTime",
  description: "Shows the 1-hour challenge time for a user.",
  params: [
    {
      name: "_userId",
      description: "The user ID to show the time for.",
      type: "User",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $let[l;$dump[$getProfile[$get[userId]];language]]
    $let[time;$parseDigital[$getTimer[$get[userId]]000]]
    $return[$tl[$get[l];ui;challenge.time;$get[time]]]
  `
}