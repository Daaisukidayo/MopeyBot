export default {
  name: "setTimer",
  params: [
    {
      name: "_newTime",
      type: "Number",
      required: true,
    },
    {
      name: "_userId",
      type: "User",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $setUserVar[1htime|$channelID;$env[_newTime];$findUser[$env[_userId];true]]
  `
}