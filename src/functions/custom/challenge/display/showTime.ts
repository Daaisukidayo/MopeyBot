import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showTime",
  description: "the user's 1h luck challenge timer, in the caller's language",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "whose time to show",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $return[$tl[ui.challenge.time.$jsonGet[userProfile;language];$inline[$parseDigital[$getChallengeTimer[$env[userId;id]]000]]]]
  `,
})
