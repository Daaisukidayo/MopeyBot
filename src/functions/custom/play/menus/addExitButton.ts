import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addExitButton",
  description: "Adds exit button for a player's play session",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
  ],
  code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $addButton[play_leave-quit-$authorID;$tl[ui.play.buttonLabelQuitGame.$get[l]];Danger;🔚]
  `,
})
