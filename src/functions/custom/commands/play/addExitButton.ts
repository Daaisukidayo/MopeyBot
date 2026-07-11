import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'addExitButton',
  deacription: "Adds exit button for a player's play session",
  code: `
    $if[$env[playData]==;$return]
    $let[l;$env[userProfile;language]]
    $addActionRow
    $addButton[play_leave-quit-$authorID;$tl[ui.play.buttonLabelQuitGame.$get[l]];Danger;🔚]
  `
})