export default {
  name: 'addExitButton',
  code: `
    $if[$env[playData]==;$return]
    $let[l;$env[userProfile;language]]
    $addActionRow
    $addButton[quit-play-$authorID;$tl[$get[l];ui;play.buttonLabelQuitGame];Danger;🔚]
  `
}