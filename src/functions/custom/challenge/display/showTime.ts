import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showTime",
  description: "Displays the user's timer from the 1 hour luck challenge in content format, in the caller's language.",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "The user ID to show the time for.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $return[$tl[ui.challenge.time.$jsonGet[userProfile;language];$inline[$parseDigital[$getChallengeTimer[$env[userId;id]]000]]]]
  `,
})
