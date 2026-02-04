export default {
  name: 'addExitButton',
  code: `
    $if[$env[playData]==;$return]
    $addActionRow
    $addButton[quit-play-$authorID;$tl[ui.play.buttonLabelQuitGame];Danger;🔚]
  `
}