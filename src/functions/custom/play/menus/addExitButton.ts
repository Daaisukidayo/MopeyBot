import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addExitButton",
  description: "adds the exit button",
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
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
