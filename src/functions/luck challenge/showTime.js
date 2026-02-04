export default {
  name: "showTime",
  description: "Shows the 1-hour challenge time for a user.",
  params: [
    {
      name: "user_id",
      description: "The user ID to show the time for.",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]

    $let[time;$parseDigital[$getUservar[1htime|$channelID;$get[id]]000]]

    $return[$tl[ui.challenge.time;$get[time]]]
  `
}